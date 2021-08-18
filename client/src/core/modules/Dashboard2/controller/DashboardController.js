import { CheckCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import _ from 'lodash';

import XLSX from 'xlsx';

const boxWidth = 1287;

const DashboardController = ({
  store,
  setChartSettings,
  setSettingsName,
  t,
  setDashboardData,
  setDatasetName,
  chartSettings,
  setHeaders,
  setSrollPosition,
  setIsDragging,
  headers,
  dashboardData,
  setAddingNewChart
}) => {
  const removeChart = (id) => {
    if (store.dashboard.dashboards.length > 1) {
      setAddingNewChart(true);
    }

    store.dashboard.setRemoveChart(id);

    if (store.dashboard.dashboards.length > 1) {
      setTimeout(() => {
        setAddingNewChart(false);
      }, 1280);
    }
  };

  const adjustWidthSettings = (id, width) => {
    store.dashboard.setAdjustWidthSettings(id, width);
  };

  const plotLocation = (id, x, y) => {
    store.dashboard.setPlotLocation(id, x, y);
  };

  const fileBeforeLoad = (file) => {
    const reader = new FileReader();

    switch (file.type) {
      case 'application/json':
        _typeJSON(reader, file);
        return false;

      case 'application/vnd.ms-excel':
        _typeMSExcel(reader, file);
        return false;

      default:
        break;
    }
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setSrollPosition(position);
  };

  const handleResetState = () => {
    store.dashboard.reset();
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination || result.destination.droppableId === 'chart') {
      setIsDragging(false);
      return;
    }

    let [, , , , ...chartLabes] = headers;

    const _object = { ...chartSettings[result.source.index] };

    const _series = dashboardData
      .filter((_dd) => _dd.chartId === _object._id)
      .map((_dd) => {
        const { chartId, _xByear, fileName, name, ...data } = _dd;
        let _data = [];

        for (const _cL of chartLabes) {
          _data = [..._data, parseFloat(data[_cL])];
        }

        return {
          chartId,
          fileName,
          name,
          _xByear,
          data: _data
        };
      });

    if (_series.length === 0) {
      _openNotification(t('ops'), `${t('noDataFound')} ${_object.name}`);
      setIsDragging(false);
      return;
    }

    if (store.dashboard.dashboards.length > 0) {
      setAddingNewChart(true);
    }
    _object.lockDrag = true;
    _object.boxWidth = boxWidth;
    _object.x = 0;
    _object.y = -370 * store.dashboard.dashboards.length;
    _object.series = _series;
    _object.labels = chartLabes;

    store.dashboard.setDashboardOnDragEnd(_object);

    if (store.dashboard.dashboards.length > 0) {
      setTimeout(() => {
        setAddingNewChart(false);
      }, 1280);
    }

    setIsDragging(false);
  };

  function _typeMSExcel(reader, file) {
    reader.onload = (e) => {
      setDatasetName(file.name);
      const data = new Uint8Array(e.target.result);
      const workBook = XLSX.read(data, { type: 'array', raw: true, cellDates: true });

      const sheetName = workBook.SheetNames[0];

      const workSheet = workBook.Sheets[sheetName];

      const _csvData = XLSX.utils.sheet_to_json(workSheet, { type: 'string', raw: true });

      let headers = [];

      _.forIn(_csvData[0], (value, key) => {
        headers = [...headers, key];
      });

      setHeaders(headers);
      setDashboardData(_csvData);

      if (chartSettings.length === 0) {
        _openNotification(t('uploadSuccessful'), t('uploadSettingsDMessage'));
      } else {
        _openNotification(t('uploadSuccessful'), t('uploadSettingsDCMessage'));
      }
    };

    reader.readAsArrayBuffer(file);
  }
  function _typeJSON(reader, file) {
    reader.onload = (e) => {
      setSettingsName(file.name);
      const _jsonData = JSON.parse(e.target.result);

      setChartSettings(_jsonData);

      if (dashboardData.length === 0) {
        _openNotification(t('uploadSuccessful'), t('uploadSettingsCMessage'));
      } else {
        _openNotification(t('uploadSuccessful'), t('uploadSettingsCCMessage'));
      }
    };

    reader.readAsText(file);
  }

  function _openNotification(message, description) {
    notification.success({
      message,
      description,
      icon: <CheckCircleOutlined style={{ color: '#4caf50' }} />
    });
  }

  return {
    removeChart,
    adjustWidthSettings,
    plotLocation,
    fileBeforeLoad,
    handleScroll,
    onDragEnd,
    handleResetState
  };
};

export default DashboardController;
