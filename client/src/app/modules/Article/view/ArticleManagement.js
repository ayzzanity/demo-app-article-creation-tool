import React from 'react';
import { Form } from 'antd';
import ArticleTable from '../components/ArticleTable';
import ArticleHeader from '../components/ArticleHeader';

function ArticleManagement() {
  const [form] = Form.useForm();
  return (
    <div>
      <ArticleHeader form={form} />
      <ArticleTable form={form} />
    </div>
  );
}

export default ArticleManagement;
