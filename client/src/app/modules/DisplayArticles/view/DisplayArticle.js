import { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

/**APP IMPORTS */
import { ArticleViewCard } from '@app_modules/DisplayArticles/components';
import { DisplayController } from '@app_modules/DisplayArticles/controller';

const DisplayArticle = ({ store }) => {
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
        <ArticleViewCard />
      </div>
    </div>
  );
};

export default inject('store')(observer(DisplayArticle));
