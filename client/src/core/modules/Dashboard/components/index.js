import { lazy } from 'react';

const DashboardHeader = lazy(() => import('./DashboardHeader'));
const ChartSection = lazy(() => import('./ChartSection'));
const UserActivityTable = lazy(() => import('./UserActivityTable'));

export { DashboardHeader, ChartSection, UserActivityTable };
