import { useEffect } from 'react';
import { Row, Col } from 'antd';
import { inject, observer } from 'mobx-react';
import { ExactTitle } from '@core_common/components';
import { UserManagementController } from '@core_modules/UserManagement/controller';
import { Selector, CommentDisplay } from '@app_modules/Comments/components';

const Comments = ({ store }) => {
  const { getUsers } = UserManagementController({ store });

  useEffect(() => {
    getUsers();
    store.comments.clearComments();
  }, []);
  return (
    <Row gutter={24}>
      <Col span={24}>
        <ExactTitle level={3} text="Comments" />
        <Selector />
        <CommentDisplay />
      </Col>
    </Row>
  );
};

export default inject('store')(observer(Comments));
