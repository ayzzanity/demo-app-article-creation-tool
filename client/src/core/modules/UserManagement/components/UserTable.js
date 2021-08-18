import React, { useEffect } from 'react';

import { Button, Divider, Space, Switch, Table, Typography } from 'antd';
import { EditFilled, MailFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';

/**CORE IMPORTS */
import { UserManagementController } from '@core_modules/UserManagement/controller';
import './styles.css';

const { Text } = Typography;

function UserTable({ store, form }) {
  const { t } = useTranslation('common');

  const {
    getUsers,
    onChangePage,
    handleChangeUserStatus,
    handleToggleAddOrUpdateShowUserModal,
    handleSendEmailToUser
  } = UserManagementController({ store, form, t });

  // eslint-disable-next-line
  useEffect(getUsers, []);

  const columns = [
    {
      title: t('User Data'),
      render: (userData) => (
        <Space
          split={<Divider style={{ paddingTop: 10, paddingBottom: 10, margin: 0 }} />}
          direction="vertical"
        >
          <Space direction="vertical">
            <Text type="secondary">{t('Name')}</Text>
            <Text strong>
              {userData.first_name} {userData.last_name}
            </Text>
          </Space>

          <Space direction="vertical">
            <Text type="secondary">{t('Email Address')}</Text>
            <Text strong>{userData.email}</Text>
          </Space>
          <Space direction="vertical">
            <Text type="secondary">{t('Phone Number')}</Text>
            <Text strong>{userData.phone_number}</Text>
          </Space>
          <Space direction="vertical">
            <Text type="secondary">{t('User Type')}</Text>
            <Text strong>{userData.Type.name}</Text>
          </Space>
          <Space direction="vertical">
            <Text type="secondary">{t('Status')}</Text>

            <Switch
              size="small"
              style={{ backgroundColor: userData.active ? 'green' : 'red' }}
              defaultChecked={userData.active ? true : false}
              checkedChildren={t('active')}
              unCheckedChildren={t('inactive')}
              onChange={async (active) => await handleChangeUserStatus({ active, userData })}
            />
          </Space>

          <Space>
            <Button
              onClick={() => handleToggleAddOrUpdateShowUserModal(true, userData)}
              icon={<EditFilled />}
              type="link"
            >
              {t('Update')}
            </Button>

            <Button
              onClick={() => handleSendEmailToUser(userData)}
              icon={<MailFilled />}
              type="link"
            >
              {t('Send Email')}
            </Button>
          </Space>
        </Space>
      ),
      responsive: ['xs']
    },
    {
      title: t('First name').toUpperCase(),
      dataIndex: 'first_name',
      render: (text) => <>{text}</>,
      shouldCellUpdate: (prev, next) => JSON.stringify(prev) !== JSON.stringify(next),
      sorter: (a, b) => a.first_name.toLowerCase().localeCompare(b.first_name.toLowerCase()),
      responsive: ['sm', 'md', 'lg', 'xl']
    },
    {
      title: t('Last Name').toUpperCase(),
      dataIndex: 'last_name',
      sorter: (a, b) => a.last_name.toLowerCase().localeCompare(b.last_name.toLowerCase()),
      shouldCellUpdate: (prev, next) => JSON.stringify(prev) !== JSON.stringify(next),
      responsive: ['sm', 'md', 'lg', 'xl']
    },
    {
      title: t('Email Address').toUpperCase(),
      dataIndex: 'email',

      sorter: (a, b) => a.email.toLowerCase().localeCompare(b.email.toLowerCase()),
      shouldCellUpdate: (prev, next) => JSON.stringify(prev) !== JSON.stringify(next),
      responsive: ['sm', 'md', 'lg', 'xl']
    },
    {
      title: t('Phone Number').toUpperCase(),
      dataIndex: 'phone_number',
      shouldCellUpdate: (prev, next) => JSON.stringify(prev) !== JSON.stringify(next),
      responsive: ['xl']
    },
    {
      title: t('User Type').toUpperCase(),
      dataIndex: 'Type',
      sorter: (a, b) => a.Type.name.toLowerCase().localeCompare(b.Type.name.toLowerCase()),
      responsive: ['xl'],
      shouldCellUpdate: (prev, next) => JSON.stringify(prev) !== JSON.stringify(next),
      render: (row) => {
        return <Text>{row.name}</Text>;
      }
    },
    {
      title: t('Status').toUpperCase(),
      dataIndex: 'active',
      responsive: ['xl'],
      shouldCellUpdate: (prev, next) => JSON.stringify(prev) !== JSON.stringify(next),
      // sorter: (a, b) => Number(a.active) - Number(b.active),
      render: (isActive, userData) => {
        return (
          <Switch
            size="small"
            style={{ backgroundColor: isActive ? 'green' : 'red' }}
            defaultChecked={isActive ? true : false}
            checkedChildren={t('active')}
            unCheckedChildren={t('inactive')}
            onChange={async (active) => await handleChangeUserStatus({ active, userData })}
          />
        );
      }
    },
    {
      title: t('Action').toUpperCase(),
      dataIndex: 'action',
      responsive: ['lg', 'xl'],
      shouldCellUpdate: (prev, next) => false,
      render: (value, userData) => {
        return (
          <>
            <Button
              onClick={() => handleToggleAddOrUpdateShowUserModal(true, userData)}
              icon={<EditFilled />}
              type="link"
            />

            <Button
              onClick={() => handleSendEmailToUser(userData)}
              icon={<MailFilled />}
              type="link"
            />
          </>
        );
      }
    }
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      //let hasChecked = selectedRows.length > 0;

      //setIsDeleteVisible(hasChecked);

      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      firstName: record.name
    })
  };

  return (
    <Table
      loading={store.users.loading}
      className="exact-table shadow-sm bg-white p-3"
      size="small"
      rowSelection={{
        type: 'checkbox',
        ...rowSelection
      }}
      columns={columns}
      dataSource={store.users.state.toJSON()}
      pagination={{
        position: ['bottomCenter'],
        hideOnSinglePage: true,
        pageSize: 10,
        responsive: true,
        onChange: onChangePage,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
        // pageSizeOptions: [5, 10, 15, 20],
        showSizeChanger: false,
        total: store.users.toJSON().total
      }}
    />
  );
}

export default inject('store')(observer(UserTable));
