import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { Routes as CoreRoutes } from '@core_routing/';
import { Routes as AppRoutes } from '@app_routing/';

const NavBar = ({ children }) => {
  const { Header, Content } = Layout;
  return (
    <Layout style={{ height: '100%', overflow: 'auto' }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key={1}>
            <Link to={CoreRoutes.HOME_ROUTE}>HOME</Link>
          </Menu.Item>
          <Menu.Item key={2}>
            <Link to={AppRoutes.ARTICLES_ROUTE}>VIEW ARTICLES</Link>
          </Menu.Item>
          <Menu.Item key={3}>
            <Link to={AppRoutes.ARTICLE_MANAGEMENT_ROUTE}>MANAGE</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ paddingTop: '50px' }}>{children}</Content>
    </Layout>
  );
};

export default NavBar;
