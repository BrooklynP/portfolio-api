const nodemailer = require('nodemailer');
const secrets = require('./secret');
const apiBuilder = require('claudia-api-builder');

api = new apiBuilder();
module.exports = api;

var mailOptions;
var logMsg = "none";

api.post('/email', async (req, res) => {
  mailOptions = {
    from: secrets.email,
    to: secrets.email,
    subject: 'Email From: ' + req.body.senderEmail + ' | ' + req.body.subject,
    text: req.body.content,
  };
  sendMail(mailOptions);
  return logMsg;
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: secrets.email,
    pass: secrets.pwd
  }
});

function sendMail(mailOptions) {
  logMsg="Starting Send Function";
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      logMsg = error;
      return error;
    } else {
      logMsg = "Send Complete";
      return true;
    }
  });
  logMsg="Function finished";
}