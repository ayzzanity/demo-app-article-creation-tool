import { cast, types } from 'mobx-state-tree';
import DashboardTypeModel from './DashboardTypeModel';

const DashboardModel = types
  .model('DashboardModel', {
    dashboards: types.optional(types.array(DashboardTypeModel), []),
    isFetching: types.optional(types.boolean, false)
  })
  .views((self) => ({}))
  .actions((self) => ({
    setLocalDashboards(data) {
      self.dashboards = cast(data);
    },

    reset() {
      self.dashboards = [];
      self.isFetching = false;
    },

    setRemoveChart(id) {
      const _db = self.dashboards.map((_ps) => {
        if (_ps._id === id) {
          _ps = {};
        }

        return _ps;
      });

      localStorage.setItem('dashboards', JSON.stringify(_db));

      self.dashboards = cast(_db);
    },

    setAdjustWidthSettings(id, width) {
      const _index = self.dashboards.findIndex((_ps) => _ps._id === id);

      self.dashboards[_index].boxWidth = width;

      localStorage.setItem('dashboards', JSON.stringify(self.dashboards));

      // return prevState;
    },

    setPlotLocation(id, x, y) {
      const _index = self.dashboards.findIndex((_ps) => _ps._id === id);

      self.dashboards[_index].x = x;
      self.dashboards[_index].y = y;

      localStorage.setItem('dashboards', JSON.stringify(self.dashboards));
    },

    setDashboardOnDragEnd(_object) {
      self.dashboards = [...self.dashboards, _object];

      localStorage.setItem('dashboards', JSON.stringify(self.dashboards));
    }
  }));

export default DashboardModel;
