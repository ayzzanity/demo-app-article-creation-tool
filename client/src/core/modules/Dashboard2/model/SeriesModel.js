import { types } from 'mobx-state-tree';

const SeriesModel = types
  .model('SeriesModel', {
    chartId: types.optional(types.string, ''),
    data: types.optional(types.array(types.number), []),
    fileName: types.optional(types.string, ''),
    name: types.optional(types.string, ''),
    _xByear: types.optional(types.string, '')
  })
  .views((self) => ({}))
  .actions((self) => ({}));

export default SeriesModel;
