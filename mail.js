let nodemailer = require('nodemailer');
let aws = require('aws-sdk');

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
    SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: "eu-west-1"
    })
});

var html = '<!DOCTYPE html><html lang="sv"><head><title>Bokningsbekräftelse - Lundakarnevalen 2018</title><meta charset="utf-8"></head><body style="background-color:#390444;color: white;font-family:sans-serif;text-align:center;width:100%;"><div style="width: 700px;margin: 0 auto;padding-bottom:20px;"><img style="max-width:500px;height:auto;margin-top:20px;" src="https://s3.eu-central-1.amazonaws.com/lkstatic/images/logotyp.png" alt="Logotyp"><h1 style="color:white;font-family:sans-serif;font-size:38px;">Tack för ditt biljettköp<br/>{{name}}!</h1><p style="color:white;font-size: 22px;max-width: 650px;margin: 0 auto;">Du kan se en länk till dina biljetter samt bokningskoden för din order nedan. Med din bokningskod kan du enkelt hämta ut dina biljetter i en av Lundakarnevalens biljettbodar.</p><h1 style="color:white;font-family:sans-serif;font-size:36px;">Bokningskod: {{identifier}}</h1><h3 style="font-family:sans-serif;"><a style="font-size: 30px;color:#F7a021;" href="https://lkticket.net/#/cart/{{id}}/{{identifier}}">Klicka här för att se dina biljetter</a></h3><p style="color:white;font-size: 17px;max-width: 600px;margin: 0 auto;">OBS: Bokningskoden ovan är det enda som krävs för att hämta ut dina biljetter. Vi ber dig därför spara denna i säkert förvar.</p><p style="color: rgb(138, 71, 151);font-size: 14px;margin-top: 20px;">2018 Lundakarnevalen. All rights reserved.</p></div></body></html>';


exports.sendConfirmation = function(customer, order) {
  console.log("Skickar mail");
  var mail = {
      from: 'noreply@lkticket.net',
      to: customer.email,
      subject: 'Din bokningsbekräftelse - Lundakarnevalen 2018',
      html: html.replace("{{name}}", customer.name).replace(/{{id}}/g, order.id).replace(/{{identifier}}/g, order.identifier)
  };
  console.log(mail);
  transporter.sendMail(mail, (err, info) => {
    console.log(err);
      console.log(info);
  });
}
