import { Modal, Space, Typography, Divider, Image } from 'antd';
import { inject, observer } from 'mobx-react';
import { ArticleController } from '../controller';
import { ExactText } from '@core_common/components';
const ArticleView = ({ store }) => {
  const { Text } = Typography;
  const { singleState } = store.articles;
  const { showViewModal, DEFAULT_IMG } = store.ArticleUtilities;
  const { handleToggleShowViewModal } = ArticleController({ store });

  return (
    <Modal
      visible={showViewModal}
      title={<ExactText text="Article Preview" />}
      footer={null}
      className="exact-modal"
      style={{ top: 20 }}
      onCancel={handleToggleShowViewModal}
    >
      <Space
        split={<Divider style={{ paddingTop: 10, paddingBottom: 10, margin: 0 }} />}
        direction="vertical"
      >
        <Image
          src={singleState.imageHeader}
          fallback={DEFAULT_IMG}
          preview={singleState.imageHeader}
        />
        <Space direction="horizontal">
          <Text type="secondary">Title</Text>
          <Text strong>{singleState.title}</Text>
        </Space>
        <Space direction="vertical">
          <Text type="secondary">Content</Text>

          <div dangerouslySetInnerHTML={{ __html: singleState.content }} />
        </Space>
        <Space direction="horizontal">
          <Text type="secondary">
            {singleState.status === 'Draft' ? 'Drafted By' : 'Published By'}
          </Text>
          <Text strong>
            {store.users.single.first_name} {store.users.single.last_name}
          </Text>
        </Space>
        <Space direction="horizontal">
          <Text type="secondary">Publish Date</Text>
          <Text strong>{singleState.publishDate}</Text>
        </Space>
        <Space direction="horizontal">
          <Text type="secondary">Status</Text>
          <Text strong>{singleState.status}</Text>
        </Space>
        <Space />
      </Space>
    </Modal>
  );
};

export default inject('store')(observer(ArticleView));
