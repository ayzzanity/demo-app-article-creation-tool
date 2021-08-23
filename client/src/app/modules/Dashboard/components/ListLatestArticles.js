import { List, Avatar } from 'antd';

const ListLatestArticles = ({ data }) => {
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
            description={item.publishDate}
          />
        </List.Item>
      )}
    />
  );
};

export default ListLatestArticles;
