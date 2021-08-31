import { ExactText } from '@core_common/components';
import { Card, Col, Input, Button, Divider, Form, Typography } from 'antd';
import { inject, observer } from 'mobx-react';
import { CommentsController } from '@app_modules/Comments/controller';

const ArticleComments = ({ store, id }) => {
  const { Title, Text } = Typography;
  const [form] = Form.useForm();
  const { handleAddingComment } = CommentsController({ store, form });
  const { loading } = store.display;
  const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short' });

  return (
    <Col span={24}>
      <Card
        loading={loading}
        style={{ marginTop: 10 }}
        title={`Comments (${!loading ? store.comments.total : 0})`}
      >
        {store.comments.state &&
          store.comments.state.map((_c) => (
            <>
              <Title style={{ marginBottom: 0 }} level={5}>
                {_c.commentBody}{' '}
              </Title>
              <Text type="secondary">
                {`${formatter.format(Date.parse(_c.createdAt))} by ${_c.commentUser}`}{' '}
              </Text>
            </>
          ))}
        <Divider orientation="left" style={{ marginTop: 20 }} />
        <ExactText text="Add Comment" />
        <Col span={24}>
          <Form
            form={form}
            onFinish={(comment) => {
              handleAddingComment(comment, id);
            }}
          >
            <Form.Item
              name="commentUser"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input placeholder="Add Name..." style={{ background: '#DDDDDD' }} />
            </Form.Item>
            <Form.Item
              name="commentBody"
              rules={[{ required: true, message: 'Please input your comment!' }]}
            >
              <Input.TextArea
                placeholder="Add Comment..."
                autoSize={{ minRows: 4, maxRows: 18 }}
                style={{ background: '#DDDDDD' }}
              />
            </Form.Item>
            <Button style={{ marginLeft: 10 }} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Card>
    </Col>
  );
};

export default inject('store')(observer(ArticleComments));
