import React, { useEffect } from 'react';
import { Button, Divider, Space, Table, Typography, Popconfirm } from 'antd';
import { EditFilled, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';

/**ARTICLE IMPORTS */
import { ArticleController } from '@app_modules/Article/controller';

function ArticleTable({ store, form }) {
  const { Text } = Typography;
  const {
    getArticles,
    handleToggleShowFormModal,
    handleToggleShowViewModal,
    handleToggleShowDeleteModal
  } = ArticleController({ store, form });

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
      fixed: 'right',
      width: 100,
      shouldCellUpdate: (prev, next) => false,
      render: (value, articleData) => {
        return (
          <Space>
            <Button
              onClick={() => {
                handleToggleShowFormModal(articleData, true);
              }}
              icon={<EditFilled />}
              type="link"
              style={{ color: '#009174' }}
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
                handleToggleShowDeleteModal(articleData);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} type="link" style={{ color: '#9B2311' }} />
            </Popconfirm>
          </Space>
        );
      }
    }
  ];

  return (
    <Table
      loading={store.articles.loading}
      className="exact-table shadow-sm bg-white p-3"
      size="small"
      columns={columns}
      dataSource={store.articles.state.toJSON()}
      pagination={{
        position: ['bottomCenter'],
        hideOnSinglePage: true,
        pageSize: 10,
        responsive: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} articles`,
        showSizeChanger: false,
        total: store.articles.toJSON().total
      }}
    />
  );
}

export default inject('store')(observer(ArticleTable));
