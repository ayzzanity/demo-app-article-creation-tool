import { message } from 'antd';

const AccountSettingsController = ({ store, form, setIsModalVisible, t, setIsUpdatePassword }) => {
  const handleSetUpdateId = async () => {
    form.setFieldsValue(store.login);
  };

  const handleSetSecurityDefaultValue = async () => {
    form.setFieldsValue({ type: store.login.type, email: store.login.email });
  };

  const handleToggleAccountSettingsModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleUpdatepassword = async (values) => {
    store.accountSettings.setIsUpdating(true);

    let [success, error] = await store.accountSettings.CHANGE_PASSWORD(values);

    if (error) {
      message.error({ content: t(error.response.data.error.message) });
    } else {
      message.success({ content: t(success.data.message) });
      setIsUpdatePassword(false);
    }

    store.accountSettings.setIsUpdating(false);
  };

  return {
    handleSetUpdateId,
    handleSetSecurityDefaultValue,
    handleToggleAccountSettingsModal,
    handleUpdatepassword
  };
};

export default AccountSettingsController;
