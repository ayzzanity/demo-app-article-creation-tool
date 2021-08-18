import { types } from 'mobx-state-tree';
import ArticlesModel from './ArticlesModel';
import ApplyRootCrud from '@core_state_management/Helpers/RootCrud';

const API_PATH = '/api/articles';

export default types
  .model('ArticlesState', {
    state: types.optional(types.array(ArticlesModel), []),
    singleState: types.optional(ArticlesModel, {}),
    total: types.optional(types.number, 0),
    loading: types.optional(types.boolean, false),
    isCreating: types.optional(types.boolean, false)
  })
  .actions((self) => ({
    ...ApplyRootCrud(API_PATH, self)
  }))
  .views((self) => ({}));
