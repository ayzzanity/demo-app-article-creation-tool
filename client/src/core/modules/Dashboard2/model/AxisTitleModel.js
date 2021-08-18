import { types } from 'mobx-state-tree';

const AxisTitleModel = types
  .model('AxisTitleModel', {
    text: types.optional(types.string, '')
  })
  .views((self) => ({}))
  .actions((self) => ({}));

export default AxisTitleModel;
