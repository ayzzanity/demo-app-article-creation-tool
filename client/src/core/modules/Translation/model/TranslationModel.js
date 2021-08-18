import ApplyChildCrud from '@core_state_management/Helpers/ChildCrud';
import { types } from 'mobx-state-tree';
import localeArray from '../data/localesArray';

const localesObject = {};
const API_PATH = '/api/locale';
localeArray.forEach((row) => {
  localesObject[row.locale.toLocaleLowerCase()] = types.optional(types.string, '*null*');
});

export default types
  .model('TranslationModel', {
    id: types.optional(types.integer, 0),
    translation_key: types.optional(types.string, ''),
    translation_key_id: types.optional(types.number, 0),

    ...localesObject,
    key: types.optional(types.integer, 0)
  })
  .actions((self) => ({
    ...ApplyChildCrud(API_PATH, self)
  }))
  .views((self) => ({}));
