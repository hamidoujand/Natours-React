let nodemailer = require("nodemailer");
let htmlToText = require("html-to-text");
let {
  welcomeTemplate,
  passwordResetTemplate,
} = require("../utils/emailTemplates");

module.exports = class Email {
  constructor(user, url) {
    (this.to = user.email), (this.firstName = user.name.split(" ")[0]);
    this.url = url;
    this.from = "Natours <hello@natours.io>";
  }
  createTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST_PROD,
        port: process.env.EMAIL_PORT_PROD,
        auth: {
          user: process.env.EMAIL_USERNAME_PROD,
          pass: process.env.EMAIL_PASSWORD_PROD,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  async send(template, subject) {
    let emailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: template,
      text: htmlToText.htmlToText(template),
    };

    await this.createTransport().sendMail(emailOptions);
  }
  async sendWelcome() {
    await this.send(
      welcomeTemplate(this.firstName, this.url),
      "welcome to the Natours family"
    );
  }

  async sendPasswordResetEmail() {
    await this.send(
      passwordResetTemplate(this.firstName, this.url),
      "Password Reset"
    );
  }
};
