import React, { Suspense } from 'react';
import { Button, Col, Row, Space } from 'antd';
import { inject, observer } from 'mobx-react';
import { PlusOutlined } from '@ant-design/icons';

/**COMPONENTS */

/**CORE IMPORTS */
import { ExactTitle, FallBackLoaders } from '@core_common/components';
//import { AddOrUpdateArticleModal } from '../components';
import { ArticleController } from '../controller';
import { ANTD_HALF_COL } from '@core_common/antdhelpers/constants';
import ArticleForm from './ArticleForm';

const ArticleHeader = ({ store, form }) => {
  const { handleToggleShowFormModal } = ArticleController({ store, form });

  return (
    <>
      <Row>
        <Col md={{ span: ANTD_HALF_COL }}>
          {' '}
          <ExactTitle level={3} text="Article Management" />
        </Col>
        <Col
          className="d-flex w-100 justify-content-end align-items-center"
          md={{ span: ANTD_HALF_COL }}
        >
          {' '}
          <Space className="mb-3">
            <Button
              onClick={() => handleToggleShowFormModal({}, false)}
              className="shadow-sm"
              type="default"
              icon={<PlusOutlined />}
            />

            {/* <Button className="shadow-sm" type="default" icon={<DownloadOutlined />} />

            <Input.Search
              className="shadow-sm"
              onSearch={() => {}}
              id="exact-search"
              placeholder={'Search'}
              enterButton={'Search'}
            /> */}
          </Space>
        </Col>
      </Row>

      <Suspense fallback={FallBackLoaders.EmptyLoader}>
        <ArticleForm form={form} />
      </Suspense>
    </>
  );
};

export default inject('store')(observer(ArticleHeader));
