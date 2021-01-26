exports.welcomeTemplate = (name, url) => {
  return `
        <h2>Welcome ${name}</h2>
        <a href='${url}'>Me Route</a>
    `;
};

exports.passwordResetTemplate = (name, url) => {
  return `
    <h2>Hi ${name}</h2>
    <p>Forgot your password send a PATCH request to the url below \n and send Password and PasswordConfirm\n if did not forget your password ignore this</p>
    <p>its  ONLY valid for 10 minutes</p>
    <a href="${url}"><p>${url}</p></a>
  `;
};
