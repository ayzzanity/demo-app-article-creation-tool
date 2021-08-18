import React, { Suspense } from 'react';
import { Form, Modal, Space, Button, Checkbox } from 'antd';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

/**CORE IMPORTS */
import { ExactText, FallBackLoaders } from '@core_common/components';
import { UserManagementController } from '@core_modules/UserManagement/controller';
import { UserTypeForm, ProfileForm, AddressForm } from '@core_modules/UserManagement/components';

import CountryData from '@core_data/countries/Countries.json';

function AddOrUpdateUserModal({ store, form }) {
  const { t } = useTranslation('common');

  const { handleToggleAddOrUpdateShowUserModal, handleChangeForm, handleUpdateOrCreateUser } =
    UserManagementController({
      store,
      CountryData,
      form,
      t
    });

  const { isUpdate, showAddOrUpdateUserModal } = store.UserManagementUtilities;
  const { isCreating } = store.users;
  const { EmptyLoader } = FallBackLoaders;

  return (
    <Modal
      title={<ExactText text={isUpdate ? t('Update User') : t('Add New User')} />}
      visible={showAddOrUpdateUserModal}
      footer={null}
      className="exact-modal"
      style={{ top: 20 }}
      onCancel={handleToggleAddOrUpdateShowUserModal}
    >
      <Form
        form={form}
        name="control-hooks"
        layout="vertical"
        onFieldsChange={handleChangeForm}
        onFinish={(values) => handleUpdateOrCreateUser(values, isUpdate)}
      >
        <div id="profile">
          <Suspense fallback={EmptyLoader}>
            <UserTypeForm />
          </Suspense>
          <Suspense fallback={EmptyLoader}>
            <ProfileForm />
          </Suspense>
          <Suspense fallback={EmptyLoader}>
            <AddressForm />
          </Suspense>
        </div>

        <Form.Item name="sendInviteEmail" valuePropName="checked">
          <Checkbox>{t('Send Invitation Email')}</Checkbox>
        </Form.Item>
        <Form.Item>
          <div className="d-flex w-100 justify-content-end">
            <Space>
              <Button onClick={handleToggleAddOrUpdateShowUserModal} type="default">
                {t('Cancel')}
              </Button>
              <Button loading={isCreating} type="primary" htmlType="submit">
                {t(isUpdate ? t('Update') : t('Submit'))}
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default inject('store')(observer(AddOrUpdateUserModal));
