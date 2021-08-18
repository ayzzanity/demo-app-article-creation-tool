import React, { useEffect } from 'react';
import { Col, Form, Row, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';

/**CORE IMPORTS */
import { ExactText } from '@core_common/components';
import { required } from '@core_common/antdhelpers/helperfunctions';
import { UserManagementController } from '@core_modules/UserManagement/controller';
import { TWO_GRID } from '@core_common/antdhelpers/constants';

const { Option } = Select;

function UserTypeForm({ store }) {
  const { t } = useTranslation('common');

  const { handleFetchUserTypes } = UserManagementController({ store });

  // eslint-disable-next-line
  useEffect(handleFetchUserTypes, []);

  return (
    <>
      <div className="mb-2">
        <ExactText text={t('User Type')} />
      </div>

      <Row gutter={[16, 0]}>
        <Col {...TWO_GRID}>
          <Form.Item
            className="w-100"
            name="user_type_id"
            label={t('Select a User Type')}
            rules={[required(t('Please enter first name'))]}
          >
            <Select placeholder={t('Please select type')} showSearch={true}>
              {store.UserManagementUtilities.userTypes.map((userType) => (
                <Option key={userType.id} value={userType.id}>
                  {userType.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default inject('store')(observer(UserTypeForm));
