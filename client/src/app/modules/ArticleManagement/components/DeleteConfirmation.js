import { Modal, Space, Typography, Divider, Form, Button, Input } from 'antd';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

/**ARTICLE IMPORTS */
import { ArticleController } from '@app_modules/ArticleManagement/controller';

/**CORE IMPORTS */
import { ExactText } from '@core_common/components';

const DeleteConfirmation = ({ store, form }) => {
  const { t } = useTranslation('common');
  const { Text } = Typography;
  const { singleState, isDeleting } = store.articles;
  const { showDeleteModal } = store.ArticleUtilities;
  const { handleConfirmForm, handleDeleteArticle, handleToggleShowDeleteModal } = ArticleController(
    { store, form }
  );

  return (
    <Modal
      visible={showDeleteModal}
      title={<ExactText text={t('Delete Confirmation')} />}
      footer={null}
      style={{ top: 20 }}
      onCancel={handleToggleShowDeleteModal}
    >
      <Space split={<div style={{ margin: 0, width: '470px' }} />} direction="vertical">
        {t('PLEASE CONFIRM THE DELETION OF THIS ARTICLE')}
        <Space direction="horizontal">
          <Text type="secondary">{t('Title')}</Text>
          <Text strong>{singleState.title.toUpperCase()}</Text>
        </Space>
        <Space>
          <Text type="secondary">{t('User Assigned')}</Text>
          <Text strong>
            {store.users.single.first_name.toUpperCase()}{' '}
            {store.users.single.last_name.toUpperCase()}
          </Text>
        </Space>
        <Space>
          <Text type="secondary">{t('Status')}</Text>
          <Text strong>{singleState.status.toUpperCase()}</Text>
        </Space>
        <Divider style={{ margin: 0 }} />
        <Form
          form={form}
          name="control-hooks"
          layout="vertical"
          onFieldsChange={handleConfirmForm}
          onFinish={(values) => handleDeleteArticle(values, singleState.id)}
        >
          <Form.Item
            name="confirmation"
            label={
              <Text>
                {t('Please type ')}
                <Text strong>{t('CONFIRM')}</Text>
                {t(' in the textbox to proceed')}
              </Text>
            }
          >
            <Input placeholder={t('Type here...')} />
          </Form.Item>
          <Form.Item>
            <div className="d-flex w-100 justify-content-end">
              <Space>
                <Button onClick={handleToggleShowDeleteModal} type="default">
                  {t('Cancel')}
                </Button>
                <Button loading={isDeleting} danger type="primary" htmlType="submit">
                  {t('DELETE ARTICLE')}
                </Button>
              </Space>
            </div>
          </Form.Item>
        </Form>
      </Space>
    </Modal>
  );
};

export default inject('store')(observer(DeleteConfirmation));
