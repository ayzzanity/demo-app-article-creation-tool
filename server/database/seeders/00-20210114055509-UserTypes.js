'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'UserTypes',
      [
        {
          name: 'Administrator'
        },
        {
          name: 'Bereichsleiter Standort'
        },
        {
          name: 'Finance User'
        },
        {
          name: 'HR User'
        },
        {
          name: 'HR & Finance User'
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
