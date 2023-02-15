








const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.post('/sendEmail3', async (req, res) => {
  const mailgun = require("mailgun-js");
  const DOMAIN = 'sandboxe2a16540e6174c8cbcf33a275a879209.mailgun.org';
  const mg = mailgun({apiKey: '618b90a3b8e94f388ad8ff7ec1815f21-eb38c18d-5402f757', domain: DOMAIN});
  const data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'paulinochristabelle59@gmail.com',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!'
  };
  mg.messages().send(data, function (error, body) {
    console.log(body);
  });

});

app.post('/sendEmail2', async (req, res) => {
  const nodemailer = require('nodemailer');
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'BellaIcban22@gmail.com',
        pass: 'YourHighness22!'
      }
    });
  
    // Define the email options
    let mailOptions = {
      from: '"Sender Name" <user@example.com>', // sender address
      to: 'maartiaga1@gmail.com', // list of receivers
      subject: 'Subject', // Subject line
      text: 'Hello World', // plain text body
      html: '<b>Hello World</b>' // html body
    };
  
    // Send the email
    let info = await transporter.sendMail(mailOptions);
  
    console.log('Message sent: %s', info.messageId);
  
});

app.post('/sendEmail', (req, res) => {
  const { to, subject, text } = req.body;
  console.log(`Yopooo, we're sending the email now to ${to}`);

  axios.post('https://api.sendgrid.com/v3/mail/send', {
    personalizations: [
      {
        to: [
          {
            email: to
          }
        ],
        subject: subject
      }
    ],
    from: {
      email: 'paulinochristabelle59@gmail.com'
    },
    content: [
      {
        type: 'text/plain',
        value: text
      }
    ]
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer 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`
    }
  })
  .then(response => {
    res.send('Email sent successfully');
  })
  .catch(error => {
    res.status(500).send('Error sending email: ' + error.message);
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000 meeeow');
});
