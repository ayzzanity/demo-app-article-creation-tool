import { useEffect } from 'react';
import { Col, Row, Space, BackTop } from 'antd';
import { inject, observer } from 'mobx-react';

/**CORE IMPORTS */
import { THREE_GRID, ANTD_MAX_COL } from '@core_common/antdhelpers/constants';

/**APP IMPORTS */
import {
  ArticleCard,
  ArticleDisplayHeader,
  ArticlePagination
} from '@app_modules/DisplayArticles/components';
import { DisplayController } from '@app_modules/DisplayArticles/controller';
import { Loading } from '@app_common/';
import './styles.css';

const DisplayArticles = ({ store }) => {
  const { sorted } = store.display;
  const { minValue, maxValue } = store.DisplayUtilities;
  const { getPublishedArticles } = DisplayController({ store });
  useEffect(getPublishedArticles, []);

  return (
    <div className="background">
      <div style={{ width: '85%', margin: '2rem auto' }}>
        <ArticleDisplayHeader />
        {store.display.loading ? (
          <Loading />
        ) : (
          <>
            <Row gutter={[32, 16]}>
              {sorted.slice(minValue, maxValue).map((article) => {
                return (
                  <Space>
                    <Col key={article.key} {...THREE_GRID}>
                      <ArticleCard article={article} />
                    </Col>
                  </Space>
                );
              })}
              <Col span={ANTD_MAX_COL}>
                <ArticlePagination />
              </Col>
            </Row>
          </>
        )}
      </div>
      <BackTop target={() => document.getElementsByClassName('background')[0]} />
    </div>
  );
};

export default inject('store')(observer(DisplayArticles));
