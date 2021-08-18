import React from 'react';
import { Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';

/**CORE IMPORTS */
import { ExactText } from '@core_common/components';
import { required } from '@core_common/antdhelpers/helperfunctions';
import { TWO_GRID } from '@core_common/antdhelpers/constants';

function ProfileForm() {
  const { t } = useTranslation('common');

  return (
    <>
      <div className="mb-2">
        <ExactText text={t("Profile")} />
      </div>
      <Row gutter={[16, 0]}>
        <Col {...TWO_GRID}>
          <Form.Item
            className="w-100"
            name="first_name"
            label={t('First name')}
            rules={[required(t('Please enter first name'))]}
          >
            <Input className="w-100" placeholder={t('First name')} />
          </Form.Item>
        </Col>
        <Col {...TWO_GRID}>
          <Form.Item
            name="last_name"
            label={t('Last Name')}
            rules={[required(t('Please enter last name'))]}
          >
            <Input className="w-100" placeholder={t('Last Name')} />
          </Form.Item>
        </Col>
        <Col {...TWO_GRID}>
          <Form.Item
            name="email"
            label={t('Email Address')}
            rules={[required(t('Please enter email address'))]}
          >
            <Input className="w-100" placeholder={t('Email Address')} />
          </Form.Item>
        </Col>
        <Col {...TWO_GRID}>
          <Form.Item
            name="phone_number"
            label={t('Phone Number')}
            rules={[required(t('Please enter phone number'))]}
          >
            <Input className="w-100" placeholder={t('Phone Number')} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default ProfileForm;
