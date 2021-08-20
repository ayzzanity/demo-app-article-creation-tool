import UsersModel from '@core_modules/UserManagement/model/UsersModel';
import { types } from 'mobx-state-tree';

const DisplayModel = types
  .model('DisplayModel', {
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
    emptyArticle() {
      self.id = 0;
      self.key = 0;
      self.user_article_id = '';
      self.title = '';
      self.content = '';
      self.imageHeader = '';
      self.publishDate = '';
      self.status = '';
    }
  }));

export default DisplayModel;
