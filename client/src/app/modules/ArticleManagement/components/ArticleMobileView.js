import { Space, Divider, Typography, Button, Popconfirm } from 'antd';
import { EditFilled, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
const ArticleMobileView = ({ articleData, handleView, handleDelete, handleUpdate }) => {
  const { Text } = Typography;
  return (
    <Space
      split={<Divider style={{ paddingTop: 10, paddingBottom: 10, margin: 0 }} />}
      direction="vertical"
    >
      <Space direction="vertical">
        <Text type="secondary">Title</Text>
        <Text strong>{articleData.title}</Text>
      </Space>

      <Space direction="vertical">
        <Text type="secondary">Published By</Text>
        <Text strong>
          {articleData.Users.first_name} {articleData.Users.last_name}
        </Text>
      </Space>
      <Space direction="vertical">
        <Text type="secondary">Publish Date</Text>
        <Text strong>{articleData.publishDate}</Text>
      </Space>
      <Space direction="vertical">
        <Text type="secondary">Status</Text>
        <Text strong>{articleData.status}</Text>
      </Space>

      <Space>
        <Button
          onClick={() => {
            handleUpdate(articleData, true);
          }}
          icon={<EditFilled />}
          type="link"
          style={{ color: '#009174' }}
        >
          Update
        </Button>
        <Button
          onClick={() => {
            handleView(articleData);
          }}
          icon={<EyeOutlined />}
          type="link"
        >
          Preview
        </Button>
        <Popconfirm
          placement="topRight"
          title={`Are you sure to delete this Article?`}
          onConfirm={() => {
            handleDelete(articleData);
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} type="link" style={{ color: '#9B2311' }}>
            Delete
          </Button>
        </Popconfirm>
      </Space>
    </Space>
  );
};

export default ArticleMobileView;
