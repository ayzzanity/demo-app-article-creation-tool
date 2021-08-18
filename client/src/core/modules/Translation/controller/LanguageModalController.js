const LanguageModalController = ({ t, store, setModalVisible }) => {
  const showLanguageModal = () => {
    setModalVisible(true);
  };
  const handleClose = () => {
    setModalVisible(false);
  };

  const handleAdd = async (args) => {
    args.locale = args.locale.toLowerCase();
    let { data } = await store.translations.localesState.CREATE(args);
    store.translations.setAddNewLocale(data);
    setModalVisible(false);
  };

  return { showLanguageModal, handleClose, handleAdd };
};

export default LanguageModalController;
