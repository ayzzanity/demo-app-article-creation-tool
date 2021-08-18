import React from 'react';
import { Row, Col, Card, Avatar, Upload } from 'antd';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import {
  PieChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  AreaChartOutlined,
  FileExcelOutlined
} from '@ant-design/icons';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
const { Dragger } = Upload;

const MainActionBox = ({ fileBeforeLoad, dashboards, localDashboards }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'pie':
        return <PieChartOutlined />;

      case 'bar':
        return <BarChartOutlined />;

      case 'line':
        return <LineChartOutlined />;

      case 'area':
        return <AreaChartOutlined />;

      case 'combo':
        return <LineChartOutlined />;

      default:
        return type;
    }
  };

  return (
    <Card className="shadow-sm" bodyStyle={{ paddingBottom: '10px', paddingTop: '10px' }}>
      <Row className="d-flex align-items-center">
        <Col span={3} style={{ borderRight: '2ps solid gray' }}>
          <Dragger
            accept=".xlsx, .csv, .json"
            showUploadList={false}
            beforeUpload={(file) => fileBeforeLoad(file)}
            name="files"
          >
            <p className="ant-upload-drag-icon mb-1">
              {/* <Avatar className="shadow-sm" size={64} style={{ backgroundColor:'rgb(103 218 144)' }}>
                        <div style={{ color: 'white' }}>
                        </div>
                     </Avatar> */}
              <FileExcelOutlined />
            </p>
            Import File
          </Dragger>
        </Col>
        <Col className="pl-4" span={21}>
          <Droppable droppableId="una">
            {(provided, snapshot) => (
              <PerfectScrollbar>
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="d-flex align-items-center"
                  style={{ maxWidth: '1300px' }}
                >
                  {dashboards.length === 0
                    ? ''
                    : dashboards.map((item, _i) => {
                        const _index = localDashboards.findIndex((_ld) => item._id === _ld._id);

                        return (
                          <Draggable
                            isDragDisabled={_index > -1 ? true : false}
                            key={`_xb${item._id}`}
                            draggableId={`_xb${item._id}`}
                            index={_i}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div
                                  style={{ userSelect: 'none', width: '150px' }}
                                  key={`_xb${item._id}`}
                                  title={item.type}
                                  className="text-center mb-2"
                                >
                                  <Avatar
                                    className="shadow-sm"
                                    size={64}
                                    style={{
                                      backgroundColor:
                                        _index > -1 ? 'rgb(103 218 144)' : 'rgb(150 162 247)'
                                    }}
                                  >
                                    <h1 style={{ color: 'white' }}>{getIcon(item.type)}</h1>
                                  </Avatar>
                                  <h4> {item.name} </h4>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}

                  {provided.placeholder}
                </div>
              </PerfectScrollbar>
            )}
          </Droppable>
        </Col>
      </Row>
    </Card>
  );
};

export default MainActionBox;
