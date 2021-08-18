import React, { useEffect } from 'react';
import { Button, Divider, Space, Table, Typography, Popconfirm } from 'antd';
import { EditFilled, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';

import { ArticleController } from '../controller';
import ArticleView from './ArticleView';
/**CORE IMPORTS */
//import './styles.css';

const { Text } = Typography;

function ArticleTable({ store, form }) {
  const { getArticles, handleToggleShowFormModal, handleToggleShowViewModal, handleDeleteArticle } =
    ArticleController({ store, form });

  // eslint-disable-next-line
  useEffect(getArticles, []);

  const columns = [
    {
      title: 'Articles',
      render: (articleData) => (
        <Space
          split={<Divider style={{ paddingTop: 10, paddingBottom: 10, margin: 0 }} />}
          direction="vertical"
        >
          <Space direction="vertical">
            <Text type="secondary">Title</Text>
            <Text strong>{articleData.title}</Text>
          </Space>

          <Space direction="vertical">
            <Text type="secondary">Content</Text>
            <Text strong>{articleData.content}</Text>
          </Space>
          <Space direction="vertical">
            <Text type="secondary">Published By</Text>
            <Text strong>
              {articleData.Users.first_name} {articleData.Users.last_name}
            </Text>
          </Space>
          <Space direction="vertical">
            <Text type="secondary">Publish Date</Text>
            <Text strong>{articleData.publishDate}</Text>
          </Space>
          <Space direction="vertical">
            <Text type="secondary">Status</Text>
            <Text strong>{articleData.status}</Text>
          </Space>

          <Space>
            <Button onClick={() => {}} icon={<EditFilled />} type="link">
              Update
            </Button>
          </Space>
        </Space>
      ),
      responsive: ['xs']
    },
    {
      title: 'Title'.toUpperCase(),
      dataIndex: 'title',
      render: (text) => <>{text}</>,
      shouldCellUpdate: (prev, next) => JSON.stringify(prev) !== JSON.stringify(next),
      sorter: (a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
      responsive: ['sm', 'md', 'lg', 'xl']
    },

    {
      title: 'User'.toUpperCase(),
      dataIndex: 'Users',
      shouldCellUpdate: (prev, next) => JSON.stringify(prev) !== JSON.stringify(next),
      sorter: (a, b) =>
        a.Users.first_name.toLowerCase().localeCompare(b.Users.first_name.toLowerCase()),
      responsive: ['sm', 'md', 'lg', 'xl'],
      render: (row) => {
        return (
          <Text>
            {row.first_name} {row.last_name}
          </Text>
        );
      }
    },
    {
      title: 'Publish Date'.toUpperCase(),
      dataIndex: 'publishDate',
      sorter: (a, b) => a.publishDate.toLowerCase().localeCompare(b.publishDate.toLowerCase()),
      responsive: ['xl'],
      shouldCellUpdate: (prev, next) => JSON.stringify(prev) !== JSON.stringify(next),
      render: (text) => {
        return <Text>{text}</Text>;
      }
    },
    {
      title: 'Status'.toUpperCase(),
      dataIndex: 'status',
      shouldCellUpdate: (prev, next) => JSON.stringify(prev) !== JSON.stringify(next),
      responsive: ['xl']
    },
    {
      title: 'Action'.toUpperCase(),
      dataIndex: 'action',
      responsive: ['sm', 'md', 'lg', 'xl'],
      shouldCellUpdate: (prev, next) => false,
      render: (value, articleData) => {
        return (
          <>
            <Button
              onClick={() => {
                handleToggleShowFormModal(articleData, true);
              }}
              icon={<EditFilled />}
              type="link"
            />
            <Button
              onClick={() => {
                handleToggleShowViewModal(articleData);
              }}
              icon={<EyeOutlined />}
              type="link"
            />
            <Popconfirm
              placement="topRight"
              title={`Are you sure to delete this Article?`}
              onConfirm={() => {
                handleDeleteArticle(articleData);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} type="link" style={{ color: '#9B2311' }} />
            </Popconfirm>
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
      disabled: record.name === 'Disabled Article',
      firstName: record.name
    })
  };

  return (
    <>
      <Table
        loading={store.articles.loading}
        className="exact-table shadow-sm bg-white p-3"
        size="small"
        rowSelection={{
          type: 'checkbox',
          ...rowSelection
        }}
        columns={columns}
        dataSource={store.articles.state.toJSON()}
        pagination={{
          position: ['bottomCenter'],
          hideOnSinglePage: true,
          pageSize: 5,
          responsive: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} articles`,
          showSizeChanger: false,
          total: store.articles.toJSON().total
        }}
      />
      <ArticleView />
    </>
  );
}

export default inject('store')(observer(ArticleTable));
