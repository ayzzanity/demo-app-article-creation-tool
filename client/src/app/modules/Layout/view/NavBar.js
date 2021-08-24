import { Layout, Menu } from 'antd';

const NavBar = ({ children }) => {
  const { Header, Content } = Layout;
  return (
    <Layout style={{ height: '100%', overflow: 'auto' }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key={1}>HOME</Menu.Item>
          <Menu.Item key={2}>VIEW ARTICLES</Menu.Item>
          <Menu.Item key={3}>MANAGE</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ paddingTop: '50px' }}>{children}</Content>
    </Layout>
  );
};

export default NavBar;
