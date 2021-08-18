import React, { Suspense, useState } from 'react';
import { Form } from 'antd';

/**CORE IMPORTS */
import { FallBackLoaders } from '@core_common/components';
import { UserTable, UserManagementHeader } from '@core_modules/UserManagement/components';
import { Printable } from '@core_modules/Printable/view';

function UserManagement() {
  const [form] = Form.useForm();

  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  return (
    <>
      <Suspense fallback={FallBackLoaders.EmptyLoader}>
        <UserManagementHeader form={form} isDeleteVisible={isDeleteVisible} />
      </Suspense>

      <Suspense fallback={FallBackLoaders.EmptyLoader}>
        <Printable>
          <UserTable form={form} setIsDeleteVisible={setIsDeleteVisible} />
        </Printable>
      </Suspense>
    </>
  );
}

export default UserManagement;
