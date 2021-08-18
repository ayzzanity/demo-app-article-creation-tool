import React, { Suspense } from 'react';
import { Card, Grid } from 'antd';

import './styles.css';

/**CORE IMPORTS */
import { FallBackLoaders } from '@core_common/components';
import { LoginForm } from '@core_modules/Login/components';
import { CompanyLogo } from '@core_modules/Layout/components/SignInLayout';
import { LayoutController } from '@core_modules/Layout/controller';

const { useBreakpoint } = Grid;

function Login() {
  const screens = useBreakpoint();

  const { responsiveClass } = LayoutController({});

  return (
    <Suspense fallback={FallBackLoaders.EmptyLoader}>
      <Card className={`shadow-lg ${responsiveClass(screens)} p-4`}>
        <Suspense fallback={FallBackLoaders.EmptyLoader}>
          <CompanyLogo />
        </Suspense>
        <LoginForm />
      </Card>
    </Suspense>
  );
}

export default Login;
