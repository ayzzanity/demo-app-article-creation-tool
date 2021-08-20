import { Typography, Card } from 'antd';
import { inject, observer } from 'mobx-react';
import { ArticleImage } from '.';

const ArticleViewCard = ({ store }) => {
  const { single, loading } = store.display;
  const { Title } = Typography;
  return (
    <Card
      loading={loading}
      cover={<ArticleImage imageHeader={single.imageHeader} maxHeight={300} isView={true} />}
    >
      <Title level={2}>{single.title}</Title>
      <br />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Title level={4}>
          {single.publishDate} by {single.Users.first_name} {single.Users.last_name}
        </Title>
      </div>
      <br />
      <div dangerouslySetInnerHTML={{ __html: single.content }} />
    </Card>
  );
};

export default inject('store')(observer(ArticleViewCard));
