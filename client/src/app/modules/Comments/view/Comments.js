import { useEffect, useState } from 'react';
import { ExactTitle } from '@core_common/components';
import { Card, Row, Col, Select, Space, Typography, Button, Popconfirm, Divider } from 'antd';
import { inject, observer } from 'mobx-react';
import { UserManagementController } from '@core_modules/UserManagement/controller';
import { CommentsController } from '../controller/';
import { CloseCircleOutlined } from '@ant-design/icons';

const Comments = ({ store }) => {
  const { getUsers } = UserManagementController({ store });
  const { getUserArticle, getCommentsById, handleDeleteComment } = CommentsController({ store });
  const [value, setValue] = useState(null);
  const { Title, Text } = Typography;
  const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short' });

  const { Option } = Select;
  useEffect(() => {
    getUsers();
    store.comments.clearComments();
  }, []);
  return (
    <Row gutter={24}>
      <Col span={24}>
        <ExactTitle level={3} text="Comments" />
        <Card>
          <Space>
            <Select
              placeholder="User"
              style={{ width: 200 }}
              onChange={(id) => {
                getUserArticle(id);
                setValue(null);
              }}
            >
              {store.users.state.map((_u) => (
                <Option key={_u.id} value={_u.id}>
                  {_u.first_name} {_u.last_name}
                </Option>
              ))}
            </Select>
            <Select
              placeholder="Article"
              value={value}
              style={{ width: 300 }}
              onChange={(value) => {
                getCommentsById(value);
                setValue(value);
              }}
            >
              {store.articles.state &&
                store.articles.state.map((_a) => (
                  <Option key={_a.id} value={_a.id}>
                    {_a.title}
                  </Option>
                ))}
            </Select>
          </Space>
        </Card>
        <Card
          loading={store.comments.loading}
          style={{ marginTop: 10 }}
          title={`Comment List (${store.comments.total})`}
        >
          {store.comments.state &&
            store.comments.state.map((_c) => (
              <>
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
                  <Col>
                    <Text type="secondary">
                      {`${formatter.format(Date.parse(_c.createdAt))} by ${_c.commentUser}`}{' '}
                    </Text>
                    <Divider />
                  </Col>
                </Row>
              </>
            ))}
        </Card>
      </Col>
    </Row>
  );
};

export default inject('store')(observer(Comments));
