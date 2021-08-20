import { Breadcrumb } from 'antd';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Routes from '@app_routing/Routes';

const ArticleBreadcrumb = ({ store }) => {
  const { single } = store.display;

  return (
    <Breadcrumb style={{ color: '#3283a8', fontWeight: 'bold' }}>
      <Breadcrumb.Item>HOME</Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link style={{ color: '#3283a8' }} to={Routes.ARTICLES_ROUTE}>
          VIEW ARTICLES
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{single.title}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default inject('store')(observer(ArticleBreadcrumb));
