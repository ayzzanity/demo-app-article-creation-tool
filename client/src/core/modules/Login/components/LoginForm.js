import React from 'react';
import { inject, observer } from 'mobx-react';
import { Alert, Button, Checkbox, Form, Input, Typography, Dropdown } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/*CORE IMPORTS */
import { ExactText } from '@core_common/components';
import { email, required } from '@core_common/antdhelpers/helperfunctions';
import { Routes } from '@core_routing/';
import { LoginController } from '@core_modules/Login/controller';

import { OTPModal } from '@core_modules/Login/components';
import { UserMenu } from '@core_modules/Login/components';
//Flag

const { Text } = Typography;

function LoginForm({ store }) {
  const history = useHistory();
  const { globalState } = store;

  const [form] = Form.useForm();

  const { t } = useTranslation('common');
  const { handleLogin } = LoginController({ store, history, t });

  return (
    <>
      <div style={{ position: 'absolute', top: 10, right: 15 }}>
        <Dropdown overlay={<UserMenu />} placement="topRight" arrow>
          <Text>{globalState.language.toUpperCase()}</Text>
        </Dropdown>
      </div>
      <div className="mb-4 text-center">
        <Text>{t('Enter your email address and password to login')}</Text>
        {store.login.loginErrorMessage && (
          <Alert className="mt-3" message={t('Invalid email or password')} type="error" />
        )}
      </div>
      <Form form={form} name="control-hooks" layout="vertical" onFinish={handleLogin}>
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
        <Form.Item
          className="w-100"
          name="password"
          label={t('Password')}
          rules={[required(t('Please input your password!'))]}
        >
          <Input.Password className="w-100" placeholder={t('Password')} />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>{t('Remember Me')}</Checkbox>
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Button
            loading={store.login.isLoggingIn}
            className="w-100"
            htmlType="submit"
            type="primary"
          >
            {store.login.isLoggingIn ? t('Logging in') : t('Login')}
          </Button>
        </Form.Item>

        <div className="text-center">
          <Link to={Routes.RESET_PASSWORD_ROUTE}>
            <ExactText text={t('Forgot password')} />
          </Link>
        </div>
      </Form>

      <OTPModal />
    </>
  );
}

export default inject('store')(observer(LoginForm));
