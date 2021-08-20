import { flow, cast } from 'mobx-state-tree';
import axios from 'axios';

const AdditionalCrud = (apiPath, self) => {
  return {
    SORT_BY_DATE: flow(function* (params, shouldReturnList = false) {
      try {
        const {
          data: { data, total_items }
        } = yield axios.get(apiPath, { params });

        const datWithKey = data.map((d) => ({ ...d, key: d.id }));
        const dataSortedByDate = datWithKey
          .slice()
          .sort((a, b) => b.publishDate.toLowerCase().localeCompare(a.publishDate.toLowerCase()));
        self.sorted = cast(dataSortedByDate);
        self.total = total_items;

        if (shouldReturnList) {
          return [dataSortedByDate, null];
        }
      } catch (error) {
        console.log(error);
        return [null, error];
      }
    }),

    RETRIEVE: flow(function* (id) {
      try {
        const { data } = yield axios.get(`${apiPath}/${id}`);
        Object.assign(self.single, data);
        return data;
      } catch (error) {
        return error;
      }
    })
  };
};

export default AdditionalCrud;
