import { useEffect } from 'react';
import { Card, Row } from 'antd';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

/**CORE IMPORTS */
import { ExactTitle } from '@core_common/components';

/**APP IMPORTS */
import { ArticleController } from '@app_modules/ArticleManagement/controller';
import { DisplayController } from '@app_modules/DisplayArticles/controller';
import { CardStats, DraftList, PublishedList } from '@app_modules/Dashboard/components';

const Dashboard = ({ store }) => {
  const { t } = useTranslation('common');
  const { getArticles, getDrafts, getUsers } = ArticleController({ store });
  const { getPublishedArticles } = DisplayController({ store });
  useEffect(() => {
    getUsers();
    getArticles();
    getDrafts();
    getPublishedArticles();
  }, []);
  return (
    <div>
      <ExactTitle level={3} text={t('Dashboard')} />
      <Card loading={store.articles.loading}>
        <Row>
          <CardStats title="Total Users:" text={store.users.total} />
          <CardStats title="Total Articles:" text={store.articles.total} />
          <CardStats title="Published Articles:" text={store.display.sorted.length} />
          <CardStats title="Drafted Articles:" text={`${store.articles.sorted.length}`} />
        </Row>
      </Card>
      <Row>
        <PublishedList />
        <DraftList />
      </Row>
    </div>
  );
};

export default inject('store')(observer(Dashboard));
