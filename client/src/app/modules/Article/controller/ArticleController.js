import { message } from 'antd';

const ArticleManagementController = ({ store, form }) => {
  const {
    articleId,
    isUpdatingArticle,
    setToggleUpdatingArticle,
    setArticleId,
    setToggleShowFormModal,
    setToggleShowViewModal,
    setToggleShowDeleteModal
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
      setViewArticle(article);
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
  //TOGGLE SHOW DELETE MODAL
  const handleToggleShowDeleteModal = (article) => {
    setToggleShowDeleteModal();
    setViewArticle(article);
    article.Users && store.users.single.setUser(article.Users);
  };
  //ONCHANGE FORM FIELD
  const handleChangeForm = (fieldData) => {
    console.log(fieldData);
    try {
      fieldData[0].name[0] === 'imageHeader' && setImageHeader(fieldData[0].value);
    } catch (e) {}
  };
  //ONCHANGE CONTENT FIELD
  const handleArticleContent = (articleContent) => {
    articleContent && setContent(articleContent);
  };

  //CREATE/UPDATE ARTICLE
  const handleCreatingArticle = async (values) => {
    const isUpdating = isUpdatingArticle;
    message.loading({
      content: isUpdating ? 'Updating Article' : 'Creating Article',
      key: 'creatingArticle'
    });
    let date = _getDate();
    const dataObject = {
      ...values,
      content: store.articles.singleState.content,
      publishDate: values.status === 'Draft' ? 'N/A' : `${date}`
    };
    const params = isUpdating ? [articleId, dataObject] : [dataObject];
    let [successMessage, error] = await store.articles[isUpdating ? 'UPDATE' : 'CREATE'](...params);
    let success = await _showresultMessage(error, {
      successMessage: successMessage.message
    });

    if (success) {
      form.resetFields();
      setToggleShowFormModal();
    }
  };
  // DELETING ARTICLE
  const handleDeleteArticle = async (values, articleId) => {
    if (values.confirmation === 'CONFIRM') {
      let [successMessage, error] = await store.articles['DELETE'](articleId);
      let success = await _showresultMessage(error, {
        successMessage: successMessage.message
      });
      if (success) {
        form.resetFields();
        setToggleShowDeleteModal();
      }
    } else {
      message.error("Please enter 'CONFIRM' to continue!");
    }
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
    let hh = String(today.getHours()).padStart(2, '0');
    let nn = String(today.getMinutes()).padStart(2, '0');

    today = `${mm}/${dd}/${yyyy} ${hh}:${nn}`;
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
    handleArticleContent,
    handleToggleShowDeleteModal
  };
};

export default ArticleManagementController;
