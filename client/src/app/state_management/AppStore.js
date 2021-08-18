import { ArticlesState } from '@app_modules/Article/model';
import ArticleUtilities from '@app_modules/Article/model/ArticleUtilities';
import { types } from 'mobx-state-tree';

const AppStore = {
  articles: types.optional(ArticlesState, {}),
  ArticleUtilities: types.optional(ArticleUtilities, {})
};

export default AppStore;
