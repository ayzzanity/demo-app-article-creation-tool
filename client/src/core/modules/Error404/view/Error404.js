import React from 'react';
import './styles.css';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Error404() {
  const { t } = useTranslation('common');
  return (
    <div className="no-print">
      <Result
        status="404"
        title="404"
        subTitle={t('Sorry, the page you visited does not exist')}
        extra={
          <Link to="/">
            <Button type="primary">{t('Back Home')}</Button>
          </Link>
        }
      />
    </div>
  );
}

export default Error404;
