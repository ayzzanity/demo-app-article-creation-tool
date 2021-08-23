import { useEffect } from 'react';
import { Card, Row, Space } from 'antd';
import { inject, observer } from 'mobx-react';
import { ExactTitle } from '@core_common/components';
import { ArticleController } from '@app_modules/ArticleManagement/controller';
import { DisplayController } from '@app_modules/DisplayArticles/controller';

const Dashboard = ({ store }) => {
  const { getArticles, getUsers } = ArticleController({ store });
  const { getPublishedArticles } = DisplayController({ store });
  useEffect(() => {
    getUsers();
    getArticles();
    getPublishedArticles();
  }, []);
  return (
    <div>
      <ExactTitle level={3} text="Dashboard" />
      <section className="my-2 mx-2">
        <Card loading={store.articles.loading}>
          <Row>
            <Space>
              <Card style={{ width: 200, borderColor: '#3283a8' }} title="Total Users:">
                <ExactTitle
                  level={3}
                  className="d-flex justify-content-end align-items-center"
                  text={store.users.total}
                />
              </Card>
              <Card style={{ width: 200, borderColor: '#3283a8' }} title="Total Articles:">
                <ExactTitle
                  level={3}
                  className="d-flex justify-content-end align-items-center"
                  text={store.articles.total}
                />
              </Card>
              <Card style={{ width: 200, borderColor: '#3283a8' }} title="Published Articles:">
                <ExactTitle
                  level={3}
                  className="d-flex justify-content-end align-items-center"
                  text={store.display.sorted.length}
                />
              </Card>
              <Card style={{ width: 200, borderColor: '#3283a8' }} title="Drafted Articles:">
                <ExactTitle
                  level={3}
                  className="d-flex justify-content-end align-items-center"
                  text={`${store.articles.total - store.display.sorted.length}`}
                />
              </Card>
            </Space>
          </Row>
        </Card>
      </section>
    </div>
  );
};

export default inject('store')(observer(Dashboard));
