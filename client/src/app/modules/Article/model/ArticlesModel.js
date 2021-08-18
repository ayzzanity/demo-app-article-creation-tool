import UsersModel from '@core_modules/UserManagement/model/UsersModel';
import { types } from 'mobx-state-tree';

const ArticlesModel = types
  .model('ArticlesModel', {
    id: types.optional(types.number, 0),
    key: types.optional(types.number, 0),
    user_article_id: types.optional(types.string, ''),
    title: types.optional(types.string, ''),
    content: types.optional(types.string, ''),
    imageHeader: types.optional(types.string, ''),
    publishDate: types.optional(types.string, ''),
    status: types.optional(types.string, ''),
    Users: types.optional(UsersModel, {})
  })
  .views((self) => ({}))
  .actions((self) => ({
    setViewArticle(values) {
      self.id = values.id;
      self.key = values.key;
      self.user_article_id = values.user_article_id;
      self.title = values.title;
      self.content = values.content;
      self.imageHeader = values.imageHeader;
      self.publishDate = values.publishDate;
      self.status = values.status;
    },
    setImageHeader(imageHeader) {
      self.imageHeader = imageHeader;
    },
    setContent(content) {
      self.content = content;
    }
  }));

export default ArticlesModel;
