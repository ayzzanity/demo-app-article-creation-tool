import { Image } from 'antd';
import { inject, observer } from 'mobx-react';

const ArticleImage = ({ store, imageHeader, maxHeight, isView = false }) => {
  return (
    <Image
      style={{ height: maxHeight, objectFit: 'cover' }}
      src={imageHeader}
      fallback={store.ArticleUtilities.DEFAULT_IMG}
      preview={isView}
    />
  );
};

export default inject('store')(observer(ArticleImage));
