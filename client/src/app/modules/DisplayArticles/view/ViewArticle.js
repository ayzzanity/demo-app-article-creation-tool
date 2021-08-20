import { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { DisplayController } from '../controller';
import { useParams } from 'react-router-dom';
import { ArticleBreadcrumb, ArticleViewCard } from '@app_modules/DisplayArticles/components';

const ViewArticle = ({ store }) => {
  const { getArticle, clearArticle } = DisplayController({ store });
  const { id } = useParams();
  useEffect(() => {
    getArticle(id);
    return () => {
      clearArticle();
    };
  }, []);

  return (
    <div className="background">
      <div style={{ width: '85%', margin: '3rem auto' }}>
        <ArticleBreadcrumb />
        <ArticleViewCard />
      </div>
    </div>
  );
};

export default inject('store')(observer(ViewArticle));
