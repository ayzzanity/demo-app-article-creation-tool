import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import Routes from '@app_routing/Routes';

const AppMenus = [
  {
    key: '3',
    icon: <EditOutlined />,
    route: Routes.ARTICLE_ROUTE,
    menuName: 'Article Management'
  }
];

export default AppMenus;
