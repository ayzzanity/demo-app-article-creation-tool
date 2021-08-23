import { useEffect } from 'react';
import { Input, Space, Row, Col } from 'antd';
import { inject, observer } from 'mobx-react';

/**CORE IMPORTS */
import { ExactTitle } from '@core_common/components';
import { TWO_GRID } from '@core_common/antdhelpers/constants';

/**APP IMPORTS */
import { DisplayController } from '@app_modules/DisplayArticles/controller';

const ArticleDisplayHeader = ({ store }) => {
  const { handleArticleSearch } = DisplayController({ store });
  useEffect(() => {
    return () => {
      handleArticleSearch('');
    };
  }, []);
  return (
    <>
      <Row>
        <Col {...TWO_GRID}>
          <ExactTitle level={2} text="VIEW ARTICLES" />
        </Col>
        <Col className="d-flex w-100 justify-content-end align-items-center" {...TWO_GRID}>
          <Space className="mb-3">
            <Input.Search
              className="shadow-sm"
              onSearch={handleArticleSearch}
              id="exact-search"
              placeholder={'Search by Title'}
              enterButton={'Search'}
            />
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default inject('store')(observer(ArticleDisplayHeader));
