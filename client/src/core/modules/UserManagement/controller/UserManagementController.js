import { message } from 'antd';
import CountryData from '@core_data/countries/Countries.json';

const UserManagementController = ({ store, form, t }) => {
  const getUsers = async () => {
    const page = 1;
    const search = store.UserManagementUtilities.search;
    const props = store.UserManagementUtilities.props;
    let params = { page, search, props };

    await store.users.LIST(params);
  };

  const onChangePage = async (page) => {
    const search = store.UserManagementUtilities.search;
    const props = store.UserManagementUtilities.props;

    let params = { page, search, props };

    await store.users.LIST(params);
  };

  const handleToggleAddOrUpdateShowUserModal = (isUpdate = false, userData = null) => {
    if (isUpdate) {
      form.setFieldsValue(userData);
      store.UserManagementUtilities.setUpdateId(userData?.id);
      store.UserManagementUtilities.setCities(userData?.country);
    }

    store.UserManagementUtilities.setToggleShowAddOrUpdateUserModal(isUpdate);
  };
  const handleChangeForm = (values) => {
    if (values[0].name[0] === 'country') {
      form.setFieldsValue({ city: '' });
      const country = CountryData.find((row) => row.country === values[0].value);
      store.UserManagementUtilities.setCities(country?.country);
    }
  };

  const handleUpdateOrCreateUser = async (values, isUpdate, isSelf = false) => {
    message.loading({
      content: isUpdate ? t('Updating User') : t('Creating user'),
      key: 'creatingUser'
    });

    const params = isUpdate
      ? [isSelf ? store.login.id : store.UserManagementUtilities.updateId, values] // If updating self use id in login store
      : [values];

    let [successMessage, error] = await store.users[isUpdate ? 'UPDATE' : 'CREATE'](...params);

    let success = await _showresultMessage(error, {
      successMessage: t(successMessage.message) // isUpdate ? t('User Updated') :
    });

    if (success) {
      if (!isSelf) {
        form.resetFields();
        store.UserManagementUtilities.setToggleShowAddOrUpdateUserModal();
      }
    }
  };

  const handleFetchUserTypes = async () => {
    await store.UserManagementUtilities.FETCH_USER_TYPES();
  };

  const handleUserSearch = async (search) => {
    search = search.trim();
    const props = store.UserManagementUtilities.props;
    let params = { search, props };

    store.UserManagementUtilities.setSearch(search);
    await store.users.LIST(params);
  };

  const handleChangeUserStatus = async (params) => {
    let { userData, active } = params;

    let [successMessage, error] = await store.users.UPDATE(userData.id, { active });

    await _showresultMessage(error, {
      successMessage: successMessage.message
    });
  };

  const handleSendEmailToUser = async (userData) => {
    message.loading({
      content: t('Sending Email'),
      key: 'creatingUser'
    });

    let [successResponse, error] = await store.users.SEND_EMAIL({
      id: userData.id,
      email: userData.email
    });

    await _showresultMessage(error, {
      successMessage: t(successResponse.message)
    });
  };

  async function _showresultMessage(error, { successMessage }) {
    return new Promise((resolve, reject) => {
      if (error) {
        message.error({ content: t(error.response.data.error.message), key: 'creatingUser' });

        reject(false);
      } else {
        message.success({ content: successMessage, key: 'creatingUser' });
        resolve(true);
      }
    });
  }

  return {
    getUsers,
    onChangePage,
    handleToggleAddOrUpdateShowUserModal,
    handleChangeForm,
    handleUpdateOrCreateUser,
    handleFetchUserTypes,
    handleUserSearch,
    handleChangeUserStatus,
    handleSendEmailToUser
  };
};

export default UserManagementController;
