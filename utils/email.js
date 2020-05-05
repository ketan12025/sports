const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Ketan <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    // Sendgrid
    return nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(subject) {
    // 1) Render HTML
    const html = `<body>Forgot your password? Submit a PATCH request with your new password and passwordConfirm 
                  to: ${this.url}.\nIf you didn't forget your password, please ignore this email!.please do not reply to this email this is atomatic generated email</body>`;

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: 
          ${this.url}.\nIf you didn't forget your password, please ignore this email`,
    };

    // 3) ChtmlToText.fromString(html)reate a transport and send email
    await this.newTransport().sendMail(mailOptions, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        return 1
      }
    });
  }

  async sendPasswordReset() {
    await this.send("Your password reset token (valid for only 10 minutes)");
  }
};
