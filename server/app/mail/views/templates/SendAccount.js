const { COMPANY_NAME, HOST, APP_NAME } = require('../../../../config/environment');

module.exports = (data) => {
  const reset_link = `${HOST}/change-password/${data.token}/${data.user_id}`;

  return {
    subject: `Kontoregistrierung`,
    intro: `Guten Tag ${data.first_name} ${data.last_name}`,
    content: `
      <p>Ihr Konto für ${COMPANY_NAME} ${APP_NAME} wurde erfolgreich erstellt.</p>
			<b>login E-mail:</b> ${data.email} <br><br>  
			<a class="primary-btn" href="${reset_link}">Wachtwoord instellenn</a> <br />

      <p>Deze link is 2 dagen geldig.</p>
    `
  };
};
