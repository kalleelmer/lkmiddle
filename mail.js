let nodemailer = require('nodemailer');
let aws = require('aws-sdk');

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
    SES: new aws.SES({
        apiVersion: '2010-12-01'
    })
});

// send some mail

exports.sendConfirmation = function(customer, order) {
  console.log("Skickar mail");
  var mail = {
      from: 'noreply@lkticket.net',
      to: customer.email,
      subject: 'Här är ditt karnekvitto',
      text: 'Wehej! Karnekul!' + order + customer.name,
      ses: { // optional extra arguments for SendRawEmail
          Tags: [{
              Name: 'tag name',
              Value: 'tag value'
          }]
      }
  };
  console.log(mail);
  transporter.sendMail(mail, (err, info) => {
    console.log(err);
      console.log(info);
  });
}
