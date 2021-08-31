import { ArticlesModel } from '@app_modules/ArticleManagement/model';
import { types } from 'mobx-state-tree';

const CommentsModel = types
  .model('CommentsModel', {
    id: types.optional(types.number, 0),
    key: types.optional(types.number, 0),
    comment_article_id: types.optional(types.number, 0),
    commentUser: types.optional(types.string, ''),
    commentBody: types.optional(types.string, ''),
    createdAt: types.optional(types.string, ''),
    Article: types.optional(ArticlesModel, {})
  })
  .views((self) => ({}))
  .actions((self) => ({}));

export default CommentsModel;
