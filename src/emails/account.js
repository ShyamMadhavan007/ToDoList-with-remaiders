// const sgMail = require('@sendgrid/mail');
// //const config = require('config');
// require('dotenv').config()

// sgMail.setApiKey(process.env.SG_API_KEY);

// const sendWelcomeMail = (email,name)=>{
//     sgMail.send({
//         to:email,
//         from:'paritoshdev26@gmail.com',
//         subject:'Thanks for Joining In!',
//         text:`Hi, ${name}, welcome to the App. Now never forget Anything. Don't forget to complete your user profile!!`
//     })
// }

// const sendGoodbyeMail = (email,name)=>{
//     sgMail.send({
//         to:email,
//         from:'paritoshdev26@gmail.com',
//         subject:'Sorry to see you go',
//         text:`Goodbye, ${name}. Hope to see you back soon sometime in near future.`
//     })
// }
// module.exports = {
//     sendWelcomeMail,
//     sendGoodbyeMail
// }

const nodemailer = require('nodemailer');

// Create a Nodemailer transporter using SMTP or other transport mechanisms
const transporter = nodemailer.createTransport({
    /* Specify your mail server configuration here */
    /* For example, for SMTP: */
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.USER,
        pass: process.env.APP_PASSWORD
    }
    
});

const sendWelcomeMail = (email, name) => {
    const mailOptions = {
        from: {address:process.env.USER},
        to: email,
        subject: 'Thanks for Joining In!',
        text: `Hi, ${name}, welcome to the App. Now never forget Anything. Don't forget to complete your user profile!!`
    };
    
    // Send mail using the transporter
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

const sendGoodbyeMail = (email, name) => {
    const mailOptions = {
        from: {address:process.env.USER},
        to: email,
        subject: 'Sorry to see you go',
        text: `Goodbye, ${name}. Hope to see you back soon sometime in near future.`
    };

    // Send mail using the transporter
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = {
    sendWelcomeMail,
    sendGoodbyeMail
};
