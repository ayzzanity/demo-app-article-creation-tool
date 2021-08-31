import { Card, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

/**APP IMPORTS */
import { ArticleImage } from '@app_modules/DisplayArticles/components';
import { DateFormatter } from '@app_common/';
import Routes from '@app_routing/Routes';

const ArticleCard = ({ store, article }) => {
  const { display } = store;
  const { Meta } = Card;
  const { formatDate } = DateFormatter('short', 'short');
  return (
    <Card
      hoverable
      loading={display.loading}
      style={{ width: 350, height: 320, marginBottom: 20 }}
      cover={<ArticleImage imageHeader={article.imageHeader} maxHeight={120} />}
    >
      <Meta
        title={article.title}
        description={`By ${article.User.first_name} ${article.User.last_name} [${
          article.publishDate && formatDate(article.publishDate)
        }]`}
      />
      <div style={{ marginTop: 20, marginBottom: 15, height: 50, overflow: 'hidden' }}>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>

      <Button size="small" block type="primary">
        <Link to={`${Routes.ARTICLE_ROUTE}/${article.user_article_id}/${article.id}`}>
          READ FULL ARTICLE
        </Link>
      </Button>
    </Card>
  );
};

export default inject('store')(observer(ArticleCard));
