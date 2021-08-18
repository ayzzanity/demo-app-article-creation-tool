import { flow, cast } from 'mobx-state-tree';
import axios from 'axios';

const ApplyChildCrud = (apiPath, self) => {
  return {
    CREATE: flow(function* (values) {
      try {
        self.isCreating = true;
        const { data } = yield axios.post(apiPath, values);

        self.isCreating = false;

        return [{ message: 'Created!', data }, null];
      } catch (error) {
        self.isCreating = false;
        return [null, error];
      }
    }),

    LIST: flow(function* (params) {
      try {
        //APPLY PAGINATION
        self.loading = true;

        const { data } = yield axios.get(apiPath, { params });

        return [data, null];
      } catch (error) {
        return [null, error];
      }
    }),

    UPDATE: flow(function* (id, values) {
      try {
        const { data } = yield axios.put(`${apiPath}/${id}`, values);

        return [{ message: 'Updated!', data }, null];
      } catch (error) {
        return [null, error];
      }
    }),

    RETRIEVE: flow(function* (id) {
      try {
        const { data } = yield axios.get(`${apiPath}/${id}`);

        return [{ data }, null];
      } catch (error) {
        return [null, error];
      }
    }),

    DELETE: flow(function* (id) {
      try {
        const { result } = yield axios.delete(apiPath, {
          data: { ids: [id] }
        });

        return [{ result }, null];
      } catch (error) {
        return [null, error];
      }
    })
  };
};

export default ApplyChildCrud;
