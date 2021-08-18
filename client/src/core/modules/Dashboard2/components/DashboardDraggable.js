import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { DropboxOutlined } from '@ant-design/icons';

// Contexts
// Components
import BoardDraggable from './BoardDraggable';
import ActionBoxDraggable from './ActionBoxDraggable';

import './main.css';
import { useTranslation } from 'react-i18next';
import { observer, inject } from 'mobx-react';

/**CORE IMPORTS */
import { DashboardController } from '@core_modules/Dashboard2/controller';
// images

function DashboardDraggable({ store }) {
  const { t } = useTranslation('common');
  const [chartSettings, setChartSettings] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const [settingsName, setSettingsName] = useState('');
  const [datasetName, setDatasetName] = useState('');
  const [addingNewChart, setAddingNewChart] = useState(false);
  const [, setSrollPosition] = useState(0);

  const { removeChart, fileBeforeLoad, adjustWidthSettings, plotLocation, handleScroll } =
    DashboardController({
      setAddingNewChart,
      setSettingsName,
      t,
      dashboardData,
      setDashboardData,
      setDatasetName,
      setHeaders,
      chartSettings,
      setSrollPosition,
      setChartSettings,
      store
    });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const _dshb = JSON.parse(localStorage.getItem('dashboards'));
    if (_dshb) {
      _dshb.forEach((_d, _i) => {
        if (_i === 0) {
          _d.y = Math.abs(_d.y);
        }
      });
      store.dashboard.setLocalDashboards([..._dshb]);
    }
  }, [store.dashboard]);

  return (
    <Row className="mb-2">
      <Col span={24}>
        <Row>
          <Col span={24}>
            <ActionBoxDraggable
              settingsName={settingsName}
              datasetName={datasetName}
              headers={headers}
              dashboardData={dashboardData}
              setLocalDashboards={store.dashboard.setLocalDashboards}
              setAddingNewChart={setAddingNewChart}
              fileBeforeLoad={fileBeforeLoad}
              dashboards={store.dashboard.dashboards.dashboards}
              localDashboards={store.dashboard.dashboards}
              chartSettings={chartSettings}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col span={24}>
            {store.dashboard.dashboards.length === 0 ? (
              <Row style={{ marginTop: '230px' }}>
                <Col span={24}>
                  <div className="text-center">
                    <p style={{ color: 'white', fontSize: '50px', margin: 0 }}>
                      <DropboxOutlined />
                    </p>
                    <h1 style={{ color: 'white' }}> {t('noCreated')} </h1>
                  </div>
                </Col>
              </Row>
            ) : !addingNewChart ? (
              <Row className="mb-3">
                <Col span={24}>
                  <div
                    id="dash-plain"
                    className="mb-3 mr-2"
                    style={{ height: `${3000}px`, width: `100%` }}
                  >
                    {store.dashboard.dashboards.map((item, _i) => (
                      <BoardDraggable
                        key={_i}
                        adjustWidthSettings={adjustWidthSettings}
                        plotLocation={plotLocation}
                        removeChart={removeChart}
                        chartData={item}
                        index={_i}
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            ) : (
              <Row style={{ marginTop: '230px' }}>
                <Col span={24}>
                  <div
                    style={{ flexDirection: 'column' }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <div className="breeding-rhombus-spinner">
                      <div className="rhombus child-1"></div>
                      <div className="rhombus child-2"></div>
                      <div className="rhombus child-3"></div>
                      <div className="rhombus child-4"></div>
                      <div className="rhombus child-5"></div>
                      <div className="rhombus child-6"></div>
                      <div className="rhombus child-7"></div>
                      <div className="rhombus child-8"></div>
                      <div className="rhombus big"></div>
                    </div>
                    <div className="mt-3">
                      <h3>{t('renderChart')} ... </h3>
                    </div>
                  </div>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default inject('store')(observer(DashboardDraggable));
