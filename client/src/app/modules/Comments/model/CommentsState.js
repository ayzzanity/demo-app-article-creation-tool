import { types } from 'mobx-state-tree';
import ApplyRootCrud from '@core_state_management/Helpers/RootCrud';
import { AdditionalCrud } from '@app_state_management';
import CommentsModel from './CommentsModel';

const API_PATH = '/api/comments';

export default types
  .model('CommentsState', {
    state: types.optional(types.array(CommentsModel), []),
    single: types.optional(CommentsModel, {}),
    total: types.optional(types.number, 0),
    loading: types.optional(types.boolean, false),
    isCreating: types.optional(types.boolean, false),
    isDeleting: types.optional(types.boolean, false)
  })
  .actions((self) => ({
    ...ApplyRootCrud(API_PATH, self),
    ...AdditionalCrud(API_PATH, self),
    clearComments() {
      self.state = [];
      self.single = {};
      self.total = 0;
    }
  }))
  .views((self) => ({}));
