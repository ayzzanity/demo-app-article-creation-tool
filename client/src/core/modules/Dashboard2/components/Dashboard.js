import React, { useContext, useState, useEffect } from 'react';
import { Row, Col } from 'antd';
// import { serialize, deserialize } from 'bson'
// import { saveAs } from 'file-saver'
import { DropboxOutlined } from '@ant-design/icons';

import { withRouter } from 'react-router-dom';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// Contexts
import { DashboardContext } from '../../contexts/DashboardContext';
// Components
import Board from './Board';
import MainActionBox from './MainActionBox';
// animations
// import { AnimateGroup } from '../animations/Animate'
// import XLSX from 'xlsx'
import './main.css';
// images

const boxWidth = 1317;

const Dashboard = withRouter(({ history }) => {
  const { dashboards, dispatch: dashboardDispatch } = useContext(DashboardContext);

  const [localDashboards, setLocalDashboards] = useState([]);

  const [addingNewChart, setAddingNewChart] = useState(false);
  const [scrollPosition, setSrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;

    setSrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const _dshb = JSON.parse(localStorage.getItem('dashboards'));

    if (_dshb) {
      setLocalDashboards([..._dshb]);
    }
  }, []);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const reOrderFromUna = (list, obj, endIndex) => {
    const result = Array.from(list);
    result.splice(endIndex, 0, obj);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (
      !result.destination ||
      result.destination.droppableId === 'una' ||
      (result.destination.index === result.source.index &&
        result.source.droppableId === 'pangalawa')
    ) {
      return;
    }

    if (localDashboards.length > 0) {
      setAddingNewChart(true);
    }

    if (result.source.droppableId === 'una') {
      // Item/board to be inserted in for chart

      const _object = dashboards[result.source.index];

      setLocalDashboards((prevState) => {
        _object.lockDrag = true;
        _object.boxWidth = boxWidth;

        if (result.destination.index === 0) {
          const items = [_object, ...prevState];

          localStorage.setItem('dashboards', JSON.stringify(items));

          return items;
        } else {
          prevState = [...prevState];

          const items = reOrderFromUna(prevState, _object, result.destination.index);

          localStorage.setItem('dashboards', JSON.stringify(items));

          return items;
        }
      });
    } else {
      const items = reorder(localDashboards, result.source.index, result.destination.index);

      setLocalDashboards(items);

      localStorage.setItem('dashboards', JSON.stringify(items));
    }

    if (localDashboards.length > 0) {
      setTimeout(() => {
        setAddingNewChart(false);
      }, 1280);
    }
  };

  const removeChart = (id) => {
    if (localDashboards.length > 1) {
      setAddingNewChart(true);
    }

    setLocalDashboards((prevState) => {
      const _db = prevState.filter((_ps) => _ps._id !== id);

      localStorage.setItem('dashboards', JSON.stringify(_db));

      return _db;
    });

    if (localDashboards.length > 1) {
      setTimeout(() => {
        setAddingNewChart(false);
      }, 1280);
    }
  };

  const fileBeforeLoad = React.useCallback(
    (file) => {
      // const datas =serialize(doc[0])

      // De serialize it again
      // const doc_2 = JSON.stringify(deserialize(datas))

      // const blob = new Blob([doc_2], {type: "application/json;charset=utf-8"})
      // saveAs(blob, "test.json")

      // for (const _d of datas) {

      // dashboardDispatch({type: 'ADD', key: 'dashboards', payload: doc_2 })
      // }

      const reader = new FileReader();

      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);

        for (const _d of data) {
          dashboardDispatch({ type: 'ADD', key: 'dashboards', payload: _d });
        }
      };

      reader.readAsText(file);

      return false;
    },
    [dashboardDispatch]
  );

  const adjustWidthSettings = (id, width) => {
    setLocalDashboards((prevState) => {
      const _index = prevState.findIndex((_ps) => _ps._id === id);

      prevState[_index].boxWidth = width;

      localStorage.setItem('dashboards', JSON.stringify(prevState));

      return prevState;
    });
  };

  return (
    <Row className="mb-2">
      <Col span={24}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Row className={scrollPosition < 100 ? 'px-3 stick-em-up mb-3' : 'stick-em-up mb-3'}>
            <Col span={24}>
              <MainActionBox
                fileBeforeLoad={fileBeforeLoad}
                dashboards={dashboards}
                localDashboards={localDashboards}
              />
            </Col>
          </Row>
          <Row className="px-3">
            <Col span={24}>
              <Droppable droppableId="pangalawa">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center'
                    }}
                  >
                    {localDashboards.length === 0 ? (
                      <Row style={{ marginTop: '230px' }}>
                        <Col span={24}>
                          <div className="text-center">
                            <p style={{ fontSize: '50px', margin: 0 }}>
                              <DropboxOutlined />
                            </p>
                            <h1> Drop Here </h1>
                          </div>
                        </Col>
                      </Row>
                    ) : !addingNewChart ? (
                      localDashboards.map((item, _i) => (
                        <Row key={_i}>
                          <Col span={24}>
                            <Board
                              adjustWidthSettings={adjustWidthSettings}
                              removeChart={removeChart}
                              chartData={item}
                              index={_i}
                            />
                          </Col>
                        </Row>
                      ))
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
                              <h3>Rendering Charts ... </h3>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
          </Row>
        </DragDropContext>
      </Col>
    </Row>
  );
});

export default Dashboard;
