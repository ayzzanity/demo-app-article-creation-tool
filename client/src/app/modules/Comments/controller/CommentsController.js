import { message } from 'antd';
const CommentsController = ({ store, form }) => {
  //GET ARTICLES BY USER
  const getUserArticle = async (id) => {
    await store.comments['GET_COMMENTS_BY_ID'](null);
    await store.articles['GET_ARTICLES_BY_USER'](id);
  };
  //GET COMMENTS BY ARTICLE ID
  const getCommentsById = async (id) => {
    await store.comments['GET_COMMENTS_BY_ID'](parseInt(id));
  };
  //ADDING NEW COMMENT
  const handleAddingComment = async (comment, id) => {
    console.log(comment, id);
    const dataObject = {
      ...comment,
      comment_article_id: parseInt(id)
    };
    const params = [dataObject];
    let [successMessage, error] = await store.comments['CREATE'](...params);
    let success = await _showresultMessage(error, {
      successMessage: 'Comment Added'
    });
    if (success) {
      form.resetFields();
    }
  };
  // DELETING ARTICLE
  const handleDeleteComment = async (commentId) => {
    let [successMessage, error] = await store.comments['DELETE'](commentId);
    await _showresultMessage(error, {
      successMessage: successMessage.message
    });
  };

  async function _showresultMessage(error, { successMessage }) {
    return new Promise((resolve, reject) => {
      if (error) {
        message.error({ content: error.response.data.error.message, key: 'creatingComment' });

        reject(false);
      } else {
        message.success({ content: successMessage, key: 'creatingComment' });
        resolve(true);
      }
    });
  }
  return { getUserArticle, getCommentsById, handleAddingComment, handleDeleteComment };
};

export default CommentsController;
