'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Settings',
      [
        {
          settings_type_id: 3,
          name: 'Servers Shift Change',
          descr: 'none'
        },
        {
          settings_type_id: 3,
          name: 'Kitchen Prep',
          descr: 'none'
        },
        {
          settings_type_id: 3,
          name: 'Cleaning',
          descr: 'none'
        },
        {
          settings_type_id: 1,
          name: 'Standard',
          descr: 'none'
        },
        {
          settings_type_id: 1,
          name: 'Take away und Hotellerie',
          descr: 'none'
        },
        {
          settings_type_id: 2,
          name: 'Norm-Warenaufwand',
          descr: 'USt 56'
        },
        {
          settings_type_id: 2,
          name: 'Norm-Betrieb',
          descr: 'USt 128'
        },
        {
          settings_type_id: 2,
          name: 'Reduziert-Warenaufwand',
          descr: 'USt 200'
        },
        {
          settings_type_id: 2,
          name: 'Reduziert-Betrieb',
          descr: 'USt 272'
        },
        {
          settings_type_id: 2,
          name: 'ohne',
          descr: 'USt 0'
        }
      ],
      {}
    );
  },

  down: async () => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
