import { flow, cast } from 'mobx-state-tree';
import axios from 'axios';

const ApplyRootCrud = (apiPath, self) => {
  return {
    CREATE: flow(function* (values) {
      try {
        self.isCreating = true;
        const { data } = yield axios.post(apiPath, values);
        self.state.push(data);
        self.isCreating = false;

        return [{ message: 'Created', data }, null];
      } catch (error) {
        self.isCreating = false;
        return [null, error];
      }
    }),

    LIST: flow(function* (params, shouldReturnList = false) {
      try {
        //APPLY PAGINATION
        self.loading = true;

        const {
          data: { data, total_items }
        } = yield axios.get(apiPath, { params });

        const datWithKey = data.map((d) => ({ ...d, key: d.id }));

        self.state = cast(datWithKey);
        self.total = total_items;
        self.loading = false;

        if (shouldReturnList) {
          return [datWithKey, null];
        }
      } catch (error) {
        console.log(error);
        return [null, error];
      }
    }),

    UPDATE: flow(function* (id, values) {
      try {
        const { data } = yield axios.put(`${apiPath}/${id}`, values);
        self.state.splice(
          self.state.findIndex((data) => data.id === id),
          1,
          data
        );

        return [{ message: 'Updated' }, null];
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
    }),

    DELETE: flow(function* (id) {
      self.isDeleting = true;
      const { data } = yield axios.delete(apiPath, {
        data: { ids: [id] }
      });
      if (data) {
        self.state.splice(
          self.state.findIndex((data) => data.id === id),
          1
        );
      }
      self.isDeleting = false;
      return [{ message: 'Deleted', data }, null];
    })
  };
};

export default ApplyRootCrud;
