import React from 'react';
import { Avatar } from 'antd';
import {
  PieChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  AreaChartOutlined
} from '@ant-design/icons';

const ChartSourceDraggable = ({ item, _index }) => {
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
    <div
      style={{ userSelect: 'none', width: '120px' }}
      title={item.type}
      className="text-center mb-1"
    >
      <Avatar
        className="shadow-sm mb-1"
        size={40}
        style={{ backgroundColor: _index > -1 ? 'rgb(103 218 144)' : 'rgb(150 162 247)' }}
      >
        <h1 style={{ color: 'white', margin: '0px' }}>{getIcon(item.type)}</h1>
      </Avatar>

      <h5> {item.name} </h5>
    </div>
  );
};

export default ChartSourceDraggable;
