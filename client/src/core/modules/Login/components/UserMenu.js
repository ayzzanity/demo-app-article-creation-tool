import React from 'react';

import { inject, observer } from 'mobx-react';

import { useTranslation } from 'react-i18next';
//Controller
import { UserMenuController } from '@core_modules/Login/controller';

//Ant D
import { Menu } from 'antd';

function UserMenu({ store }) {
  const { i18n } = useTranslation('common');

  const { changeLanguage } = UserMenuController({ store, i18n });

  return (
    <Menu>
      {store.translations.locales.map((state) => {
        return (
          <Menu.Item
            onClick={() => {
              changeLanguage(state.locale.toLowerCase());
            }}
            key={state.locale}
          >
            {state.locale.toUpperCase().split('_')[1]}
          </Menu.Item>
        );
      })}
    </Menu>
  );
}

export default inject('store')(observer(UserMenu));
