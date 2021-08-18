import React from 'react';
import { Tabs } from 'antd';

//**CORE IMPORTS */
import { ExactCard, ExactTitle } from '@core_common/components';

const { TabPane } = Tabs;

function AdminSettings() {
  const callback = (key) => {
    console.log(key);
  };

  return (
    <div>
      <ExactTitle level={3} text="Settings" />

      <ExactCard className="shadow-sm">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </ExactCard>
    </div>
  );
}

export default AdminSettings;
