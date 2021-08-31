import { List, Avatar } from 'antd';
import { DateFormatter } from '@app_common/';

const ListLatestArticles = ({ data }) => {
  const { formatDate } = DateFormatter('medium', 'short');
  return (
    <List
      size="small"
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.imageHeader} />}
            title={item.title}
            description={
              item.status === 'Published'
                ? formatDate(item.publishDate)
                : formatDate(item.createdAt)
            }
          />
        </List.Item>
      )}
    />
  );
};

export default ListLatestArticles;
