import React from 'react';
import './styles.css';
import { Row, Col, Card, Typography } from 'antd';

/**CORE IMPORTS */
import { FOUR_GRID_ALL } from '@core_common/antdhelpers/constants';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

function DashboardHeader() {
  const { t } = useTranslation('common')
  return (
    <Row gutter={[16, 16]}>
      <Col className="gutter-row" {...FOUR_GRID_ALL}>
        <Card className="exact-dashboard-box main-left-border shadow-sm">
          <Text className="nti">{t('Users online')}</Text> <br /> <Text>60</Text>
        </Card>
      </Col>
      <Col className="gutter-row" {...FOUR_GRID_ALL}>
        <Card className="exact-dashboard-box secondary-left-border shadow-sm">
          <Text className="nti">{t('Total users')}</Text>
          <br /> <Text>78</Text>
        </Card>
      </Col>
      <Col className="gutter-row" {...FOUR_GRID_ALL}>
        <Card className="exact-dashboard-box tertiary-left-border shadow-sm">
          <Text className="nti">{t('Total Tasks')}</Text> <br />
          <Text>78</Text>
        </Card>
      </Col>
      <Col className="gutter-row" {...FOUR_GRID_ALL}>
        <Card className="exact-dashboard-box quaternary-left-border shadow-sm">
          <Text className="nti">{t('Users logout')}</Text> <br />
          <Text>3</Text>
        </Card>
      </Col>
    </Row>
  );
}

export default DashboardHeader;
