var nodemailer =require('nodemailer');
require("dotenv").config();


async function sendTaskCreationEmail(email,task){
    console.log('Sending mail....')
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD
        }
      });
      

      var subject='Task created: '+task.title;
      var text=task.title+' has been added to your list and is due on : '+task.dueDate;
      
      var mailOptions = {
        from: 'yash1.aggarwal2310@gmail.com',
        to: 'yashaggarwal2310@gmail.com',
        subject: subject,
        text: text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports={
    sendTaskCreationEmail,
}

