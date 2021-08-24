import { List, Avatar } from 'antd';

const ListLatestArticles = ({ data }) => {
  const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short' });
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
                ? formatter.format(Date.parse(item.publishDate))
                : formatter.format(Date.parse(item.createdAt))
            }
          />
        </List.Item>
      )}
    />
  );
};

export default ListLatestArticles;
