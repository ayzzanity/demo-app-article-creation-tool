import { useEffect } from 'react';
import { Button, Col, Input, Row, Space } from 'antd';
import { inject, observer } from 'mobx-react';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

/**ARTICLE IMPORTS */
import { ArticleController } from '@app_modules/ArticleManagement/controller';

/**CORE IMPORTS */
import { ExactTitle } from '@core_common/components';
import { ANTD_HALF_COL } from '@core_common/antdhelpers/constants';

const ArticleHeader = ({ store, form }) => {
  const { t } = useTranslation('common');
  const { handleToggleShowFormModal, handleArticleSearch } = ArticleController({ store, form });
  useEffect(() => {
    return () => {
      handleArticleSearch('');
    };
  }, []);
  return (
    <>
      <Row>
        <Col md={{ span: ANTD_HALF_COL }}>
          {' '}
          <ExactTitle level={3} text={t('Article Management')} />
        </Col>
        <Col
          className="d-flex w-100 justify-content-end align-items-center"
          md={{ span: ANTD_HALF_COL }}
        >
          {' '}
          <Space className="mb-3">
            <Button
              onClick={() => handleToggleShowFormModal({}, false)}
              className="shadow-sm"
              type="default"
              icon={<PlusOutlined />}
            />
            <Input.Search
              className="shadow-sm"
              onSearch={handleArticleSearch}
              id="exact-search"
              placeholder={t('Search by Title')}
              enterButton={t('Search')}
            />
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default inject('store')(observer(ArticleHeader));
