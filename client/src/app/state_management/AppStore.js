import { ArticlesState, ArticleUtilities } from '@app_modules/ArticleManagement/model';
import { DisplayState, DisplayUtilities } from '@app_modules/DisplayArticles/model';
import { types } from 'mobx-state-tree';

const AppStore = {
  articles: types.optional(ArticlesState, {}),
  display: types.optional(DisplayState, {}),
  ArticleUtilities: types.optional(ArticleUtilities, {}),
  DisplayUtilities: types.optional(DisplayUtilities, {})
};

export default AppStore;
