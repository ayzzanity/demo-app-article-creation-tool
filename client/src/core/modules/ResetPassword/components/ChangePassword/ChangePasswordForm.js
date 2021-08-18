import React, { useEffect } from 'react';
import { Alert, Button, Form, Input, Typography } from 'antd';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useParams } from 'react-router-dom';

/**CORE IMPORTS */
import { ExactText, ExactTitle } from '@core_common/components';
import { required, similarTo, min, max } from '@core_common/antdhelpers/helperfunctions';
import { ResetPasswordController } from '@core_modules/ResetPassword/controller';

const { Text } = Typography;

function ChangePasswordForm({ store }) {
  const params = useParams();
  const history = useHistory();
  const { t } = useTranslation('common');
  const [form] = Form.useForm();

  const { handleValidateUserAndToken, cleanUpMessage, handleChangePassword } =
    ResetPasswordController({ store, params, history });

  useEffect(() => {
    handleValidateUserAndToken();
    return () => {
      cleanUpMessage();
    };
    // eslint-disable-next-line
  }, []);

  return store.resetPassword.islinkexpired ? (
    <>
      <div className="mb-4 text-center">
        {store.resetPassword.message && (
          <Alert
            className="mt-3"
            message={t('The link has no longer available or link has expired')}
            type={store.resetPassword.isSuccess ? 'success' : 'error'}
          />
        )}
      </div>
      <div className="text-center">
        <Link to="/reset-password">
          <ExactText text={t('Back to Reset Password')} />
        </Link>
      </div>
    </>
  ) : (
    <>
      <div className="mb-4 text-center">
        <ExactTitle level={2} text={t('Create New Password')} />

        <Text>{t('Please add your new password')}</Text>
        {store.resetPassword.message && (
          <Alert
            className="mt-3"
            message={store.resetPassword.message}
            type={store.resetPassword.isSuccess ? 'success' : 'error'}
          />
        )}
      </div>
      <Form form={form} name="control-hooks" layout="vertical" onFinish={handleChangePassword}>
        <Form.Item
          name="password"
          label={t("New Password")}
          rules={[
            required(t('Please input your new password!')),
            min(8, t('Password must be of minimum 8 characters length')),
            max(72, t('Password must be of maximum 72 characters length'))
          ]}
        >
          <Input.Password placeholder={t("New Password")} />
        </Form.Item>

        <Form.Item
          name="confirm"
          label={t("Confirm New Password")}
          dependencies={['password']}
          hasFeedback
          rules={[
            required(t('Please confirm your new password!')),
            ({ getFieldValue }) => similarTo('password', getFieldValue, t)
          ]}
        >
          <Input.Password placeholder={t("Confirm New Password")} />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Button
            loading={store.resetPassword.isChangingPassword}
            className="w-100"
            htmlType="submit"
            type="primary"
          >
            {t('RESET PASSWORD')}
          </Button>
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

export default inject('store')(observer(ChangePasswordForm));
