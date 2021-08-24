import { types } from 'mobx-state-tree';
import { ArticlesModel } from '@app_modules/ArticleManagement/model';
import SortedDraftModel from './SortedDraftModel';
import ApplyRootCrud from '@core_state_management/Helpers/RootCrud';
import { AdditionalCrud } from '@app_state_management';

const API_PATH = '/api/articles';

export default types
  .model('ArticlesState', {
    state: types.optional(types.array(ArticlesModel), []),
    singleState: types.optional(ArticlesModel, {}),
    sorted: types.optional(types.array(SortedDraftModel), []),
    total: types.optional(types.number, 0),
    loading: types.optional(types.boolean, false),
    isCreating: types.optional(types.boolean, false),
    isDeleting: types.optional(types.boolean, false)
  })
  .actions((self) => ({
    ...ApplyRootCrud(API_PATH, self),
    ...AdditionalCrud(API_PATH, self)
  }))
  .views((self) => ({}));
