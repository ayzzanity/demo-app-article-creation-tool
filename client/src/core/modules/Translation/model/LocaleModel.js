import ApplyChildCrud from '@core_state_management/Helpers/ChildCrud';
import { types } from 'mobx-state-tree';

const API_PATH = '/api/locale';
export default types
  .model('LocaleModel', {
    id: types.optional(types.integer, 0),
    locale: types.optional(types.string, '')
  })
  .actions((self) => ({
    ...ApplyChildCrud(API_PATH, self)
  }))
  .views((self) => ({}));
