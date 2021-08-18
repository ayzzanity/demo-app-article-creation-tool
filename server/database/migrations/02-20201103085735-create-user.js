'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      user_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'UserTypes',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      zip_code: {
        type: Sequelize.STRING
      },
      street_nr: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      verification_token: {
        type: Sequelize.STRING(350)
      },
      reset_password_token: {
        type: Sequelize.TEXT("LONG")
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      isEmailAuthenticate: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('Users');
  }
};
