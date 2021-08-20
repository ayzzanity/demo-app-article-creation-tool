import React from 'react';
import { Form } from 'antd';

/**ARTICLE IMPORTS */
import {
  ArticleForm,
  ArticleHeader,
  ArticleTable,
  ArticleView,
  DeleteConfirmation
} from '@app_modules/Article/components';

function ArticleManagement() {
  const [form] = Form.useForm();
  return (
    <div>
      <ArticleHeader form={form} />
      <ArticleTable form={form} />
      <ArticleForm form={form} />
      <ArticleView />
      <DeleteConfirmation form={form} />
    </div>
  );
}

export default ArticleManagement;
