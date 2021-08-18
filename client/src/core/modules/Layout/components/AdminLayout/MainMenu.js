import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { default as Icon, DashboardOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**APP IMPORTS */
import { AppMenus } from '@app_modules/AppMenus/view/';

/**CORE IMPORTS */
import { Routes } from '@core_routing/';
import { UserSettingsSVG } from '@core_modules/Layout/view/CustomIcons';
import { LayoutController } from '@core_modules/Layout/controller';

function MainMenu() {
  const { t } = useTranslation('common');
  const history = useHistory();
  const [selectedKeys, setSelectedKeys] = useState(['0']);

  const UserSettingsIcon = (props) => <Icon component={UserSettingsSVG} {...props} />;

  const { setDefaultMenu } = LayoutController({ history, setSelectedKeys });

  // eslint-disable-next-line
  useEffect(setDefaultMenu, [history.location.pathname]);

  return (
    <Menu
      className="h-100"
      theme="light"
      mode="inline"
      triggerSubMenuAction="hover"
      selectedKeys={selectedKeys}
    >
      <Menu.Item key="1" icon={<DashboardOutlined />}>
        <Link to={Routes.HOME_ROUTE}>{t('Dashboard')}</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserSettingsIcon />}>
        <Link to={Routes.USER_MANAGEMENT_ROUTE}>{t('User Management')}</Link>
      </Menu.Item>

      {AppMenus.map((menu) => (
        <Menu.Item key={menu.key} icon={menu.icon}>
          <Link to={menu.route}>{t(menu.menuName)}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default MainMenu;
