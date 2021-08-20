import { ArticlesState, ArticleUtilities } from '@app_modules/Article/model';
import { DisplayState } from '@app_modules/DisplayArticles/model';
import { types } from 'mobx-state-tree';

const AppStore = {
  articles: types.optional(ArticlesState, {}),
  display: types.optional(DisplayState, {}),
  ArticleUtilities: types.optional(ArticleUtilities, {})
};

export default AppStore;
