import { types } from 'mobx-state-tree';
import AxisModel from './AxisModel';
import PlotOptionModel from './PlotOptionModel';
import SeriesModel from './SeriesModel';

const DashboardTypeModel = types
  .model('DashboardTypeModel', {
    boxWidth: types.optional(types.integer, 0),
    description: types.optional(types.string, ''),
    lockDrag: types.optional(types.boolean, false),
    name: types.optional(types.string, ''),
    type: types.optional(types.string, ''),
    x: types.optional(types.number, 0),
    y: types.optional(types.number, 0),
    _id: types.optional(types.string, ''),
    axis: types.optional(types.array(AxisModel), []),
    colors: types.optional(types.array(types.string), []),
    labels: types.optional(types.array(types.string), []),
    plotOption: types.optional(PlotOptionModel, {}),
    series: types.optional(types.array(SeriesModel), []),
    isFetching: types.optional(types.boolean, false)
  })
  .views((self) => ({}))
  .actions((self) => ({}));

export default DashboardTypeModel;
