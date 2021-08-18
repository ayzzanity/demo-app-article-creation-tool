import React, { useState } from 'react';
import { Form, Modal, Select, Button, Space } from 'antd';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

/**CORE IMPORTS */
import { ExactText } from '@core_common/components';
import translationArray from '@core_modules/Translation/data/localesArray';
import { required } from '@core_common/antdhelpers/helperfunctions';
import { LanguageModalController } from '@core_modules/Translation/controller';

const { Option } = Select;

function AddLanguageModal({ store, form, modalVisible, setModalVisible }) {
  const { t } = useTranslation('common');
  const [isLoading, setIsLoading] = useState(false);
  const { handleClose, handleAdd } = LanguageModalController({
    t,
    store,
    setModalVisible,
    setIsLoading
  });

  return (
    <Modal
      title={<ExactText text={t('Add Language')} />}
      visible={modalVisible}
      footer={null}
      className="exact-modal"
      style={{ top: 20 }}
      onCancel={handleClose}
    >
      <Form
        form={form}
        name="language-form"
        layout="vertical"
        onFinish={handleAdd}
        //  onFieldsChange={handleChangeForm}
        //   onFinish={(values) => handleUpdateOrCreateUser(values, isUpdate)}
      >
        <Form.Item
          className="w-100"
          name="locale"
          label={t('Language')}
          rules={[required(t('Please enter first name'))]}
        >
          <Select placeholder={t('Please select language')} showSearch={true}>
            {translationArray.map((row) => (
              <Option key={row.locale} value={row.locale}>
                {row.language} [ {row.locale} ]
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="d-flex w-100 justify-content-end">
          <Space>
            <Button onClick={handleClose} type="default">
              {t('Cancel')}
            </Button>
            <Button htmlType="submit" loading={isLoading} type="primary">
              {t('Add')}
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
}

export default inject('store')(observer(AddLanguageModal));
