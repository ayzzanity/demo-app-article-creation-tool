import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

//MobX-State-Tree
import { Provider } from 'mobx-react';
import RootStore from './core/state_management/RootStore';
import LoginModel from './core/modules/Login/model/LoginModel';

//Translation i18next
import { I18nextProvider, initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import i18next from 'i18next';

const store = RootStore.create({
  login: LoginModel.create({
    id: '0',
    email: '',
    type: '',
    firstName: '',
    lastName: '',
    user_type_id: 0,
    fingerprint: '',
    phoneNumber: '',
    rememberMe: false,
    isLoggedIn: false,
    isLoading: true
  })
});

store.initialize();

i18next
  .use(HttpBackend)
  .use(initReactI18next)
  .init(
    {
      lng: localStorage.getItem('lang') || 'en_us',
      fallbackLng: 'en_us',
      preload: ['en_us', 'de_de'],
      ns: ['translation'],
      defaultNS: 'translation',
      backend: {
        loadPath: '/public/translation/translation_{{lng}}.json'
      },
      react: {
        useSuspense: false //
      }
    },
    (err, t) => {
      if (err) return console.error(err);
      // console.log(t('welcome'));
      // console.log(t('welcome', { lng: 'de' }));
      // console.log(t('welcome'));
      // console.log(t('welcome', { lng: 'de' }));
      // console.log(t('welcome.from.fallback', { ns: 'translationFallback' }));
      // console.log(t('welcome.from.fallback', { lng: 'de', ns: 'translationFallback' }));
    }
  );

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
