import { flow, cast } from 'mobx-state-tree';
import axios from 'axios';

const AdditionalCrud = (apiPath, self) => {
  return {
    GET_PUBLISHED: flow(function* (params) {
      try {
        const {
          data: { data }
        } = yield axios.get(apiPath, { params });
        self.total = cast(data.length);
        const dataWithKey = data.map((d) => ({ ...d, key: d.id }));
        const dataFiltered = dataWithKey.filter((data) => {
          return data.status === 'Published';
        });
        const dataSortedByDate = dataFiltered
          .slice()
          .sort((a, b) => b.publishDate.toLowerCase().localeCompare(a.publishDate.toLowerCase()));

        self.state = cast(dataFiltered);
        self.sorted = cast(dataSortedByDate);
      } catch (error) {
        console.log(error);
        return [null, error];
      }
    }),
    GET_DRAFTS: flow(function* (params) {
      try {
        const {
          data: { data }
        } = yield axios.get(apiPath, { params });
        self.total = cast(data.length);
        const dataWithKey = data.map((d) => ({ ...d, key: d.id }));
        const dataFiltered = dataWithKey.filter((data) => {
          return data.status === 'Draft';
        });
        const dataSortedByDate = dataFiltered
          .slice()
          .sort((a, b) => b.publishDate.toLowerCase().localeCompare(a.publishDate.toLowerCase()));

        self.sorted = cast(dataSortedByDate);
      } catch (error) {
        console.log(error);
        return [null, error];
      }
    }),
    GET_ARTICLES_BY_USER: flow(function* (id) {
      try {
        const {
          data: { data }
        } = yield axios.get(apiPath);

        const dataWithKey = data.map((d) => ({ ...d, key: d.id }));
        const dataFiltered = dataWithKey.filter((data) => {
          return data.user_article_id === id;
        });
        const dataSortedByDate = dataFiltered
          .slice()
          .sort((a, b) => b.publishDate.toLowerCase().localeCompare(a.publishDate.toLowerCase()));
        self.state = cast(dataSortedByDate);
        self.total = cast(dataFiltered.length);
      } catch (error) {
        console.log(error);
        return [null, error];
      }
    }),
    GET_COMMENTS_BY_ID: flow(function* (id) {
      try {
        const {
          data: { data }
        } = yield axios.get(apiPath);

        const dataWithKey = data.map((d) => ({ ...d, key: d.id }));
        const dataFiltered = dataWithKey.filter((data) => {
          return data.comment_article_id === id;
        });
        self.state = cast(dataFiltered);
        self.total = cast(dataFiltered.length);
      } catch (error) {
        console.log(error);
        return [null, error];
      }
    })
  };
};

export default AdditionalCrud;
