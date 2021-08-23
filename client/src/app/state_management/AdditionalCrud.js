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
    })
  };
};

export default AdditionalCrud;
