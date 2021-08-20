const DisplayController = ({ store }) => {
  const { display } = store;

  const getArticles = async () => {
    await display.LIST();
  };
  const getSortedArticles = async () => {
    await display.SORT_BY_DATE();
  };
  return { getArticles, getSortedArticles };
};

export default DisplayController;
