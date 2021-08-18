module.exports = class Upsert {
	static async init(Model, values, { options, includes = {}, where }) {
		// Placed default value here instead on param level | Reason: On param level, it doesn't get the value 'values.id'
		where = where || { id: values.id || -1 };

		if (!Array.isArray(values)) {
			return await Model.findOne({ where, ...includes }).then(async function (obj) {
				if (options == null) options = {};

				if (obj) {
					// update
					const { fields, updateOnDuplicate, ...option } = options;
					await obj.update(values, { individualHooks: true, ...option });
					return await Model.findOne({ where, ...includes });
				} else {
					const { id, updateOnDuplicate, ...rest } = values;
					// insert
					// If include is not empty
					if (!!Object.keys(includes).length) {
						const result = await Model.create(rest, { ...options }).then((resultEntity) => resultEntity.get({ plain: true }));
						return await Model.findOne({ where: { id: result.id }, ...includes });
					} else {
						return await Model.create(rest, { ...options });
					}
				}
			});
		} else {
			const { updateOnDuplicate } = options;
			return await Model.bulkCreate(values, { updateOnDuplicate });
		}
	}
};
