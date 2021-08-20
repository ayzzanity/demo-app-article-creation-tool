import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import Routes from '@app_routing/Routes';

const AppMenus = [
  {
    key: '3',
    icon: <EditOutlined />,
    route: Routes.ARTICLE_MANAGEMENT_ROUTE,
    menuName: 'Article Management'
  },
  {
    key: '4',
    route: Routes.ARTICLES_ROUTE,
    menuName: 'View Articles'
  }
];

export default AppMenus;
