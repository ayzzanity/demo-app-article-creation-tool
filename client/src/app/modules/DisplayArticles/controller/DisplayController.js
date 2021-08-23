const DisplayController = ({ store }) => {
  const { display, DisplayUtilities } = store;
  const numEachPage = 6;

  //GET PUBLISHED ARTICLES
  const getPublishedArticles = async () => {
    const search = store.ArticleUtilities.search;
    const props = store.ArticleUtilities.props;
    let params = { search, props };

    await display.GET_PUBLISHED(params);
  };
  //GET ARTICLE
  const getArticle = async (id) => {
    await display.RETRIEVE(id);
  };
  //CLEAR ARTICLES
  const clearArticle = () => {
    display.single.emptyArticle();
  };
  //ON PAGE CHANGE
  const onChangePage = (value) => {
    DisplayUtilities.setPageChange(value, numEachPage);
  };
  //SEARCH ARTICLE
  const handleArticleSearch = async (search) => {
    search = search.trim();
    const props = DisplayUtilities.props;
    let params = { search, props };

    DisplayUtilities.setSearch(search);
    await display.GET_PUBLISHED(params);
  };

  return {
    getPublishedArticles,
    getArticle,
    clearArticle,
    handleArticleSearch,
    onChangePage,
    numEachPage
  };
};

export default DisplayController;
