import { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

/**APP IMPORTS */
import { ArticleComments, ArticleViewCard } from '@app_modules/DisplayArticles/components';
import { CommentsController } from '@app_modules/Comments/controller';
import { DisplayController } from '@app_modules/DisplayArticles/controller';
import { BackTop } from 'antd';

const DisplayArticle = ({ store }) => {
  const { getArticle, clearArticle } = DisplayController({ store });
  const { getCommentsById } = CommentsController({ store });
  const { id } = useParams();
  useEffect(() => {
    getArticle(id);

    return () => {
      clearArticle();
    };
  }, []);
  useEffect(() => {
    getCommentsById(id);
  }, [store.comments.state]);
  return (
    <div className="background">
      <div style={{ width: '85%', margin: '3rem auto' }}>
        <ArticleViewCard />
        <ArticleComments id={id} />
      </div>
      <BackTop target={() => document.getElementsByClassName('background')[0]} />
    </div>
  );
};

export default inject('store')(observer(DisplayArticle));
