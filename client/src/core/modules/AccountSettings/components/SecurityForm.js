import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Space } from 'antd';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import './styles.css';

/**CORE IMPORTS */
import { ExactSmallText } from '@core_common/components';
import { email, required, similarTo } from '@core_common/antdhelpers/helperfunctions';
import { AccountSettingsController } from '@core_modules/AccountSettings/controller';
import { TWO_GRID } from '@core_common/antdhelpers/constants';

function SecurityForm({ store, handleToggleAccountSettingsModal }) {
  const [form] = Form.useForm();
  const { t } = useTranslation('common');

  const [isUpdatePassword, setIsUpdatePassword] = useState(false);

  const { handleSetSecurityDefaultValue, handleUpdatepassword } = AccountSettingsController({
    form,
    t,
    setIsUpdatePassword,
    store
  });

  // eslint-disable-next-line
  useEffect(handleSetSecurityDefaultValue, []);

  return (
    <div>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleUpdatepassword}
      //onFinishFailed={onFinishFailed}
      >
        <Row gutter={[16, 10]}>
          <Col {...TWO_GRID}>
            <Form.Item label={t('User Type')} name="type">
              <Input readOnly={true} placeholder={t("Administrator")} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 10]}>
          <Col {...TWO_GRID}>
            <Form.Item
              label={t('Email Address')}
              name="email"
              rules={[
                required(t('Please enter email address')),
                email(t('Please input a valid email address'))
              ]}
            >
              <Input readOnly placeholder={t('Email Address')} />
            </Form.Item>

            {isUpdatePassword && (
              <Form.Item
                label={t('New Password')}
                name="new_password"
                rules={[required(t('Please input your new password!'))]}
              >
                <Input.Password className="text-right" placeholder={t("New Password")} />
              </Form.Item>
            )}
          </Col>
          <Col {...TWO_GRID}>
            <Form.Item
              label={t('Password')}
              name="password"
              className={!isUpdatePassword && 'mb-0'}
              rules={[required(t('Please enter password'))]}
            >
              <Input.Password className="text-right" placeholder={t('Password')} />
            </Form.Item>

            {!isUpdatePassword && (
              <div className="d-flex justify-content-end">
                <div className="change-password-text" onClick={() => setIsUpdatePassword(true)}>
                  <ExactSmallText className="fst-italic" text={'Change Password'} />
                </div>
              </div>
            )}
            {isUpdatePassword && (
              <Form.Item
                label={t('Confirm New Password')}
                name="confirm_new_password"
                dependencies={['new_password']}
                hasFeedback
                rules={[
                  required(t('Please input your password!')),
                  ({ getFieldValue }) => similarTo('new_password', getFieldValue, t)
                ]}
              >
                <Input.Password className="text-right" placeholder={t("Confirm New Password")} />
              </Form.Item>
            )}
          </Col>
        </Row>

        <Form.Item>
          <div className="d-flex w-100 justify-content-end mt-5">
            <Space>
              <Button onClick={handleToggleAccountSettingsModal} type="default">
                {t('Cancel')}
              </Button>
              <Button
                loading={store.accountSettings.isUpdating}
                disabled={!isUpdatePassword}
                type="primary"
                htmlType="submit"
              >
                {t('Update')}
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default inject('store')(observer(SecurityForm));
