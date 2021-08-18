import React from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';

import CountryData from '@core_data/countries/Countries.json';

/**CORE IMPORTS */
import { ExactText } from '@core_common/components';
import { required } from '@core_common/antdhelpers/helperfunctions';

import { TWO_GRID } from '@core_common/antdhelpers/constants';

const { Option } = Select;

function AddressForm({ store }) {
  const { t } = useTranslation('common');

  return (
    <>
      <div className="mb-2">
        <ExactText text="Address" />
      </div>
      <Row gutter={[16, 0]}>
        <Col {...TWO_GRID}>
          <Form.Item
            name="country"
            label={t('Country')}
            rules={[required(t('Please enter country'))]}
          >
            <Select placeholder={t('Select A Country')} showSearch={true} className="w-100">
              {CountryData.map((row, index) => (
                <Option key={index} value={row.country}>
                  {row.country}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col {...TWO_GRID}>
          <Form.Item name="city" label={t('City')} rules={[required(t('Please enter city'))]}>
            <Select placeholder={t('Select A City')} showSearch={true} className="w-100">
              {store.UserManagementUtilities.cities.map((city, index) => (
                <Option key={index} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col {...TWO_GRID}>
          <Form.Item
            name="street_nr"
            label={t('Street')}
            rules={[required(t('Please enter Street'))]}
          >
            <Input className="w-100" placeholder={t('Street')} />
          </Form.Item>
        </Col>
        <Col {...TWO_GRID}>
          <Form.Item
            name="zip_code"
            label={t('ZIP')}
            rules={[required(t('Please enter zip code'))]}
          >
            <Input className="w-100" placeholder={t('ZIP')} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default inject('store')(observer(AddressForm));
