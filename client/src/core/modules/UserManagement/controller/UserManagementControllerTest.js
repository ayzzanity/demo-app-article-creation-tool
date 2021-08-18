import React, { useState } from 'react';
import { Form } from 'antd';

function UserManagementControllerTest({ store, t }) {
  const [form] = Form.useForm();

  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  // const getUsers = async () => {
  //   const page = 1;

  //   const search = store.UserManagementUtilities.search;
  //   const props = store.UserManagementUtilities.props;
  //   let params = { page, search, props };

  //   await store.users.LIST(params);
  // };

  // const onChangePage = async (page) => {
  //   const search = store.UserManagementUtilities.search;
  //   const props = store.UserManagementUtilities.props;

  //   let params = { page, search, props };

  //   await store.users.LIST(params);
  // };

  // const handleToggleAddOrUpdateShowUserModal = (isUpdate = false, userData = null) => {
  //   if (isUpdate) {
  //     form.setFieldsValue(userData);
  //     store.UserManagementUtilities.setUpdateId(userData?.id);
  //     store.UserManagementUtilities.setCities(userData?.country);
  //   }

  //   store.UserManagementUtilities.setToggleShowAddOrUpdateUserModal(isUpdate);
  // };
  // const handleChangeForm = (values) => {
  //   if (values[0].name[0] === 'country') {
  //     form.setFieldsValue({ city: '' });
  //     const country = CountryData.find((row) => row.country === values[0].value);
  //     store.UserManagementUtilities.setCities(country?.country);
  //   }
  // };

  // const handleUpdateOrCreateUser = async (values, isUpdate) => {
  //   message.loading({
  //     content: isUpdate ? 'Updating User.' : 'Creating user.',
  //     key: 'creatingUser'
  //   });

  //   const params = isUpdate ? [store.UserManagementUtilities.updateId, values] : [values];

  //   let error = await store.users[isUpdate ? 'UPDATE' : 'CREATE'](...params);

  //   let success = await _showresultMessage(error, {
  //     successMessage: isUpdate ? t('User Updated') : t('User Created!')
  //   });

  //   if (success) {
  //     form.resetFields();
  //     store.UserManagementUtilities.setToggleShowAddOrUpdateUserModal();
  //   }
  // };

  // const handleFetchUserTypes = async () => {
  //   await store.UserManagementUtilities.FETCH_USER_TYPES();
  // };

  // const handleUserSearch = async (search) => {
  //   search = search.trim();
  //   const props = store.UserManagementUtilities.props;
  //   let params = { search, props };

  //   store.UserManagementUtilities.setSearch(search);
  //   await store.users.LIST(params);
  // };

  // const handleChangeUserStatus = async (params) => {
  //   let { userData, active } = params;

  //   let error = await store.users.UPDATE(userData.id, { active });

  //   await _showresultMessage(error, {
  //     successMessage: 'User Status Updated'
  //   });
  // };

  // async function _showresultMessage(error, { successMessage }) {
  //   console.dir(error, 'TEST');
  //   return new Promise((resolve, reject) => {
  //     if (error) {
  //       message.error({ content: t(error.response.data.error.message), key: 'creatingUser' });

  //       reject(false);
  //     } else {
  //       message.success({ content: successMessage, key: 'creatingUser' });
  //       resolve(true);
  //     }
  //   });
  // }

  return {
    form,
    isDeleteVisible,
    setIsDeleteVisible
  };
}

export default UserManagementControllerTest;
