import { useEffect } from 'react';
import { Card, Row } from 'antd';
import { inject, observer } from 'mobx-react';

/**CORE IMPORTS */
import { ExactTitle } from '@core_common/components';

/**APP IMPORTS */
import { ArticleController } from '@app_modules/ArticleManagement/controller';
import { DisplayController } from '@app_modules/DisplayArticles/controller';
import { CardStats, ListLatestArticles } from '@app_modules/Dashboard/components';

const Dashboard = ({ store }) => {
  const { getArticles, getUsers } = ArticleController({ store });
  const { getPublishedArticles } = DisplayController({ store });
  useEffect(() => {
    getUsers();
    getArticles();
    getPublishedArticles();
  }, []);
  return (
    <div>
      <ExactTitle level={3} text="Dashboard" />
      <Card loading={store.articles.loading}>
        <Row>
          <CardStats title="Total Users:" text={store.users.total} />
          <CardStats title="Total Articles:" text={store.articles.total} />
          <CardStats title="Published Articles:" text={store.display.sorted.length} />
          <CardStats
            title="Drafted Articles:"
            text={`${store.articles.total - store.display.sorted.length}`}
          />
        </Row>
      </Card>
      <Card
        loading={store.articles.loading}
        title="Latest Published Articles"
        style={{ marginTop: 10 }}
      >
        <ListLatestArticles data={store.display.sorted.slice(0, 4)} />
      </Card>
    </div>
  );
};

export default inject('store')(observer(Dashboard));
