import { Space, Divider, Typography, Button, Popconfirm } from 'antd';
import { EditFilled, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const ArticleMobileView = ({ articleData, handleView, handleDelete, handleUpdate }) => {
  const { t } = useTranslation('common');
  const { Text } = Typography;

  return (
    <Space
      split={<Divider style={{ paddingTop: 10, paddingBottom: 10, margin: 0 }} />}
      direction="vertical"
    >
      <Space direction="vertical">
        <Text type="secondary">{t('Title')}</Text>
        <Text strong>{articleData.title}</Text>
      </Space>

      <Space direction="vertical">
        <Text type="secondary">{t('Published By')}</Text>
        <Text strong>
          {articleData.Users.first_name} {articleData.Users.last_name}
        </Text>
      </Space>
      <Space direction="vertical">
        <Text type="secondary">{t('Publish Date')}</Text>
        <Text strong>{articleData.publishDate}</Text>
      </Space>
      <Space direction="vertical">
        <Text type="secondary">{t('Status')}</Text>
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
          {t('Update')}
        </Button>
        <Button
          onClick={() => {
            handleView(articleData);
          }}
          icon={<EyeOutlined />}
          type="link"
        >
          {t('Preview')}
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
            {t('Delete')}
          </Button>
        </Popconfirm>
      </Space>
    </Space>
  );
};

export default ArticleMobileView;
