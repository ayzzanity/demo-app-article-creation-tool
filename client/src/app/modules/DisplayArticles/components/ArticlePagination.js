import { Pagination } from 'antd';
import { inject, observer } from 'mobx-react';
import { DisplayController } from '@app_modules/DisplayArticles/controller';

const ArticlePagination = ({ store }) => {
  const { numEachPage, onChangePage } = DisplayController({ store });
  return (
    <Pagination
      defaultCurrent={1}
      onChange={onChangePage}
      hideOnSinglePage={true}
      pageSize={numEachPage}
      responsive={true}
      total={store.display.sorted.length}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} articles`}
      showSizeChanger={false}
      style={{ color: 'white', textAlign: 'center' }}
    />
  );
};

export default inject('store')(observer(ArticlePagination));
