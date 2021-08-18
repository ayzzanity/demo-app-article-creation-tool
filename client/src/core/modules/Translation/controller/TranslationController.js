import { message } from 'antd';

const TranslationController = ({ setCount, t, count, store, setColumnLocales }) => {
  const handleAdd = () => {
    const newData = {
      key: count,
      translation_key: `translation_key`
    };

    store.translations.setTranslation([newData, ...store.translations.state]);

    setCount(count + 1);
  };

  // const handleUpdateTranslation = (key) => {
  //   const dataSourceCopy = [...store.translations.state];

  //   store.translations.setTranslation(dataSourceCopy.filter((item) => item.key !== key));
  // };

  const generateColumns = (columns) => {
    return columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: _handleSave
        })
      };
    });
  };

  const generateLocaleColumns = async () => {
    const data = await store.translations.GET_LOCALES();

    let localesArray = [];
    data.forEach((row) => {
      localesArray.push({
        title: row.locale.toUpperCase().split('_')[1],
        dataIndex: row.locale.toLowerCase(),
        key: row.id,
        width: '25%',
        ellipsis: true,
        editable: true
      });
    });

    setColumnLocales(localesArray);
    generateColumns(localesArray);
  };

  const getTranslations = async () => {
    await store.translations.GET_TRANSLATIONS();
  };

  const handleUpdateTranslation = async () => {
    message.loading({ content: t('Updating translations!'), key: 'updatable' });
    store.translations.setIsUpdating(true);
    let [, error] = await store.translations.GENERATE_JSON();

    if (error) {
      console.log(error);
      return;
    }

    message.success({ content: t('Succesfully updated translations!'), key: 'updatable' });
    store.translations.setIsUpdating(false);
  };

  async function _handleSave(row) {
    let [{ id }, error] = await store.translations.INSERT_TRANSLATION(row);

    if (error) {
      return;
    }

    const newData = [...store.translations.state];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row, id });
    store.translations.setTranslation(newData);
  }

  const search = (searchProperties, record) => (searchKeyword) => {
    return !!searchProperties
      ? searchProperties.length !== 0
        ? searchProperties.some((property) => {
            const _property = property.toLowerCase();
            return record[_property].toLowerCase().includes(searchKeyword.toLowerCase());
          })
        : true
      : true;
  };

  const toggleUpdateKey = () => {
    store.translations.toggleUpdatingKey();
  };

  return {
    handleAdd,
    generateColumns,
    getTranslations,
    handleUpdateTranslation,
    search,
    toggleUpdateKey,
    generateLocaleColumns
  };
};

export default TranslationController;
