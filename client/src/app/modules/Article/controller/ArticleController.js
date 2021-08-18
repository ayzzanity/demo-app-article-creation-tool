import { message } from 'antd';

const ArticleManagementController = ({ store, form }) => {
  const {
    articleId,
    isUpdatingArticle,
    setToggleUpdatingArticle,
    setArticleId,
    setToggleShowFormModal,
    setToggleShowViewModal
  } = store.ArticleUtilities;
  const { setViewArticle, setImageHeader, setContent } = store.articles.singleState;
  //GET ARTICLES
  const getArticles = async () => {
    await store.articles.LIST();
  };
  //GET USERS
  const getUsers = async () => {
    await store.users.LIST();
  };
  //TOGGLE SHOW FORM MODAL
  const handleToggleShowFormModal = (article, isUpdating = false) => {
    if (isUpdating) {
      form.setFieldsValue(article);
      setContent(article.content);
      setImageHeader(article.imageHeader);
      setArticleId(article.id);
    } else {
      form.resetFields();
      setContent('');
      setImageHeader('');
      setArticleId(0);
    }
    setToggleUpdatingArticle(isUpdating);
    setToggleShowFormModal();
  };
  //TOGGLE SHOW VIEW MODAL
  const handleToggleShowViewModal = (article) => {
    setToggleShowViewModal();
    setViewArticle(article);
    setContent(article.content);
    article.Users && store.users.single.setUser(article.Users);
  };
  //ONCHANGE FORM FIELD
  const handleChangeForm = (fieldData) => {
    if (fieldData[0].name[0] === 'imageHeader') {
      setImageHeader(fieldData[0].value);
    }
  };
  //ONCHANGE CONTENT FIELD
  const handleArticleContent = (articleContent) => {
    console.log(articleContent);
    articleContent && store.articles.singleState.setContent(articleContent);
  };

  //CREATE/UPDATE ARTICLE
  const handleCreatingArticle = async (values) => {
    const isUpdating = isUpdatingArticle;
    message.loading({
      content: isUpdating ? 'Updating Article' : 'Creating Article',
      key: 'creatingArticle'
    });
    let date = _getDate();
    const params = isUpdating
      ? [
          articleId,
          {
            ...values,
            content: store.articles.singleState.content,
            publishDate: values.status === 'Draft' ? 'N/A' : `${date}`
          }
        ]
      : [
          {
            ...values,
            content: store.articles.singleState.content,
            publishDate: values.status === 'Draft' ? 'N/A' : `${date}`
          }
        ];
    console.log(params);
    let [successMessage, error] = await store.articles[isUpdating ? 'UPDATE' : 'CREATE'](...params);
    let success = await _showresultMessage(error, {
      successMessage: successMessage.message
    });

    if (success) {
      form.resetFields();
      store.ArticleUtilities.setToggleShowFormModal();
    }
  };
  // DELETING ARTICLE
  const handleDeleteArticle = async (article) => {
    const params = article.id;
    // let [successMessage, error] =
    await store.articles['DELETE'](params);
    // let success = await _showresultMessage(error, {
    //   successMessage: successMessage.message
    // });
  };

  async function _showresultMessage(error, { successMessage }) {
    return new Promise((resolve, reject) => {
      if (error) {
        message.error({ content: error.response.data.error.message, key: 'creatingArticle' });

        reject(false);
      } else {
        message.success({ content: successMessage, key: 'creatingArticle' });
        resolve(true);
      }
    });
  }
  function _getDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = `${mm}/${dd}/${yyyy}`;
    return today;
  }
  return {
    getArticles,
    getUsers,
    handleToggleShowFormModal,
    handleToggleShowViewModal,
    handleCreatingArticle,
    handleDeleteArticle,
    handleChangeForm,
    handleArticleContent
  };
};

export default ArticleManagementController;
