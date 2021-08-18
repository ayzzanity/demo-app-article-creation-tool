import React, { Suspense } from 'react';
import { Button, Col, Input, Row, Space } from 'antd';
import { inject, observer } from 'mobx-react';
import { PlusOutlined, DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

/**COMPONENTS */

/**CORE IMPORTS */
import { ExactTitle, FallBackLoaders } from '@core_common/components';
import { AddOrUpdateUserModal } from '@core_modules/UserManagement/components';
import { UserManagementController } from '@core_modules/UserManagement/controller';
import { ANTD_HALF_COL } from '@core_common/antdhelpers/constants';

function UserManagementHeader({ isDeleteVisible, store, form }) {
  const { t } = useTranslation('common');
  const { handleToggleAddOrUpdateShowUserModal, handleUserSearch } = UserManagementController({
    store
  });

  return (
    <>
      <Row>
        <Col md={{ span: ANTD_HALF_COL }}>
          {' '}
          <ExactTitle level={3} text={t('User Management')} />
        </Col>
        <Col
          className="d-flex w-100 justify-content-end align-items-center"
          md={{ span: ANTD_HALF_COL }}
        >
          {' '}
          <Space className="mb-3">
            {isDeleteVisible && (
              <Button className="shadow-sm" type="primary" danger icon={<DeleteOutlined />} />
            )}

            <Button
              onClick={() => handleToggleAddOrUpdateShowUserModal()}
              className="shadow-sm"
              type="default"
              icon={<PlusOutlined />}
            />

            <Button className="shadow-sm" type="default" icon={<DownloadOutlined />} />

            <Input.Search
              className="shadow-sm"
              onSearch={handleUserSearch}
              id="exact-search"
              placeholder={t('Search')}
              enterButton={t('Search')}
            />
          </Space>
        </Col>
      </Row>

      <Suspense fallback={FallBackLoaders.EmptyLoader}>
        <AddOrUpdateUserModal form={form} />
      </Suspense>
    </>

    // <div id="hide-on-print" className="d-flex justify-content-between align-items-center">
    //   <ExactTitle level={3} text={t('User Management')} />
    //   <Space className="mb-3">
    //     {isDeleteVisible && (
    //       <Button className="shadow-sm" type="primary" danger icon={<DeleteOutlined />} />
    //     )}

    //     <Button
    //       onClick={() => handleToggleAddOrUpdateShowUserModal()}
    //       className="shadow-sm"
    //       type="default"
    //       icon={<PlusOutlined />}
    //     />

    //     <Button className="shadow-sm" type="default" icon={<DownloadOutlined />} />

    //     <Input.Search
    //       className="shadow-sm"
    //       onSearch={handleUserSearch}
    //       id="exact-search"
    //       placeholder={t('Search')}
    //       enterButton={t('Search')}
    //     />
    //   </Space>

    // </div>
  );
}

export default inject('store')(observer(UserManagementHeader));
