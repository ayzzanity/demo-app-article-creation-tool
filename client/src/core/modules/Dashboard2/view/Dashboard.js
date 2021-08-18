import React, { Suspense, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Skeleton, Row, Col, Card } from 'antd';
import { useTranslation } from 'react-i18next';

/**CORE IMPORTS */
import { DashboardDraggable } from '@core_modules/Dashboard2/components';
import { ExactTitle, FallBackLoaders } from '@core_common/components';
import { DashboardController } from '@core_modules/Dashboard2/controller';

import './styles.css';

function Dashboard({ store }) {
  const { t } = useTranslation('common');

  const { handleResetState } = DashboardController({ store });

  useEffect(() => {
    return () => {
      handleResetState();
    };
  }, [handleResetState]);

  return (
    <>
      <Suspense fallback={FallBackLoaders.EmptyLoader}>
        <ExactTitle level={3} text={t('Dashboard')} />
      </Suspense>
      {store.dashboard.isFetching ? (
        <section className="my-2 mx-2">
          <Card>
            <Row>
              <Col>
                <Skeleton active />
              </Col>
            </Row>
          </Card>
        </section>
      ) : (
        <Suspense fallback={FallBackLoaders.EmptyLoader}>
          <DashboardDraggable />
        </Suspense>
      )}
    </>
  );
}

export default inject('store')(observer(Dashboard));
