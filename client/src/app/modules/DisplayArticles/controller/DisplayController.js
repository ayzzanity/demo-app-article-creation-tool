const DisplayController = ({ store }) => {
  const { display } = store;

  const getArticles = async () => {
    await display.GET_PUBLISHED();
  };
  const getArticle = async (id) => {
    await display.RETRIEVE(id);
  };
  const clearArticle = () => {
    display.single.emptyArticle();
  };
  return { getArticles, getArticle, clearArticle };
};

export default DisplayController;
