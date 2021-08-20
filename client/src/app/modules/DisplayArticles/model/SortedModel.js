import UsersModel from '@core_modules/UserManagement/model/UsersModel';
import { types } from 'mobx-state-tree';

const SortedModel = types
  .model('SortedModel', {
    id: types.optional(types.number, 0),
    key: types.optional(types.number, 0),
    user_article_id: types.optional(types.string, ''),
    title: types.optional(types.string, ''),
    content: types.optional(types.string, ''),
    imageHeader: types.optional(types.string, ''),
    publishDate: types.optional(types.string, ''),
    status: types.optional(types.string, ''),
    createdAt: types.optional(types.string, ''),
    Users: types.optional(UsersModel, {})
  })
  .views((self) => ({}))
  .actions((self) => ({}));

export default SortedModel;
