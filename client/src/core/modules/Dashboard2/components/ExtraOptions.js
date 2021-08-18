import React from 'react';
import { Button, Space } from 'antd';
import { CloseCircleOutlined, EyeOutlined } from '@ant-design/icons';
const ExtraOptions = ({ setTableVisibility, removeChart, id }) => {
  return (
    <Space>
      <Button
        onClick={() => setTableVisibility((prevState) => !prevState)}
        type="primary"
        size="small"
        shape="circle"
        className="text-center"
      >
        <EyeOutlined className="m-0 mt-1" />
      </Button>

      <Button
        onClick={() => removeChart(id)}
        type="danger"
        size="small"
        shape="circle"
        className="text-center ml-2"
      >
        <CloseCircleOutlined className="m-0 mt-1" />
      </Button>
    </Space>
  );
};

export default ExtraOptions;
