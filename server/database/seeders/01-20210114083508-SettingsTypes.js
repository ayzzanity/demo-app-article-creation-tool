'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'SettingsTypes',
      [
        {
          name: 'Sales Account MwSt'
        },
        {
          name: 'Einnahmen/Ausgaben MwSt'
        },
        {
          name: 'Activities'
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
