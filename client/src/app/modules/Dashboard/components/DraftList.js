import { Col, Card } from 'antd';
import { inject, observer } from 'mobx-react';
import { TWO_GRID } from '@core_common/antdhelpers/constants';
import { useTranslation } from 'react-i18next';
import { ListLatestArticles } from '.';

const DraftList = ({ store }) => {
  const { t } = useTranslation('common');
  return (
    <Col {...TWO_GRID}>
      <Card
        loading={store.articles.loading}
        title={t('Latest Drafts')}
        style={{ marginTop: 10, marginLeft: 10 }}
      >
        <ListLatestArticles data={store.articles.sorted.slice(0, 4)} />
      </Card>
    </Col>
  );
};

export default inject('store')(observer(DraftList));
