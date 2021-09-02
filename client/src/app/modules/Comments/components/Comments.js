import { Row, Col, Typography, Button, Popconfirm, Divider } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';

import { CommentsController } from '@app_modules/Comments/controller';
import { DateFormatter } from '@app_common';

const Comments = ({ store }) => {
  const { handleDeleteComment } = CommentsController({ store });
  const { Title, Text } = Typography;
  const { formatDate } = DateFormatter('long', 'long');
  return (
    <>
      {store.comments.state &&
        store.comments.state.map((_c) => (
          <Row>
            <Col span={23}>
              <Title className="mb-0" level={5}>
                {_c.commentBody}
              </Title>
            </Col>
            <Col span={1} className="d-flex w-100 justify-content-end align-items-center">
              <Popconfirm
                placement="topLeft"
                title="Delete Comment?"
                onConfirm={() => {
                  handleDeleteComment(_c.id);
                }}
              >
                <Button danger type="link" size="small" icon={<CloseCircleOutlined />} />
              </Popconfirm>
            </Col>
            <Col span={24}>
              <Text type="secondary">{`${formatDate(_c.createdAt)} by ${_c.commentUser}`} </Text>
              <Divider />
            </Col>
          </Row>
        ))}
    </>
  );
};

export default inject('store')(observer(Comments));
