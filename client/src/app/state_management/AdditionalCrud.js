import { flow, cast } from 'mobx-state-tree';
import axios from 'axios';

const AdditionalCrud = (apiPath, self) => {
  return {
    GET_PUBLISHED: flow(function* () {
      try {
        const {
          data: { data, total_items }
        } = yield axios.get(apiPath);

        const datWithKey = data.map((d) => ({ ...d, key: d.id }));
        const dataFiltered = datWithKey.filter((data) => {
          return data.status === 'Published';
        });
        const dataSortedByDate = dataFiltered
          .slice()
          .sort((a, b) => b.publishDate.toLowerCase().localeCompare(a.publishDate.toLowerCase()));

        self.state = cast(dataFiltered);
        self.sorted = cast(dataSortedByDate);
        self.total = total_items;
      } catch (error) {
        console.log(error);
        return [null, error];
      }
    })
  };
};

export default AdditionalCrud;
