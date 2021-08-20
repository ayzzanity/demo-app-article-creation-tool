import { types } from 'mobx-state-tree';
import ApplyRootCrud from '@core_state_management/Helpers/RootCrud';
import AdditionalCrud from '@app_state_management/AdditionalCrud';
import SortedModel from './SortedModel';
import DisplayModel from './DisplayModel';

const API_PATH = '/api/articles';

export default types
  .model('DisplayState', {
    state: types.optional(types.array(DisplayModel), []),
    single: types.optional(DisplayModel, {}),
    sorted: types.optional(types.array(SortedModel), []),
    loading: types.optional(types.boolean, false)
  })
  .actions((self) => ({
    ...ApplyRootCrud(API_PATH, self),
    ...AdditionalCrud(API_PATH, self)
  }))
  .views((self) => ({}));
