import React, { useState } from 'react';

import { Divider, Layout } from 'antd';

import './styles.css';

/**CORE IMPORTS */
import Logo from '@core_assets/images/company_logo.png';
import { AdminMenu, MainMenu } from '@core_modules/Layout/components/AdminLayout';

const { Sider, Content } = Layout;

const DEFAULT_COLLAPSED_WIDTH = 80;

//ICONS

function AdminLayout({ children }) {
  const [collapsedWidth, setCollapsedWidth] = useState(DEFAULT_COLLAPSED_WIDTH);

  return (
    <Layout className="bg">
      <Sider
        className="display-none"
        theme="light"
        breakpoint="sm"
        collapsedWidth={collapsedWidth}
        onBreakpoint={(broken) => {
          if (broken) {
            setCollapsedWidth(0);
          } else {
            setCollapsedWidth(DEFAULT_COLLAPSED_WIDTH);
          }
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, 'SDFDSF');
          // console.log(collapsed, type);
        }}
        collapsible={false}
      >
        <div className="text-center p-3">
          <img alt="company logo" src={Logo} width={80} />
        </div>

        <MainMenu />

        <Divider style={{ position: 'absolute', bottom: 120 }} />

        <AdminMenu />
      </Sider>

      <Layout className="site-layout">
        <Content className="content">{children}</Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
