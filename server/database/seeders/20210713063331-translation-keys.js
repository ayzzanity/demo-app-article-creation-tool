'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'TranslationKeys',
      [
        {
          translation_key: 'The two passwords that you entered do not match!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Cancel',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Update',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'User Type',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Administrator',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Email Address',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Please enter email address',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Please input a valid email address',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'New Password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Please input your new password!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Please enter password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Confirm New Password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Please input your password!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Account Settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: '# of Votes',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Users online',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Total users',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Total Tasks',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Users logout',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'second Ago',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'User',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Task',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Usage',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Activity',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Last login',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Dashboard',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Sorry, the page you visited does not exist',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Back Home',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Change Language',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'EN',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'CH',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Logout',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'User Management',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Admin Settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'App Name',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Enter your email address and password to login',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Invalid email or password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Please input your email address!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Remember Me',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Logging in',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Login',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Forgot password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Enter One Time Pin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key:
            'You have logged-in using a new device We have sent an email message containing a  pin code to verify your identity',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'PIN Code',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Submit',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'English',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'German',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'The link has no longer available or link has expired',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Back to Reset Password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Create New Password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Please add your new password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Password must be of minimum 8 characters length',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Password must be of maximum 72 characters length',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Please confirm your new password!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'RESET PASSWORD',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Back to Login',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Resend request after',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key:
            "Enter your email address and we'll send you a temporary password Change your password immediately after logging-in",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Update User',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Add New User',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Send Invitation Email',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Country',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Please enter country',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Select A Country',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'City',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Please enter city',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Select A City',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Street',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Please enter Street',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'ZIP',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Please enter zip code',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Profile',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'First Name',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Last Name',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'First name',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Please enter last name',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Phone Number',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Please enter phone number',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Search',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'User Data',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Name',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Status',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Send Email',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Action',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Select a User Type',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Please enter first name',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Please select type',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Updating User',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Creating user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'User Updated',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Sending Email',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'User Created!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Created!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key: 'Updated!',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
