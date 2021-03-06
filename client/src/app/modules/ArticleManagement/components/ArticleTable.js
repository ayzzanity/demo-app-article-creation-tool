import React, { useEffect } from 'react';
import { Button, Space, Table, Typography, Popconfirm } from 'antd';
import { EditFilled, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

/**ARTICLE IMPORTS */
import { DateFormatter } from '@app_common/';
import { ArticleController } from '@app_modules/ArticleManagement/controller';
import { ArticleMobileView } from '@app_modules/ArticleManagement/components';

function ArticleTable({ store, form }) {
  const { Text } = Typography;
  const { t } = useTranslation('common');
  const {
    getArticles,
    handleToggleShowFormModal,
    handleToggleShowViewModal,
    handleToggleShowDeleteModal,
    onChangePage
  } = ArticleController({ store, form });
  const { formatDate } = DateFormatter('short', 'short');
  // eslint-disable-next-line
  useEffect(getArticles, []);

  const columns = [
    {
      title: t('Articles'),
      render: (articleData) => (
        <ArticleMobileView
          articleData={articleData}
          handleView={handleToggleShowViewModal}
          handleDelete={handleToggleShowDeleteModal}
          handleUpdate={handleToggleShowFormModal}
        />
      ),
      responsive: ['xs']
    },
    {
      title: t('Title').toUpperCase(),
      dataIndex: 'title',
      width: '50%',
      render: (text) => <>{text}</>,
      shouldCellUpdate: (prev, next) => JSON.stringify(prev) !== JSON.stringify(next),
      sorter: (a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
      responsive: ['sm', 'md', 'lg', 'xl']
    },
    {
      title: t('User').toUpperCase(),
      dataIndex: 'User',
      shouldCellUpdate: (prev, next) => JSON.stringify(prev) !== JSON.stringify(next),
      sorter: (a, b) =>
        a.User.first_name.toLowerCase().localeCompare(b.User.first_name.toLowerCase()),
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
      title: t('Publish Date').toUpperCase(),
      dataIndex: 'publishDate',
      sorter: (a, b) => a.publishDate.toLowerCase().localeCompare(b.publishDate.toLowerCase()),
      responsive: ['xl'],
      shouldCellUpdate: (prev, next) => JSON.stringify(prev) !== JSON.stringify(next),
      render: (text) => {
        return <Text>{text === 'N/A' ? text : formatDate(text)}</Text>;
      }
    },
    {
      title: t('Status').toUpperCase(),
      dataIndex: 'status',
      shouldCellUpdate: (prev, next) => JSON.stringify(prev) !== JSON.stringify(next),
      responsive: ['xl']
    },
    {
      title: t('Action').toUpperCase(),
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
              title={t('Are you sure to delete this Article?')}
              onConfirm={() => {
                handleToggleShowDeleteModal(articleData);
              }}
              okText={t('Yes')}
              cancelText={t('No')}
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
        onChange: onChangePage,
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
