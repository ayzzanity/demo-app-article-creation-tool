import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Card, Col, Row, Table, Modal, Button, Space } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';

import { Draggable } from 'react-beautiful-dnd';
import { ResizableBox } from 'react-resizable';

import 'react-perfect-scrollbar/dist/css/styles.css';
import ExtraOptions from './ExtraOptions';
import { ExactText } from '@core_common/components';

const Board = React.memo(({ adjustWidthSettings, chartData, index, removeChart }) => {
  /**
    * @Object
    * desc: Supply object same structure as below 
    * {
         name: 'Net Profit',
         data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      }
    */

  const [seriesData, setSeriesData] = useState([]);
  const [options, setOptions] = useState({});

  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [showTable, setTableVisibility] = useState(false);
  const [boxWidth, setBoxWidth] = useState(0);

  const [isLock, setLockState] = useState(true);

  const colorFixer = (colors) => {
    let _colors = [];
    for (const _c of colors) {
      _colors = [
        ..._colors,
        function ({ value }) {
          if (value < 0) {
            return '#f00';
          } else {
            return _c;
          }
        }
      ];
    }

    return _colors;
  };

  useEffect(() => {
    const getWidthLayout = () => {
      const _w = chartData.series.map((_s) => {
        if (_s.type === 'bar') {
          return 0;
        } else {
          return 2;
        }
      });

      return _w;
    };

    if (chartData.type === 'pie') {
      setSeriesData([...chartData.series[0].data]);
    } else {
      setSeriesData([...chartData.series]);

      // Table data building

      let columnsa = [
        {
          title: '2020',
          dataIndex: `_xbTable`,
          key: '_xbTable',
          fixed: 'left',
          width: 250,
          align: 'left'
        }
      ];

      let datas = [];

      for (const _cv of chartData.labels) {
        columnsa = [
          ...columnsa,
          {
            title: _cv,
            dataIndex: `_xb${_cv.replace(/[{()-.,' '}]/g, '').toLowerCase()}`,
            width: 150,
            align: 'center'
          }
        ];
      }

      for (const _sv of chartData.series) {
        let i = 0;
        let _data = {};

        for (const _sd of _sv.data) {
          _data[`_xb${chartData.labels[i].replace(/[{()-.,' '}]/g, '').toLowerCase()}`] = _sd;

          i++;
        }

        _data[`_xbTable`] = _sv.name;
        datas = [...datas, _data];
      }

      for (const _ds of datas) {
        _ds.key = `_xb-${uuidv4()}`;
      }

      setTableColumns([...columnsa]);
      setTableData([...datas]);
    }

    /**
     * @object
     *
     * Arrange data for chart
     */

    switch (chartData.type) {
      case 'bar':
        setOptions((prevState) => {
          return {
            chart: {
              type: 'bar'
            },
            colors: colorFixer(chartData.colors),

            plotOptions: {
              bar: {
                ...chartData.plotOption,
                columnWidth: '65%'
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: [...chartData.labels]
            },

            fill: {
              opacity: 1
            },

            tooltip: {
              marker: {
                fillColors: [...chartData.colors]
              }
            },

            legend: {
              horizontalAlign: 'left',
              offsetX: 40,
              markers: {
                fillColors: [...chartData.colors]
              }
            },

            yaxis: [...chartData.axis]
          };
        });

        break;

      case 'pie':
        setOptions((prevState) => {
          return {
            chart: {
              width: 380,
              type: 'pie'
            },
            labels: [...chartData.labels],
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }
            ]
          };
        });

        break;

      case 'line':
        setOptions((prevState) => {
          return {
            chart: {
              type: 'line'
            },
            colors: colorFixer(chartData.colors),
            dataLabels: {
              enabled: false
            },

            stroke: {
              curve: 'straight'
            },
            markers: {
              size: 3
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              }
            },
            xaxis: {
              categories: [...chartData.labels]
            },
            tooltip: {
              marker: {
                fillColors: [...chartData.colors]
              }
            },
            legend: {
              horizontalAlign: 'left',
              offsetX: 40,
              markers: {
                fillColors: [...chartData.colors]
              }
            },

            yaxis: [...chartData.axis]
          };
        });

        break;
      case 'area':
        setOptions((prevState) => {
          return {
            chart: {
              type: 'area'
            },
            dataLabels: {
              enabled: false
            },
            colors: colorFixer(chartData.colors),
            stroke: {
              width: 2,
              curve: 'straight'
            },
            markers: {
              size: 3
            },
            xaxis: {
              categories: [...chartData.labels]
            },
            tooltip: {
              marker: {
                fillColors: [...chartData.colors]
              }
            },
            legend: {
              horizontalAlign: 'left',
              offsetX: 40,
              markers: {
                fillColors: [...chartData.colors]
              }
            },

            yaxis: [...chartData.axis]
          };
        });

        break;

      case 'combo':
        setOptions((prevState) => {
          return {
            chart: {
              type: 'line'
            },
            stroke: {
              curve: 'straight',
              width: getWidthLayout()
            },
            colors: colorFixer(chartData.colors),
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '100%'
              }
            },
            markers: {
              size: 3
            },
            dataLabels: {
              enabled: false
            },
            labels: [...chartData.labels],
            xaxis: {
              type: 'category'
            },
            tooltip: {
              show: false,
              marker: {
                fillColors: [...chartData.colors]
              }
            },
            legend: {
              horizontalAlign: 'left',
              offsetX: 40,
              markers: {
                fillColors: [...chartData.colors]
              }
            },

            yaxis: [...chartData.axis]
          };
        });

        break;

      default:
        break;
    }
  }, [chartData]);

  useEffect(() => {
    setLockState((prevState) => chartData.lockDrag);
    setBoxWidth((prevState) => chartData.boxWidth);
  }, [chartData]);

  const afterResize = (e, data) => {
    setBoxWidth(data.size.width);

    adjustWidthSettings(chartData._id, data.size.width);
  };

  return (
    /**
     * @string
     * chartData.name chartData.description
     */

    <Draggable
      isDragDisabled={isLock}
      key={chartData._id}
      draggableId={chartData._id}
      index={index}
    >
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className="mb-3 mr-2" style={{ maxWidth: `${1317}px`, width: `${boxWidth}px` }}>
            <ResizableBox
              axis="x"
              draggableOpts={{ grid: [5, 5] }}
              minConstraints={[370]}
              maxConstraints={[1317, 382]}
              width={boxWidth}
              height={382}
              onResizeStop={afterResize}
              className="shadow-sm"
            >
              <Card
                className=" p-0"
                title={
                  <Space>
                    <strong>{<ExactText text={chartData.name} />} </strong>

                    <p style={{ fontSize: '15px' }} className="m-0">
                      <strong>
                        {isLock ? (
                          <LockOutlined
                            style={{ color: '#f44336' }}
                            onClick={() => setLockState(false)}
                          />
                        ) : (
                          <UnlockOutlined
                            style={{ color: '#32ea6a' }}
                            onClick={() => setLockState(true)}
                          />
                        )}
                      </strong>
                    </p>
                  </Space>
                }
                extra={
                  <ExtraOptions
                    id={chartData._id}
                    removeChart={removeChart}
                    setTableVisibility={setTableVisibility}
                  />
                }
                size="small"
              >
                <Row>
                  <Col span={24}>
                    <Chart
                      options={options}
                      series={seriesData}
                      type={chartData.type === 'combo' ? 'line' : chartData.type}
                      width="100%"
                      height="301px"
                    />
                  </Col>
                </Row>
              </Card>
            </ResizableBox>
          </div>

          <Modal
            title={<ExactText text={chartData.name} />}
            centered
            visible={showTable}
            onOk={() => setTableVisibility(false)}
            onCancel={() => setTableVisibility(false)}
            width={1000}
            footer={[
              <Button key="submit" type="primary" onClick={() => setTableVisibility(false)}>
                Close
              </Button>
            ]}
          >
            <Row>
              <Col span={24}>
                <Table
                  columns={tableColumns}
                  dataSource={tableData}
                  size="small"
                  scroll={{ x: 1300 }}
                />
              </Col>
            </Row>
          </Modal>
        </div>
      )}
    </Draggable>
  );
});

export default Board;
