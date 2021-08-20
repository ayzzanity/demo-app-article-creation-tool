import { types } from 'mobx-state-tree';
import { ArticlesModel } from '@app_modules/Article/model';
import ApplyRootCrud from '@core_state_management/Helpers/RootCrud';
import AdditionalCrud from '@app_state_management/AdditionalCrud';
import SortedModel from './SortedModel';

const API_PATH = '/api/articles';

export default types
  .model('DisplayState', {
    state: types.optional(types.array(ArticlesModel), []),
    single: types.optional(ArticlesModel, {}),
    sorted: types.optional(types.array(SortedModel), []),
    loading: types.optional(types.boolean, false),
    isDisplayed: types.optional(types.boolean, false)
  })
  .actions((self) => ({
    ...ApplyRootCrud(API_PATH, self),
    ...AdditionalCrud(API_PATH, self)
  }))
  .views((self) => ({}));
