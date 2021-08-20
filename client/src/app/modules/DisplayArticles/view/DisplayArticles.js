import { useEffect } from 'react';
import { Affix, Card, Col, Row, Image, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import { DisplayController } from '@app_modules/DisplayArticles/controller';
import { ExactTitle } from '@core_common/components';
import './styles.css';

const DisplayArticles = ({ store }) => {
  const { display } = store;
  const { Meta } = Card;
  const { getSortedArticles } = DisplayController({ store });

  useEffect(getSortedArticles, [store.articles.state]);

  return (
    <div className="background">
      <div className="articles-container">
        <div style={{ width: '85%', margin: '3rem auto' }}>
          <ExactTitle level={2} text="VIEW ARTICLES" />
          <Row gutter={[32, 16]}>
            {display.sorted.map((article) => {
              return (
                article.status === 'Published' && (
                  <Col key={article.key} lg={8} md={12} xs={24}>
                    <Card
                      hoverable
                      loading={display.loading}
                      style={{ width: 300, height: 320, marginBottom: 50, marginTop: 20 }}
                      cover={
                        <Image
                          style={{ height: 120, objectFit: 'cover' }}
                          src={article.imageHeader}
                          fallback={store.ArticleUtilities.DEFAULT_IMG}
                          preview={false}
                        />
                      }
                    >
                      <Meta
                        title={article.title}
                        description={`By ${article.Users.first_name} ${article.Users.last_name} [${article.publishDate}]`}
                      />
                      <div
                        style={{ marginTop: 20, marginBottom: 15, height: 50, overflow: 'hidden' }}
                      >
                        <div dangerouslySetInnerHTML={{ __html: article.content }} />
                      </div>
                      <Button size="small" block type="primary">
                        READ FULL ARTICLE
                      </Button>
                    </Card>
                  </Col>
                )
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default inject('store')(observer(DisplayArticles));
