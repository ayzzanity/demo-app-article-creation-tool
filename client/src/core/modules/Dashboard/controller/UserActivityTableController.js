import { useTranslation } from 'react-i18next';

const UserActivityTableController = ({ store }) => {
  const { t } = useTranslation('common');

  const onChangePage = async (page) => {
    const search = store.UserManagementUtilities.search;
    const props = store.UserManagementUtilities.props;

    let params = { page, search, props };

    await store.users.LIST(params);
  };

  return { onChangePage };
};

export default UserActivityTableController;
