/* eslint-disable no-console */
const mailer = require('nodemailer');
const { welcome } = require('./welcomeTemplate');
const { purchase } = require('./purchaseTemplate');
const { resetPassword } = require('./resetpassTemplate');

require('dotenv').config();

const getEmailData = (to, name, token, type, actionData) => {
  let data = null;

  switch (type) {
    case 'welcome':
      data = {
        from: 'Waves <likbes.waves@gmail.com>',
        to,
        subject: `Welcome to Waves, ${name}`,
        html: welcome(),
      };
      break;

    case 'purchase':
      data = {
        from: 'Waves <likbes.waves@gmail.com>',
        to,
        subject: `Thanks for shopping with us, ${name}`,
        html: purchase(actionData),
      };
      break;

    case 'reset_pass':
      data = {
        from: 'Waves <likbes.waves@gmail.com>',
        to,
        subject: 'Reset password',
        html: resetPassword(actionData),
      };
      break;

    default:
      return data;
  }

  return data;
};

const sendEmail = (to, name, token, type, actionData = null) => {
  const smtpTransport = mailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'likbes.waves@gmail.com',
      pass: process.env.EMAIL_PASS,
    }
  });

  const mail = getEmailData(to, name, token, type, actionData);

  smtpTransport.sendMail(mail, (err) => {
    if (err) console.log(err);
    else console.log('email sent');
    smtpTransport.close();
  });
};

module.exports = { sendEmail };
