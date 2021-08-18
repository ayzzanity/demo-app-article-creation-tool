import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

import { Menu } from 'antd';

import { default as Icon, EllipsisOutlined } from '@ant-design/icons';
import './styles.css';

/**CORE IMPORTS */
import { UserSVG, LanguageSVG } from '@core_modules/Layout/view/CustomIcons';
import { LayoutController } from '@core_modules/Layout/controller';
import { AccountSettings } from '@core_modules/AccountSettings/view';
import { Link } from 'react-router-dom';
import Routes from '@core_routing/Routes';

function AdminMenu({ store }) {
  const { t } = useTranslation('common');

  const { setLanguage, handleLogout, applyActiveClass } = LayoutController({
    store
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const UserIcon = (props) => <Icon component={UserSVG} {...props} />;
  const LanguageIcon = (props) => <Icon component={LanguageSVG} {...props} />;
  //store.globalState.language === "en" && "active"
  return (
    <>
      <Menu
        id="df"
        className="h-100"
        theme="light"
        mode="vertical"
        triggerSubMenuAction="hover"
        defaultSelectedKeys={['1']}
        selectable={false}
      >
        <Menu.SubMenu
          expandIcon={
            <EllipsisOutlined style={{ position: 'absolute', right: 3, top: 12 }} rotate={90} />
          }
          className="exact-menu"
          mode="vertical"
          key="sub1"
          level={1}
          icon={<LanguageIcon />}
          title={t('Change Language')}
          defaultSelectedKeys={['9']}
          style={{ position: 'absolute', bottom: 80 }}
        >
          {store?.translations?.locales?.map((element) => {
            const localeTextUpperCase = element?.locale?.toUpperCase().split('_')[1];
            const localeTextLoweCase = element?.locale?.toLowerCase().split('_')[1];
            const localeTextLoweCaseFull = element?.locale?.toLowerCase();
            return (
              <Menu.Item
                className={applyActiveClass(localeTextLoweCase)}
                key={localeTextLoweCase}
                onClick={async () => await setLanguage(localeTextLoweCaseFull)}
              >
                {t(localeTextUpperCase)}
              </Menu.Item>
            );
          })}
        </Menu.SubMenu>
        <Menu.SubMenu
          expandIcon={
            <EllipsisOutlined style={{ position: 'absolute', right: 3, top: 12 }} rotate={90} />
          }
          className="exact-menu"
          key="sub2"
          icon={<UserIcon />}
          mode="vertical"
          title={t('Administrator')}
          style={{ position: 'absolute', bottom: 30 }}
        >
          <Menu.Item onClick={() => setIsModalVisible(true)} key="sub2-1">
            {t('Account Settings')}
          </Menu.Item>
          <Menu.Item key="sub2-2">
            <Link to={Routes.TRANSLATION_VIEW_ROUTE}> {t('Translations')}</Link>
          </Menu.Item>
          <Menu.Item key="sub2-3">
            <div onClick={handleLogout}>{t('Logout')}</div>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>

      <AccountSettings setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />
    </>
  );
}

export default inject('store')(observer(AdminMenu));
