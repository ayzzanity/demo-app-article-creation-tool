module.exports = (data) => {
  return {
    subject: `Ger√§teregistrierung`,
    intro: `Guten Tag ${data.user.first_name} ${data.user.last_name},`,
    content: `
      <p>Dies ist Ihr einmaliger Pin: ${data.verification_token}</p>
    `,
  };
};
