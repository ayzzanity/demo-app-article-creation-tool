import React, { Suspense, useEffect } from 'react';
import { Form, Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';

import './styles.css';

import { FallBackLoaders } from '@core_common/components';
import { UserManagementController } from '@core_modules/UserManagement/controller';
import CountryData from '@core_data/countries/Countries.json';
import {
  AddressForm,
  ProfileForm as ProfileFormComponent
} from '@core_modules/UserManagement/components';
import { AccountSettingsController } from '@core_modules/AccountSettings/controller';

function ProfileForm({ store, handleToggleAccountSettingsModal }) {
  const [form] = Form.useForm();
  const { t } = useTranslation('common');

  const { handleChangeForm, handleUpdateOrCreateUser } = UserManagementController({
    store,
    CountryData,
    form,
    t
  });

  const { handleSetUpdateId } = AccountSettingsController({ store, form });

  //const { isCreatingUser } = store.users;
  const { EmptyLoader } = FallBackLoaders;

  // eslint-disable-next-line
  useEffect(handleSetUpdateId, []);

  return (
    <>
      <Form
        form={form}
        name="control-hooks"
        layout="vertical"
        onFieldsChange={handleChangeForm}
        onFinish={(values) => handleUpdateOrCreateUser(values, true, true)}
      >
        <div id="profile">
          <Suspense fallback={EmptyLoader}>
            <ProfileFormComponent />
          </Suspense>
          <Suspense fallback={EmptyLoader}>
            <AddressForm />
          </Suspense>
        </div>

        <Form.Item>
          <div className="d-flex w-100 justify-content-end mt-5">
            <Space>
              <Button onClick={handleToggleAccountSettingsModal} type="default">
                {t('Cancel')}
              </Button>
              <Button type="primary" htmlType="submit">
                {t('Update')}
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </>
  );
}

export default inject('store')(observer(ProfileForm));
