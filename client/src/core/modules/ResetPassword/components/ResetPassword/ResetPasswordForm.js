import React from 'react';
import { Alert, Button, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';

/*CORE IMPORTS */
import { ExactText, ExactTitle } from '@core_common/components';
import { email, required } from '@core_common/antdhelpers/helperfunctions';
import { ResetPasswordController } from '@core_modules/ResetPassword/controller';
import CountdownComponent from './Countdown';

const { Text } = Typography;

function ResetPasswordForm({ store }) {
  const [form] = Form.useForm();
  const { t } = useTranslation('common');

  const { handleResetPassword } = ResetPasswordController({ store });

  return (
    <>
      <div className="mb-4 text-center">
        <ExactTitle level={2} text={t('RESET PASSWORD')} />
        <Text>
          {t(
            "Enter your email address and we'll send you a temporary password Change your password immediately after logging-in"
          )}
        </Text>
        {store.resetPassword.message && (
          <Alert
            className="mt-3"
            message={store.resetPassword.message}
            type={store.resetPassword.isSuccess ? 'success' : 'error'}
          />
        )}
      </div>
      <Form onFinish={handleResetPassword} form={form} name="control-hooks" layout="vertical">
        <Form.Item
          className="w-100"
          name="email"
          label={t('Email Address')}
          rules={[
            required(t('Please input your email address!')),
            email(t('Please input a valid email address'))
          ]}
        >
          <Input
            autoComplete="off"
            autoCorrect="off"
            autoFocus="on"
            className="w-100"
            placeholder={t('Email Address')}
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Button
            disabled={store.resetPassword.startCountdown}
            loading={store.resetPassword.isSendingEmail}
            className="w-100"
            htmlType="submit"
            type="primary"
          >
            {t('RESET PASSWORD')}
          </Button>

          {store.resetPassword.startCountdown && <CountdownComponent />}
        </Form.Item>

        <div className="text-center">
          <Link to="/login">
            <ExactText text={t('Back to Login')} />
          </Link>
        </div>
      </Form>
    </>
  );
}

export default inject('store')(observer(ResetPasswordForm));
