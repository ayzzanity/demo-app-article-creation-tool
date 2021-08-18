import { types, flow, cast } from 'mobx-state-tree';
import Axios from 'axios';
import TranslationModel from './TranslationModel';
import LocaleModel from './LocaleModel';

const API_PATH = '/api/translation';
const API_PATH_LOCALES = '/api/locale';

export default types
  .model('TranslationState', {
    state: types.optional(types.array(TranslationModel), []),
    locales: types.optional(types.array(LocaleModel), []),
    localesState: types.optional(LocaleModel, {}),
    isUpdating: types.optional(types.boolean, false),
    isUpdateKey: types.optional(types.boolean, false),
    isLoading: types.optional(types.boolean, true),
    isEditingTable: types.optional(types.boolean, false),
    isCreating: types.optional(types.boolean, false)
  })
  .actions((self) => ({
    INSERT_TRANSLATION: flow(function* (row) {
      try {
        const { data } = yield Axios.post(API_PATH, { row });

        return [data, null];
      } catch (error) {
        return [null, error];
      }
    }),

    GET_TRANSLATIONS: flow(function* () {
      try {
        const { data } = yield Axios.get(API_PATH);

        self.state = cast(data);
        self.isLoading = false;

        return [data, null];
      } catch (error) {
        return [null, error];
      }
    }),

    GENERATE_JSON: flow(function* () {
      try {
        const { data } = yield Axios.get(`${API_PATH}/generate_json`);
        //  self.state = cast(data);
        return [data, null];
      } catch (error) {
        return [null, error];
      }
    }),

    BEGIN_DOWNLOAD_TRANSLATION_ZIP: flow(function* () {
      let translationFileName = 'translations';

      let response = yield Axios({
        url: `${API_PATH}/begin_download`, //your url
        method: 'GET',
        responseType: 'blob' // important
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${translationFileName}.zip`); //or any other extension
      document.body.appendChild(link);
      link.click();
    }),
    GET_LOCALES: flow(function* (row) {
      try {
        const { data } = yield Axios.get(`${API_PATH_LOCALES}`);
        self.locales = cast(data.data);
        return [data.data, null];
      } catch (error) {
        return [null, error];
      }
    }),

    ADD_LANGUAGE: flow(function* (row) {
      try {
        const { data } = yield Axios.post(`${API_PATH_LOCALES}`);
        //self.locales = cast(data.data);
        return [data.data, null];
      } catch (error) {
        return [null, error];
      }
    }),

    setAddNewLocale(data) {
      self.locales = [...self.locales, data];
    },
    setTranslation(data) {
      self.state = data;
    },

    setIsUpdating(isUpdating) {
      self.isUpdating = isUpdating;
    },
    toggleUpdatingKey() {
      self.isLoading = true;
      self.isUpdateKey = !self.isUpdateKey;
      self.isLoading = false;
    },
    toggleEdit() {
      self.isEditingTable = !self.isEditingTable;
    }
  }))
  .views((self) => ({
    get localesArray() {
      const locales = [];
      self.locales.forEach((row) => {
        locales.push(row.locale);
      });
      return locales;
    }
  }));
