import React, { Suspense } from 'react';
import { Modal, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';

/**CORE IMPORTS */
import { ExactText, FallBackLoaders } from '@core_common/components';
import { ProfileForm, SecurityForm } from '@core_modules/AccountSettings/components';
import { AccountSettingsController } from '../controller';

const { TabPane } = Tabs;

function AccountSettings({ isModalVisible, setIsModalVisible }) {
  const { t } = useTranslation('common');

  const { handleToggleAccountSettingsModal } = AccountSettingsController({
    isModalVisible,
    setIsModalVisible
  });

  function callback(key) {
    console.log(key);
  }

  return (
    <Modal
      title={<ExactText text={t('Account Settings')} />}
      visible={isModalVisible}
      bodyStyle={{ paddingTop: 0, paddingBottom: 10 }}
      footer={null}
      className="exact-modal"
      style={{ top: 20 }}
      onCancel={handleToggleAccountSettingsModal}
    >
      <Tabs type="card" defaultActiveKey="1" onChange={callback}>
        <TabPane tab="PROFILE" key="1">
          <Suspense fallback={FallBackLoaders.EmptyLoader}>
            <ProfileForm handleToggleAccountSettingsModal={handleToggleAccountSettingsModal} />
          </Suspense>
        </TabPane>
        <TabPane tab="SECURITY" key="2">
          <Suspense fallback={FallBackLoaders.EmptyLoader}>
            <SecurityForm handleToggleAccountSettingsModal={handleToggleAccountSettingsModal} />
          </Suspense>
        </TabPane>
      </Tabs>
    </Modal>
  );
}

export default AccountSettings;
