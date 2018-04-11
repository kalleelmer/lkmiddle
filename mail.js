let nodemailer = require('nodemailer');
let aws = require('aws-sdk');

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
    SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: "eu-west-1"
    })
});

// send some mail

exports.sendConfirmation = function(customer, order) {
  console.log("Skickar mail");
  var mail = {
      from: 'noreply@lkticket.net',
      to: customer.email,
      subject: 'Här är ditt karnekvitto',
      text: 'Wehej! Karnekul! För att hämta dina biljetter uppge: '+ order.identifier +' \n https://web-dev.lkticket.net/#/cart/'+ order.id +'/'+ order.identifier,
  };
  console.log(mail);
  transporter.sendMail(mail, (err, info) => {
    console.log(err);
      console.log(info);
  });
}
