import { Col, Card } from 'antd';
import { inject, observer } from 'mobx-react';
import { TWO_GRID } from '@core_common/antdhelpers/constants';
import { useTranslation } from 'react-i18next';
import { ListLatestArticles } from '.';

const PublishedList = ({ store }) => {
  const { t } = useTranslation('common');
  return (
    <Col {...TWO_GRID}>
      <Card
        loading={store.articles.loading}
        title={t('Latest Published Articles')}
        style={{ marginTop: 10, marginRight: 10 }}
      >
        <ListLatestArticles data={store.display.sorted.slice(0, 4)} />
      </Card>
    </Col>
  );
};

export default inject('store')(observer(PublishedList));
