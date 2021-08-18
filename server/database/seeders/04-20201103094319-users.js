('use strict');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: uuidv4(),
          first_name: 'Ayz',
          last_name: 'Abdulwahid',
          email: 'ayzal.abdulwahid@exact-construct.ch',
          password: '$2a$08$H4G612YDJk2N353rgzk5F.I.3u6YYoVUPDR7wjnhRFg4kpnT4mc9i',
          user_type_id: 1,
          phone_number: '09152401964',
          active: true,
          isEmailAuthenticate: true
        },
        {
          id: uuidv4(),
          first_name: 'Axl',
          last_name: 'Cuyugan',
          email: 'axl.cuyugan@exact-construct.ch',
          password: '$2a$08$H4G612YDJk2N353rgzk5F.I.3u6YYoVUPDR7wjnhRFg4kpnT4mc9i',
          user_type_id: 1,
          phone_number: '09152401964',
          active: true,
          isEmailAuthenticate: true
        },
        {
          id: uuidv4(),
          first_name: 'Mike',
          last_name: 'Meyer',
          email: 'al-amin.mahalail@exact-construct.ch',
          password: '$2a$08$H4G612YDJk2N353rgzk5F.I.3u6YYoVUPDR7wjnhRFg4kpnT4mc9i',
          user_type_id: 1,
          phone_number: '09234124',
          active: true,
          isEmailAuthenticate: true
        },
        {
          id: uuidv4(),
          first_name: 'dayana',
          last_name: 'muin',
          email: 'dayana.muin@exact-construct.ch',
          password: '$2a$08$H4G612YDJk2N353rgzk5F.I.3u6YYoVUPDR7wjnhRFg4kpnT4mc9i',
          user_type_id: 1,
          phone_number: '09234124',
          active: true,
          isEmailAuthenticate: true
        },
        {
          id: uuidv4(),
          first_name: 'Uwe',
          last_name: 'Schäfer',
          email: 'standard.user@exact-construct.ch',
          password: '$2a$10$3itom7BCgducXVGACTDZeumpRJ25kf0htD7OxZ/IGJfBzI3QY0RRW',
          user_type_id: 2,
          phone_number: '09234124',
          active: true,
          isEmailAuthenticate: false
        },
        {
          id: uuidv4(),
          first_name: 'Adrian',
          last_name: 'Frei',
          email: 'adrian.frei@exact-construct.ch',
          password: '$2a$10$3itom7BCgducXVGACTDZeumpRJ25kf0htD7OxZ/IGJfBzI3QY0RRW',
          user_type_id: 1,
          phone_number: '09152401964',
          active: true,
          isEmailAuthenticate: true
        },
        {
          id: uuidv4(),
          first_name: 'Andrea',
          last_name: 'Frei',
          email: 'andrea.frei@exact-construct.ch',
          password: '$2a$10$3itom7BCgducXVGACTDZeumpRJ25kf0htD7OxZ/IGJfBzI3QY0RRW',
          user_type_id: 1,
          phone_number: '09234124',
          active: true,
          isEmailAuthenticate: true
        },
        {
          id: uuidv4(),
          first_name: 'Xenia',
          last_name: 'King',
          email: 'xenia.king@exact-construct.ch',
          password: '$2a$10$3itom7BCgducXVGACTDZeumpRJ25kf0htD7OxZ/IGJfBzI3QY0RRW',
          user_type_id: 1,
          phone_number: '09234124',
          active: true,
          isEmailAuthenticate: true
        },
        {
          id: uuidv4(),
          first_name: 'Walter',
          last_name: 'Weber',
          email: 'aldominjoseph.tan@exact-construct.ch',
          password: '$2a$10$N3kBkcHKYX4j7suLjS5ouuQjRS92YRHsLh4mFO4Gv/EMz/QEdXsOu',
          user_type_id: 1,
          phone_number: '09234124',
          active: true,
          isEmailAuthenticate: true
        },
        {
          id: uuidv4(),
          first_name: 'Emma',
          last_name: 'Fischer',
          email: 'finance.user@exact-construct.ch',
          password: '$2a$10$3itom7BCgducXVGACTDZeumpRJ25kf0htD7OxZ/IGJfBzI3QY0RRW',
          user_type_id: 3,
          phone_number: '09234124',
          active: true,
          isEmailAuthenticate: false
        },
        {
          id: uuidv4(),
          first_name: 'Karl',
          last_name: 'Schneider',
          email: 'hr.user@exact-construct.ch',
          password: '$2a$10$3itom7BCgducXVGACTDZeumpRJ25kf0htD7OxZ/IGJfBzI3QY0RRW',
          user_type_id: 4,
          phone_number: '09234124',
          active: true,
          isEmailAuthenticate: false
        },
        {
          id: uuidv4(),
          first_name: 'Jürgen',
          last_name: 'Schmidt',
          email: 'hr.finance.user@exact-construct.ch',
          password: '$2a$10$3itom7BCgducXVGACTDZeumpRJ25kf0htD7OxZ/IGJfBzI3QY0RRW',
          user_type_id: 5,
          phone_number: '09234124',
          active: true,
          isEmailAuthenticate: false
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
