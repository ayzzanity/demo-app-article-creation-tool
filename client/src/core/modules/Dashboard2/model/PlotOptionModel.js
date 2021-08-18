import { types } from 'mobx-state-tree';

const PlotOptionModel = types
  .model('PlotOptionModel', {
    horizontal: types.optional(types.boolean, false)
  })
  .views((self) => ({}))
  .actions((self) => ({}));

export default PlotOptionModel;
