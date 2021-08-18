import React from 'react';
import './styles.css';
import { Button, Col, Input, Row, Space, Affix } from 'antd';
import { inject, observer } from 'mobx-react';
import {
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
  SwitcherOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

/**COMPONENTS */

/**CORE IMPORTS */
import { ExactTitle } from '@core_common/components';
import {
  TranslationController,
  LanguageModalController
} from '@core_modules/Translation/controller';
import { ANTD_HALF_COL } from '@core_common/antdhelpers/constants';

function TranslationHeader({
  isDeleteVisible,
  store,
  form,
  setSearchKeyword,
  setCount,
  setModalVisible
}) {
  const { t } = useTranslation('common');
  const { handleUpdateTranslation, handleAdd, toggleUpdateKey } = TranslationController({
    t,
    store,
    setCount
  });
  const { showLanguageModal } = LanguageModalController({
    t,
    store,
    setModalVisible
  });

  return (
    <>
      <Affix offsetTop={30}>
        <Row>
          <Col md={{ span: ANTD_HALF_COL }}>
            <ExactTitle level={3} text={t('Translation')} />
          </Col>
          <Col
            className="d-flex w-100 justify-content-end align-items-center"
            md={{ span: ANTD_HALF_COL }}
          >
            <Space className="mb-3">
              {isDeleteVisible && (
                <Button className="shadow-sm" type="primary" danger icon={<DeleteOutlined />} />
              )}

              <Button
                onClick={handleUpdateTranslation}
                className="shadow-sm"
                type="primary"
                icon={<UploadOutlined />}
              >
                {t('Apply changes')}
              </Button>
              <Button
                onClick={toggleUpdateKey}
                className={store.translations.isUpdateKey ? 'shadow-sm border-green' : 'shadow-sm'}
                type="default"
                icon={<SwitcherOutlined />}
              />
              <Button
                onClick={showLanguageModal}
                className="shadow-sm"
                type="default"
                icon={<GlobalOutlined />}
              />
              <Button
                onClick={handleAdd}
                className="shadow-sm"
                type="default"
                icon={<PlusOutlined />}
              />

              <Input.Search
                className="shadow-sm"
                onSearch={(value) => setSearchKeyword(value)}
                onChange={(e) =>
                  !!!e.currentTarget.value && setSearchKeyword(e.currentTarget.value)
                }
                id="exact-search"
                placeholder={t('Search')}
                enterButton={t('Search')}
              />
            </Space>
          </Col>
        </Row>
      </Affix>
    </>
  );
}

export default inject('store')(observer(TranslationHeader));
