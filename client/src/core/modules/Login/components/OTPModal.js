import React from 'react';
import { Alert, Button, Form, Input, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

/**CORE IMPORTS */
import { ExactText } from '@core_common/components';
import { required } from '@core_common/antdhelpers/helperfunctions';
import { LoginController } from '@core_modules/Login/controller';

function OTPModal({ store }) {
  const [form] = Form.useForm();
  const { t } = useTranslation('common');
  const history = useHistory();

  const { handleOTP } = LoginController({ store, history, t });

  return (
    <Modal
      title={<ExactText text={t('Enter One Time Pin')} />}
      visible={store.login.showOTP}
      footer={null}
    >
      <div className="d-flex align-items-center justify-content-center">
        <Form
          form={form}
          className="w-75"
          name="basic"
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={handleOTP}
        >
          <Alert
            className="mb-3"
            message={t(
              'You have logged-in using a new device We have sent an email message containing a  pin code to verify your identity'
            )}
            type="warning"
          />

          <Form.Item label={null} name="pin" rules={[required(t('Enter One Time Pin'))]}>
            <Input placeholder={t('PIN Code')} />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              loading={store.login.isLoggingIn}
              className="w-100"
              htmlType="submit"
              type="primary"
            >
              {store.login.isLoggingIn ? t('Logging in') : t('Submit')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default inject('store')(observer(OTPModal));
