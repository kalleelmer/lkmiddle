let nodemailer = require('nodemailer');
let aws = require('aws-sdk');

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
    SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: "eu-west-1"
    })
});

var html = '<!DOCTYPE html><html lang="sv"><head><title>Bokningsbekräftelse - Lundakarnevalen 2018</title><meta charset="utf-8"></head><body style="background-color:#390444;color: white;font-family:sans-serif;text-align:center;padding: 50px;"><div style="width: 700px;margin: 0 auto;"><img style="max-width:500px;height:auto;" src="https://www.lundakarnevalen.se/wp-content/themes/Iinal-WPtheme/img/logo/footer2.png" alt="Logotyp"><h1 style="font-family:sans-serif;">Tack för ditt biljettköp {{name}}!</h1><p style="font-size: 20px;max-width: 650px;margin: 0 auto;">Du kan se dina biljetter samt bokningskoden för din order nedan. Med din bokningskod kan du enkelt hämta ut dina biljetter i en av Lundakarnevalens biljettbodar.</p><h1 style="font-family:sans-serif;">Bokningskod: {{identifier}}</h1><br/><h3 style="font-family:sans-serif;"><a style="font-size: 30px;color: #F7a021;" href="https://web-dev.lkticket.net/#/cart/{{id}}/{{identifier}}">Klicka här för att se dina biljetter</a></h3><p style="font-size: 16px;max-width: 600px;margin: 0 auto;"><b>OBS:</b> Bokningskoden ovan är det enda som krävs för att hämta ut dina biljetter. Vi ber dig därför spara denna i säkert förvar.</p><br/><h2 style="font-family:sans-serif;">Var hittar jag biljettbodarna?</h2><p style="font-size:17px;max-width: 650px;margin: 0 auto;">Biljettbodarna kommer finnas tillgängliga på Stortorget i Lund från och med den 18/4 samt i Lundagård och på Celemnstorget från och med den 2/5. Samtliga biljettbodar kommer vara öppna 11:30-18:30 måndag till lördag fram till den 20/5.</p><p style="color: rgb(138, 71, 151);font-size: 14px;padding-top: 50px;">2018 Lundakarnevalen. All rights reserved.</p></div></body></html>';


exports.sendConfirmation = function(customer, order) {
  console.log("Skickar mail");
  var mail = {
      from: 'noreply@lkticket.net',
      to: customer.email,
      subject: 'Bokningsbekräftelse - Lundakarnevalen 2018',
      html: html.replace("{{name}}", customer.name).replace(/{{id}}/g, order.id).replace(/{{identifier}}/g, order.identifier)
  };
  console.log(mail);
  transporter.sendMail(mail, (err, info) => {
    console.log(err);
      console.log(info);
  });
}
