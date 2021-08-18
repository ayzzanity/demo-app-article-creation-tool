import { types } from 'mobx-state-tree';
import AxisTitleModel from './AxisTitleModel';

const AxisModel = types
  .model('AxisModel', {
    title: types.optional(AxisTitleModel, {})
  })
  .views((self) => ({}))
  .actions((self) => ({}));

export default AxisModel;
