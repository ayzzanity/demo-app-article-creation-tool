import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

/**CORE IMPORTS */
import { FallBackLoaders } from '@core_common/components';
import { ExactTitle } from '@core_common/components';
import {
  DashboardHeader,
  ChartSection,
  UserActivityTable
} from '@core_modules/Dashboard/components';
import { Printable } from '@core_modules/Printable/view';

function Dashboard() {
  const { t } = useTranslation('common');
  const APP_NAME = process.env.REACT_APP_NAME;

  return (
    <>
      <Suspense fallback={FallBackLoaders.EmptyLoader}>
        <ExactTitle level={3} text={t('Dashboard')} />
      </Suspense>
      <Printable title={t('Dashboard')}>
        <Suspense fallback={FallBackLoaders.EmptyLoader}>
          <div className="mb-3 w-100">
            <DashboardHeader />
          </div>
        </Suspense>
        <Suspense fallback={FallBackLoaders.EmptyLoader}>
          <div className="mb-3 w-100">
            <ChartSection />
          </div>
        </Suspense>

        <Suspense fallback={FallBackLoaders.EmptyLoader}>
          <UserActivityTable />
        </Suspense>
      </Printable>
    </>
  );
}

export default Dashboard;
