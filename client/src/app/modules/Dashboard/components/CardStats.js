import { Col } from 'antd';

/**CORE IMPORTS */
import { FOUR_GRID } from '@core_common/antdhelpers/constants';
import { ExactCard, ExactTitle } from '@core_common/components';

const CardStats = ({ title, text }) => {
  return (
    <Col {...FOUR_GRID}>
      <ExactCard
        style={{ marginTop: 10, marginBottom: 10, width: 200, borderColor: '#3283a8' }}
        title={title}
      >
        <ExactTitle
          level={3}
          className="d-flex justify-content-end align-items-center"
          text={text}
        />
      </ExactCard>
    </Col>
  );
};

export default CardStats;
