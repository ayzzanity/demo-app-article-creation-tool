import React, { Suspense } from 'react';
import { Card, Grid } from 'antd';

import './styles.css';

/**CORE IMPORTS */
import { FallBackLoaders } from '@core_common/components';

import { ResetPasswordForm } from '@core_modules/ResetPassword/components/ResetPassword';
import { LayoutController } from '@core_modules/Layout/controller';
import { CompanyLogo } from '@core_modules/Layout/components/SignInLayout';

const { useBreakpoint } = Grid;

function ResetPassword() {
  const screens = useBreakpoint();

  const { responsiveClass } = LayoutController({});

  return (
    <Suspense fallback={FallBackLoaders.EmptyLoader}>
      <Card className={`shadow-lg ${responsiveClass(screens)} p-4`}>
        <Suspense fallback={FallBackLoaders.EmptyLoader}>
          <CompanyLogo />
        </Suspense>
        <ResetPasswordForm />
      </Card>
    </Suspense>
  );
}

export default ResetPassword;
