import { lazy } from 'react';

const UserTable = lazy(() => import('./UserTable'));
const UserManagementHeader = lazy(() => import('./UserManagementHeader'));
const AddOrUpdateUserModal = lazy(() => import('./AddOrUpdateUserModal'));
const UserTypeForm = lazy(() => import('./UserTypeForm'));
const ProfileForm = lazy(() => import('./ProfileForm'));
const AddressForm = lazy(() => import('./AddressForm'));

export {
  UserTable,
  UserManagementHeader,
  AddOrUpdateUserModal,
  UserTypeForm,
  ProfileForm,
  AddressForm
};
