import React from 'react';
import { EditOutlined, EyeFilled, MessageOutlined } from '@ant-design/icons';
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
    icon: <MessageOutlined />,
    route: Routes.COMMENTS_ROUTE,
    menuName: 'Article Comments'
  },
  {
    key: '5',
    icon: <EyeFilled />,
    route: Routes.ARTICLES_ROUTE,
    menuName: 'View Articles'
  }
];

export default AppMenus;
