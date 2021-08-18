'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'Translations',
      [
        {
          translation_key_id: 1,
          locale_id: 2,
          value: 'The two passwords that you entered do not match!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 1,
          locale_id: 1,
          value: 'Das eingegebene Passwort stimmt nicht überein.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 2,
          locale_id: 2,
          value: 'Cancel',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 2,
          locale_id: 1,
          value: 'Abbrechen',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 3,
          locale_id: 2,
          value: 'Update',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 3,
          locale_id: 1,
          value: 'Aktualisieren',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 4,
          locale_id: 2,
          value: 'User Type',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 4,
          locale_id: 1,
          value: 'Benutzertyp',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 5,
          locale_id: 2,
          value: 'Administrator',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 5,
          locale_id: 1,
          value: 'Administrator',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 6,
          locale_id: 2,
          value: 'Email Address',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 6,
          locale_id: 1,
          value: 'Email Adresse',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 7,
          locale_id: 2,
          value: 'Please enter email address',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 7,
          locale_id: 1,
          value: 'Bitte erfassen Sie eine Email Adresse',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 8,
          locale_id: 2,
          value: 'Please input a valid email address',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 8,
          locale_id: 1,
          value: 'Bitte erfassen Sie eine gültige Email Adresse',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 9,
          locale_id: 2,
          value: 'New Password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 9,
          locale_id: 1,
          value: 'Neues Passwort',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 10,
          locale_id: 2,
          value: 'Please input your new password!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 10,
          locale_id: 1,
          value: 'Bitte erfassen Sie Ihr neues Passwort',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 11,
          locale_id: 2,
          value: 'Password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 11,
          locale_id: 1,
          value: 'Passwort',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 12,
          locale_id: 2,
          value: 'Please enter password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 12,
          locale_id: 1,
          value: 'Bitte erfassen Sie Ihr Passwort',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 13,
          locale_id: 2,
          value: 'Confirm New Password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 13,
          locale_id: 1,
          value: 'Bestätigen Sie bitte Ihr Passwort',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 14,
          locale_id: 2,
          value: 'Please input your password!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 14,
          locale_id: 1,
          value: 'Bitte erfassen Sie Ihr Passwort!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 15,
          locale_id: 2,
          value: 'Account Settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 15,
          locale_id: 1,
          value: 'Konto Einstellungen',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 16,
          locale_id: 2,
          value: '# of Votes',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 16,
          locale_id: 1,
          value: '# von Stimmen',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 17,
          locale_id: 2,
          value: 'Users online',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 17,
          locale_id: 1,
          value: 'Benutzer Online',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 18,
          locale_id: 2,
          value: 'Total users',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 18,
          locale_id: 1,
          value: 'Total Benutzer',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 19,
          locale_id: 2,
          value: 'Total Tasks',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 19,
          locale_id: 1,
          value: 'Total Aufgaben',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 20,
          locale_id: 2,
          value: 'Users logout',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 20,
          locale_id: 1,
          value: 'Benutzer Logout',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 21,
          locale_id: 2,
          value: 'second Ago',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 21,
          locale_id: 1,
          value: 'Sekunden',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 22,
          locale_id: 2,
          value: 'User',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 22,
          locale_id: 1,
          value: 'Benutzer',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 23,
          locale_id: 2,
          value: 'Task',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 23,
          locale_id: 1,
          value: 'Aufgabe',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 24,
          locale_id: 2,
          value: 'Usage',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 24,
          locale_id: 1,
          value: 'Benutzung',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 25,
          locale_id: 2,
          value: 'Activity',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 25,
          locale_id: 1,
          value: 'Aktivität',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 26,
          locale_id: 2,
          value: 'Last login',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 26,
          locale_id: 1,
          value: 'Letzter Login',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 27,
          locale_id: 2,
          value: 'Dashboard',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 27,
          locale_id: 1,
          value: 'Dashboard',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 28,
          locale_id: 2,
          value: 'Sorry, the page you visited does not exist.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 28,
          locale_id: 1,
          value: 'Bitte entschuldigen Sie, die Seite existiert nicht.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 29,
          locale_id: 2,
          value: 'Back Home',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 29,
          locale_id: 1,
          value: 'Zurück',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 30,
          locale_id: 2,
          value: 'Change Language',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 30,
          locale_id: 1,
          value: 'Sprache ändern',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 31,
          locale_id: 2,
          value: 'EN',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 31,
          locale_id: 1,
          value: 'EN',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 32,
          locale_id: 2,
          value: 'CH',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 32,
          locale_id: 1,
          value: 'DE',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 33,
          locale_id: 2,
          value: 'Logout',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 33,
          locale_id: 1,
          value: 'Logout',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 34,
          locale_id: 2,
          value: 'User Management',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 34,
          locale_id: 1,
          value: 'Benutzer Management',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 35,
          locale_id: 2,
          value: 'Admin Settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 35,
          locale_id: 1,
          value: 'Admin Einstellungen',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 36,
          locale_id: 2,
          value: 'App Name',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 36,
          locale_id: 1,
          value: 'App Name',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 37,
          locale_id: 2,
          value: 'Enter your email address and password to login.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 37,
          locale_id: 1,
          value: 'Geben Sie Ihre E-Mail-Adresse und Ihr Passwort ein, um sich anzumelden.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 38,
          locale_id: 2,
          value: 'Invalid email or password.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 38,
          locale_id: 1,
          value: 'Ungültige Email-Adresse oder ungültiges Passwort',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 39,
          locale_id: 2,
          value: 'Please input your email address!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 39,
          locale_id: 1,
          value: 'Bitte erfassen Sie Ihre Email-Adresse',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 40,
          locale_id: 2,
          value: 'Remember Me',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 40,
          locale_id: 1,
          value: 'Zugangsdaten merken',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 41,
          locale_id: 2,
          value: 'Logging in...',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 41,
          locale_id: 1,
          value: 'Anmelden...',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 42,
          locale_id: 2,
          value: 'Login',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 42,
          locale_id: 1,
          value: 'Login',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 43,
          locale_id: 2,
          value: 'Forgot password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 43,
          locale_id: 1,
          value: 'Passwort vergessen',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 44,
          locale_id: 2,
          value: 'Enter One Time Pin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 44,
          locale_id: 1,
          value: 'Erfassen Sie Ihren PIN',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 45,
          locale_id: 2,
          value:
            'You have logged-in using a new device. We have sent an email message containing a  pin code to verify your identity.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 45,
          locale_id: 1,
          value:
            'Sie haben sich mit einem neuen Gerät angemeldet. Wir haben eine E-Mail mit einem PIN-Code gesendet, um Ihre Identität zu bestätigen.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 46,
          locale_id: 2,
          value: 'PIN Code',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 46,
          locale_id: 1,
          value: 'PIN Code',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 47,
          locale_id: 2,
          value: 'Submit',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 47,
          locale_id: 1,
          value: 'Bestätigen',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 48,
          locale_id: 2,
          value: 'English',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 48,
          locale_id: 1,
          value: 'Englisch',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 49,
          locale_id: 2,
          value: 'German',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 49,
          locale_id: 1,
          value: 'Deutsch',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 50,
          locale_id: 2,
          value: 'The link has no longer available or link has expired',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 50,
          locale_id: 1,
          value: 'Der Link ist nicht mehr verfügbar oder der Link ist abgelaufen',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 51,
          locale_id: 2,
          value: 'Back to Reset Password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 51,
          locale_id: 1,
          value: 'Zurück zu Passwort zurücksetzen',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 52,
          locale_id: 2,
          value: 'Create New Password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 52,
          locale_id: 1,
          value: 'Neues Passwort erstellen',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 53,
          locale_id: 2,
          value: 'Please add your new password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 53,
          locale_id: 1,
          value: 'Bitte fügen Sie Ihr neues Passwort hinzu',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 54,
          locale_id: 2,
          value: 'Password must be of minimum 8 characters length',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 54,
          locale_id: 1,
          value: 'Das Passwort muss mindestens 8 Zeichen lang sein',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 55,
          locale_id: 2,
          value: 'Password must be of maximum 72 characters length',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 55,
          locale_id: 1,
          value: 'Das Passwort darf maximal 72 Zeichen lang sein',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 56,
          locale_id: 2,
          value: 'Please confirm your new password!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 56,
          locale_id: 1,
          value: 'Bitte bestätigen Sie Ihr neues Passwort!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 57,
          locale_id: 2,
          value: 'RESET PASSWORD',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 57,
          locale_id: 1,
          value: 'PASSWORT ZURÜCKSETZEN',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 58,
          locale_id: 2,
          value: 'Back to Login',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 58,
          locale_id: 1,
          value: 'Zurück zur Anmeldung',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 59,
          locale_id: 2,
          value: 'Resend request after',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 59,
          locale_id: 1,
          value: 'Anfrage erneut senden',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 60,
          locale_id: 2,
          value:
            "Enter your email address and we'll send you a temporary password Change your password immediately after logging-in.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 60,
          locale_id: 1,
          value:
            'Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen ein temporäres Passwort zu. Ändern Sie Ihr Passwort sofort nach dem Einloggen.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 61,
          locale_id: 2,
          value: 'Update User',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 61,
          locale_id: 1,
          value: 'Benutzer aktualisieren',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 62,
          locale_id: 2,
          value: 'Add New User',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 62,
          locale_id: 1,
          value: 'Neuer Benutzer hinzufügen',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 63,
          locale_id: 2,
          value: 'Send Invitation Email',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 63,
          locale_id: 1,
          value: 'Einladungsmail versenden',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 64,
          locale_id: 2,
          value: 'Country',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 64,
          locale_id: 1,
          value: 'Land',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 65,
          locale_id: 2,
          value: 'Please enter locale_id.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 65,
          locale_id: 1,
          value: 'Bitte erfassen Sie das Land.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 66,
          locale_id: 2,
          value: 'Select A Country',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 66,
          locale_id: 1,
          value: 'Wählen Sie ein Land',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 67,
          locale_id: 2,
          value: 'City',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 67,
          locale_id: 1,
          value: 'Stadt',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 68,
          locale_id: 2,
          value: 'Please enter city',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 68,
          locale_id: 1,
          value: 'Bitte erfassen Sie eine Stadt.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 69,
          locale_id: 2,
          value: 'Select A City',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 69,
          locale_id: 1,
          value: 'Wählen Sie eine Stadt',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 70,
          locale_id: 2,
          value: 'Street',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 70,
          locale_id: 1,
          value: 'Stasse',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 71,
          locale_id: 2,
          value: 'Please enter Street.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 71,
          locale_id: 1,
          value: 'Bitte erfassen Sie eine Strasse.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 72,
          locale_id: 2,
          value: 'ZIP',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 72,
          locale_id: 1,
          value: 'PLZ',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 73,
          locale_id: 2,
          value: 'Please enter zip code.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 73,
          locale_id: 1,
          value: 'Bitte erfassen Sie die Postleitzahl.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 74,
          locale_id: 2,
          value: 'Profile',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 74,
          locale_id: 1,
          value: 'Profil',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 75,
          locale_id: 2,
          value: 'First Name',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 75,
          locale_id: 1,
          value: 'Vorname',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 76,
          locale_id: 2,
          value: 'Last Name',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 76,
          locale_id: 1,
          value: 'Nachname',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 77,
          locale_id: 2,
          value: 'First name',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 77,
          locale_id: 1,
          value: 'Vorname',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 78,
          locale_id: 2,
          value: 'Please enter last name',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 78,
          locale_id: 1,
          value: 'Bitte erfassen Sie einen Nachnamen',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 79,
          locale_id: 2,
          value: 'Phone Number',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 79,
          locale_id: 1,
          value: 'Telefonnummer',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 80,
          locale_id: 2,
          value: 'Please enter phone number',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 80,
          locale_id: 1,
          value: 'Bitte erfassen Sie eine Telefonnummer',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 81,
          locale_id: 2,
          value: 'Search',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 81,
          locale_id: 1,
          value: 'Suche',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 82,
          locale_id: 2,
          value: 'User Data',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 82,
          locale_id: 1,
          value: 'Benutzerdaten',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 83,
          locale_id: 2,
          value: 'Name',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 83,
          locale_id: 1,
          value: 'Name',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 84,
          locale_id: 2,
          value: 'Status',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 84,
          locale_id: 1,
          value: 'Status',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 85,
          locale_id: 2,
          value: 'Send Email',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 85,
          locale_id: 1,
          value: 'Email senden',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 86,
          locale_id: 2,
          value: 'Action',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 86,
          locale_id: 1,
          value: 'Aktion',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 87,
          locale_id: 2,
          value: 'Select a User Type',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 87,
          locale_id: 1,
          value: 'Wählen Sie einen Benutzertypen',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 88,
          locale_id: 2,
          value: 'Please enter first name.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 88,
          locale_id: 1,
          value: 'Bitte erfassen Sie den Vornamen.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 89,
          locale_id: 2,
          value: 'Please select type',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 89,
          locale_id: 1,
          value: 'Bitte wählen Sie die Art',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 90,
          locale_id: 2,
          value: 'Updating User',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 90,
          locale_id: 1,
          value: 'Benutzer aktualisieren',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 91,
          locale_id: 2,
          value: 'Creating user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 91,
          locale_id: 1,
          value: 'Benutzer erstellen',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 92,
          locale_id: 2,
          value: 'User Updated',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 92,
          locale_id: 1,
          value: 'Benutzer aktualisieren',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 93,
          locale_id: 2,
          value: 'Sending Email',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 93,
          locale_id: 1,
          value: 'Email senden',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 94,
          locale_id: 2,
          value: 'User Created!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 94,
          locale_id: 1,
          value: 'Benutzer erstellt!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 95,
          locale_id: 2,
          value: 'Created!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 95,
          locale_id: 1,
          value: 'Erstellt!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 96,
          locale_id: 2,
          value: 'Updated!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          translation_key_id: 96,
          locale_id: 1,
          value: 'Aktualisiert!',
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
