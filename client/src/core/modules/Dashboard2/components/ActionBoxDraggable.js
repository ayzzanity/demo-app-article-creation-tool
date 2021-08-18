import React, { useState } from 'react';
import { Row, Col, Card, Upload } from 'antd';
import { FileExcelOutlined, DownloadOutlined } from '@ant-design/icons';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import ChartSourceDraggable from './ChartSourceDraggable';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { useTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';

/**CORE IMPORTS */
import { DashboardController } from '@core_modules/Dashboard2/controller';

const { Dragger } = Upload;

const ActionBoxDraggable = ({
  settingsName,
  datasetName,
  headers,
  dashboardData,
  chartSettings,
  setAddingNewChart,
  fileBeforeLoad,
  localDashboards,
  store
}) => {
  const { t } = useTranslation('common');
  const [isDraggingYes, setIsDragging] = useState(false);
  const { onDragEnd } = DashboardController({
    setIsDragging,
    headers,
    dashboardData,
    setAddingNewChart,
    chartSettings,
    store
  });

  return (
    <Card className="shadow-sm">
      <DragDropContext onDragEnd={onDragEnd} onDragStart={() => setIsDragging(true)}>
        <Row gutter={[16, 16]} className="d-flex align-items-center">
          <Col span={3} className="pr-2">
            <Dragger
              accept=".xlsx, .csv, .json"
              showUploadList={false}
              beforeUpload={(file) => fileBeforeLoad(file)}
              name="files"
            >
              <p className="ant-upload-drag-icon mb-1">
                <FileExcelOutlined style={{ fontSize: '30px' }} />
              </p>
              <p className="ant-upload-text">{t('Import File')}</p>
            </Dragger>
          </Col>
          <Col span={3} className="pr-2" style={{ borderRight: '2px solid whitesmoke' }}>
            <Droppable droppableId="build">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div
                    style={{
                      backgroundColor: '#f9f9f9',
                      borderRadius: '6px',
                      border: '1px dashed rgb(212 212 212)',
                      height: '77px',
                      width: '100%',
                      flexDirection: 'column'
                    }}
                    className="d-flex justify-content-center align-items-center py-2"
                  >
                    {provided.placeholder}
                    <p className="mb-0" style={{ fontSize: '30px', color: '#40a9ff' }}>
                      <DownloadOutlined />
                    </p>

                    {!isDraggingYes ? (
                      <p className="mb-2" style={{ color: 'black' }}>
                        {t('buildChart')}
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              )}
            </Droppable>
          </Col>
          <Col span={18} style={{ borderRight: '2px solid whitesmoke' }}>
            {settingsName !== '' || datasetName !== '' ? (
              <div className="mb-1 px-3">
                {settingsName !== '' ? (
                  <small>
                    {' '}
                    {t('settings')}: {settingsName}{' '}
                  </small>
                ) : (
                  ''
                )}
                {datasetName !== '' ? (
                  <small>
                    {' '}
                    {t('dataset')}: {datasetName}{' '}
                  </small>
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}
            <PerfectScrollbar>
              <div className="d-flex align-items-center">
                <Droppable droppableId="chart" isDropDisabled={true}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="d-flex align-items-center"
                    >
                      {chartSettings.length === 0
                        ? ''
                        : chartSettings.map((item, _i) => {
                            const _index = localDashboards.findIndex((_ld) => item._id === _ld._id);

                            return (
                              <Draggable
                                isDragDisabled={_index > -1}
                                key={item._id}
                                draggableId={item._id}
                                index={_i}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <ChartSourceDraggable
                                      key={`_xb${item._id}`}
                                      item={item}
                                      _index={_index}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </PerfectScrollbar>
          </Col>
        </Row>
      </DragDropContext>
    </Card>
  );
};

export default inject('store')(observer(ActionBoxDraggable));
