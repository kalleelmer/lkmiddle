let nodemailer = require('nodemailer');
let aws = require('aws-sdk');

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
    SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: "eu-west-1"
    })
});

var html = "<html><head></head><body style='font-family:sans-serif; background-color: #390444; '><br><img src='https://www.lundakarnevalen.se/wp-content/themes/Iinal-WPtheme/img/girl.png' style='height:30vh;'><h1 style='text-align:center; color: white;'>Tack för ditt biljettköp {{name}}!</h1><p style='font-size:20px; color:white; text-align: center;'>För att hämta ut dina biljetter ta dig till närmsta biljettbod och visa upp följande kod. </p><h1 style='color:white; text-align:center'>{{identifier}}</h1></br><p style='color:white; text-align:center'>OBS! Denna koden och länken nedan är det enda som krävs för att hämta ut dina biljetter. Se till att ingen annan får tag i dem. </p><p style='font-size:20px; color:white; text-align: center;'><a style='color: #F7a021' href='https://web-dev.lkticket.net/#/cart/{{id}}/{{identifier}}'>Klicka här för att se dina biljetter<a></p><hr><p style='color: rgb(138, 71, 151); font-size:11px; text-align:center;'>2018 Lundakarnevalen. All rights reserved.</p></body></html>";

console.log(mail);
transporter.sendMail(mail, (err, info) => {
  console.log(err);
    console.log(info);
});

exports.sendConfirmation = function(customer, order) {
  console.log("Skickar mail");
  var mail = {
      from: 'noreply@lkticket.net',
      to: customer.email,
      subject: 'Här är ditt karnekvitto',
      html: html.replace("{{name}}", "Kristoffer").replace(/{{id}}/g, 123).replace(/{{identifier}}/g, "jkasdfhjker")
  };
  console.log(mail);
  transporter.sendMail(mail, (err, info) => {
    console.log(err);
      console.log(info);
  });
}
