import { Modal, Space, Typography, Divider, Image } from 'antd';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

/**ARTICLE IMPORTS */
import { ArticleController } from '@app_modules/ArticleManagement/controller';

/**CORE IMPORTS */
import { ExactText } from '@core_common/components';

const ArticleView = ({ store }) => {
  const { t } = useTranslation('common');
  const { Text } = Typography;
  const { singleState } = store.articles;
  const { showViewModal, DEFAULT_IMG } = store.ArticleUtilities;
  const { handleToggleShowViewModal } = ArticleController({ store });

  return (
    <Modal
      visible={showViewModal}
      title={<ExactText text={t('Article Preview')} />}
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
          <Text type="secondary">{t('Title')}</Text>
          <Text strong>{singleState.title}</Text>
        </Space>
        <Space direction="vertical">
          <Text type="secondary">{t('Content')}</Text>
          <div dangerouslySetInnerHTML={{ __html: singleState.content }} />
        </Space>
        <Space direction="horizontal">
          <Text type="secondary">
            {singleState.status === 'Draft' ? t('Drafted By') : t('Published By')}
          </Text>
          <Text strong>
            {store.users.single.first_name} {store.users.single.last_name}
          </Text>
        </Space>
        <Space direction="horizontal">
          <Text type="secondary">{t('Publish Date')}</Text>
          <Text strong>{singleState.publishDate}</Text>
        </Space>
        <Space direction="horizontal">
          <Text type="secondary">{t('Status')}</Text>
          <Text strong>{singleState.status}</Text>
        </Space>
        <Space />
      </Space>
    </Modal>
  );
};

export default inject('store')(observer(ArticleView));
