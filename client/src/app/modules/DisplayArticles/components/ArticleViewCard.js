import { Typography, Card } from 'antd';
import { inject, observer } from 'mobx-react';

/**APP IMPORTS */
import { ArticleImage } from '@app_modules/DisplayArticles/components';
import { DateFormatter } from '@app_common/';

const ArticleViewCard = ({ store }) => {
  const { single, loading } = store.display;
  const { Title } = Typography;
  const { formatDate } = DateFormatter('long', 'long');

  return (
    <Card
      loading={loading}
      cover={<ArticleImage imageHeader={single.imageHeader} maxHeight={300} isView={true} />}
    >
      <Title level={2}>{single.title}</Title>
      <br />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Title level={4}>
          Published {single.publishDate && formatDate(single.publishDate)} by{' '}
          {single.User.first_name} {single.User.last_name}
        </Title>
      </div>
      <br />
      <div dangerouslySetInnerHTML={{ __html: single.content }} />
    </Card>
  );
};

export default inject('store')(observer(ArticleViewCard));
