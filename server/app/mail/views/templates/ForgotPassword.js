const { APP_NAME, HOST } = require("../../../../config/environment")

module.exports = (data) => {
  const reset_link = `${HOST}/change-password/${data.token}/${data.user_id}`

  return {
    subject: `Anforderung zum Zurücksetzen des Passworts`,
    intro: `Guten Tag ${data.first_name} ${data.last_name}`,
    content: `

			<p>Sie erhalten diese E-Mail, weil Sie oder jemand anderes ein Passwort-Reset für Ihr Benutzerkonto bei ${APP_NAME} beantragt hat.</p>

			<p>Klicken Sie auf den unten stehenden Link, um Ihr Passwort zurückzusetzen:</p>
			<a class="primary-btn" href="${reset_link}">Passwort zurücksetzen</a> <br />

			<p>Dieser Link ist nur für 2 Tage gültig.  </p>

			<p>
				Wenn Sie keine Kennwortrücksetzung angefordert haben, können Sie diese E-Mail getrost ignorieren. <br />
				Sie erhalten diese E-Mail, weil Sie oder jemand anderes ein Passwort-Reset für Ihr Benutzerkonto bei ${APP_NAME} beantragt hat.
			</p>
    `,
  }
}
