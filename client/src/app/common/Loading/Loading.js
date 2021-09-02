import { Col } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
const Loading = () => {
  return (
    <Col className="d-flex justify-content-center align-items-center w-100 h-100">
      <ReloadOutlined spin style={{ fontSize: 50 }} />
    </Col>
  );
};

export default Loading;
