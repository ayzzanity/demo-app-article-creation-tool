import React from 'react';
import './styles.css';
import { Space, Badge, Table, Typography, Progress } from 'antd';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

function UserActivityTable({ store }) {
  const { t } = useTranslation('common');

  const dataSource = new Array(50).fill(1).map((_, index) => {
    return {
      key: index,
      name: 'Jürgen Schmidt ' + index,
      usage: 100,
      task: [12, 34, 50, 30],
      activity: '10 ' + t('second Ago')
    };
  });

  const columns = [
    {
      title: t('User').toUpperCase(),
      dataIndex: 'name',
      render: (name) => (
        <>
          <Text>{name}</Text>
        </>
      ),
      sorter: (a, b) => a.first_name.toLowerCase().localeCompare(b.first_name.toLowerCase())
    },
    {
      title: t('Task').toUpperCase(),
      dataIndex: 'task',
      width: 200,
      render: (task) => {
        return (
          <Space size="small">
            {task.map((task, i) => {
              return (
                <>
                  <Badge
                    count={task}
                    style={{
                      backgroundColor:
                        i === 0 ? '#red' : i === 1 ? '#0ea6a7' : i === 2 ? '#ffd673' : '#008000'
                    }}
                  />
                </>
              );
            })}
          </Space>
        );
      }
    },
    {
      title: t('Usage').toUpperCase(),
      dataIndex: 'usage',
      width: 400,
      render: (percent) => {
        return (
          <Text>
            {percent}% <br />
            {percent >= 100 ? (
              <Progress
                strokeColor={{
                  '0%': '#fffff',
                  '100%': '#008000'
                }}
                percent={percent}
                showInfo={false}
              />
            ) : percent >= 75 ? (
              <Progress
                strokeColor={{
                  '0%': '#fffff',
                  '100%': '#0ea6a7'
                }}
                percent={percent}
                showInfo={false}
              />
            ) : percent >= 50 ? (
              <Progress
                strokeColor={{
                  '0%': '#fffff',
                  '100%': '#ffd673'
                }}
                percent={percent}
                showInfo={false}
              />
            ) : (
              <Progress
                strokeColor={{
                  '0%': '#f0f0f0',
                  '100%': 'red'
                }}
                percent={percent}
                showInfo={false}
              />
            )}
          </Text>
        );
      }
    },
    {
      title: t('Activity').toUpperCase(),
      dataIndex: 'activity',
      width: 200,
      render: (row) => {
        return (
          <>
            <Text className="nti">{t('Last login')}</Text> <br /> <Text> {row}</Text>
          </>
        );
      }
    }
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      firstName: record.name
    })
  };
  return (
    <>
      <Table
        loading={store.users.loading}
        className="exact-table shadow-sm bg-white p-3 exact-rd-10"
        size="small"
        rowSelection={{
          type: 'checkbox',
          ...rowSelection
        }}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      // pagination={{
      //   position: ['bottomCenter'],
      //   hideOnSinglePage: true,
      //   pageSize: 10,
      //   responsive: true,
      //   onChange: () => {},
      //   showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
      //   showSizeChanger: false,
      //   total: store.users.toJSON().total
      // }}
      />
    </>
  );
}

export default inject('store')(observer(UserActivityTable));
