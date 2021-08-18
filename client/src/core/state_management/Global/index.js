import { types } from 'mobx-state-tree';
import i18next from 'i18next';

export default types
  .model('GlobalModel', {
    language: types.optional(types.string, localStorage.getItem('lang') || 'de'),
    loading: types.optional(types.boolean, false),
    isSidebarCollapse: types.optional(types.boolean, false)
  })
  .views((self) => ({}))
  .actions((self) => ({
    async setLanguage(locale) {
      self.language = locale.split('_')[1];
      await i18next.changeLanguage(locale);
      localStorage.setItem('lang', locale.split('_')[1]);
    },

    setLoading(boolean) {
      self.loading = boolean;
    },
    toggleSidebar() {
      self.isSidebarCollapse = !self.isSidebarCollapse;
    }
  }));
