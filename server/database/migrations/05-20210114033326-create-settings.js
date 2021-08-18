'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      settings_type_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        references: {
          model: 'SettingsTypes',
          key: 'id'
        },
        onUpdate: 'cascade'
      },
      name: {
        type: Sequelize.STRING
      },
      descr: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Settings');
  }
};
