import { Card, Image, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Routes from '@app_routing/Routes';
import ArticleImage from './ArticleImage';

const ArticleCard = ({ store, article, isSmall = false }) => {
  const { display } = store;
  const { Meta } = Card;

  return (
    <Card
      hoverable
      loading={display.loading}
      style={{ width: 300, height: 320, marginBottom: 50, marginTop: 20 }}
      cover={<ArticleImage imageHeader={article.imageHeader} maxHeight={120} />}
    >
      <Meta
        title={article.title}
        description={`By ${article.Users.first_name} ${article.Users.last_name} [${article.publishDate}]`}
      />
      <div style={{ marginTop: 20, marginBottom: 15, height: 50, overflow: 'hidden' }}>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>

      <Button size="small" block type="primary">
        <Link to={`${Routes.VIEW_ARTICLE_ROUTE}/${article.user_article_id}/${article.id}`}>
          READ FULL ARTICLE
        </Link>
      </Button>
    </Card>
  );
};

export default inject('store')(observer(ArticleCard));
