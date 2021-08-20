import { useEffect } from 'react';
import { Col, Row } from 'antd';
import { inject, observer } from 'mobx-react';
import { DisplayController } from '@app_modules/DisplayArticles/controller';
import { ArticleDisplayHeader } from '../components';
import './styles.css';
import ArticleCard from '../components/ArticleCard';

const DisplayArticles = ({ store }) => {
  const { sorted } = store.display;
  const { getArticles } = DisplayController({ store });
  useEffect(getArticles, []);

  return (
    <div className="background">
      <div style={{ width: '85%', margin: '3rem auto' }}>
        <ArticleDisplayHeader />
        <Row gutter={[32, 16]}>
          {sorted.map((article) => {
            return (
              <Col key={article.key} lg={8} md={12} xs={24}>
                <ArticleCard article={article} />
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default inject('store')(observer(DisplayArticles));
