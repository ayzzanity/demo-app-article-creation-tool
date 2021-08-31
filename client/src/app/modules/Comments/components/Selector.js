import { useState } from 'react';
import { Card, Space, Select } from 'antd';
import { inject, observer } from 'mobx-react';
import { CommentsController } from '@app_modules/Comments/controller';

const Selector = ({ store }) => {
  const { Option } = Select;
  const { getUserArticle, getCommentsById } = CommentsController({ store });
  const [value, setValue] = useState(null);
  return (
    <Card>
      <Space>
        <Select
          placeholder="User"
          style={{ width: 200 }}
          onChange={(id) => {
            getUserArticle(id);
            setValue(null);
          }}
        >
          {store.users.state.map((_u) => (
            <Option key={_u.id} value={_u.id}>
              {_u.first_name} {_u.last_name}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="Article"
          value={value}
          style={{ width: 300 }}
          onChange={(value) => {
            getCommentsById(value);
            setValue(value);
          }}
        >
          {store.articles.state &&
            store.articles.state.map((_a) => (
              <Option key={_a.id} value={_a.id}>
                {_a.title}
              </Option>
            ))}
        </Select>
      </Space>
    </Card>
  );
};

export default inject('store')(observer(Selector));
