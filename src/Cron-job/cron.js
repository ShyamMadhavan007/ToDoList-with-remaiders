// const cron = require("node-cron");
// const User = require("../models/User");
// const Task = require("../models/Task");
// const sgMail = require("@sendgrid/mail");
// //const config = require('config')
// require("dotenv").config();

// sgMail.setApiKey(process.env.SG_API_KEY);

// const checkOverdue = () =>
//   cron.schedule("12 15 * * *", () => {
//     User.find({}).then(users => {
//       users.forEach(async function(user) {
//         const tasks = await Task.find({ owner: user._id, completed: false });
//         let overdueAmount = 0;
//         let taskList = "";
//         tasks.forEach(async task => {
//           if (
//             task.due_at &&
//             task.due_at < new Date() &&
//             task.toBeReminded === true &&
//             task.completed === false
//           ) {
//             overdueAmount = overdueAmount + 1;
//             taskList += overdueAmount + ". " + task.description + ".";
//             task.completed = true;
//           }
//           await task.save();
//         });
//         if (overdueAmount > 0) {
//           const msg = {
//             to: user.email,
//             from: "paritoshdev26@gmail.com",
//             subject: `${overdueAmount} Tasks Overdue | TaskApp`,
//             text: `${user.name}, you have ${overdueAmount} tasks that are due for today. Make sure you get them done. ${taskList}`
//           };
//           sgMail.send(msg);
//         }
//       });
//     });

//     console.log("Ran cron for overdue tasks ");
//   });

// module.exports = checkOverdue;


const cron = require("node-cron");
const User = require("../models/User");
const Task = require("../models/Task");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a Nodemailer transporter using Gmail SMTP server
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.APP_PASSWORD
    }
});

const checkOverdue = () =>
  cron.schedule("29 21 * * *", () => {
    User.find({}).then(users => {
      users.forEach(async function(user) {
        const tasks = await Task.find({ owner: user._id, completed: false });
        let overdueAmount = 0;
        let taskList = "";
        tasks.forEach(async task => {
          if (
            task.due_at &&
            task.due_at < new Date() &&
            task.toBeReminded === true &&
            task.completed === false
          ) {
            overdueAmount = overdueAmount + 1;
            taskList += overdueAmount + ". " + task.description + ".";
            task.completed = true;
          }
          await task.save();
        });
        if (overdueAmount > 0) {
          const mailOptions = {
            from: {address:process.env.USER},
            to: user.email,
            subject: `${overdueAmount} Tasks Overdue | TaskApp`,
            text: `${user.name}, you have ${overdueAmount} tasks that are due for today. Make sure you get them done. ${taskList}`
          };
          // Send mail using the transporter
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
          });
        }
      });
    });

    console.log("Ran cron for overdue tasks ");
  });

module.exports = checkOverdue;


// const cron = require("node-cron");
// const User = require("../models/User");
// const Task = require("../models/Task");
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,  
//   auth: {
//     user: process.env.USER,
//     pass: process.env.APP_PASSWORD
//   }
// });

// const checkOverdue = () =>
//   cron.schedule("40 23 * * *", async () => {
//     try {
//       const users = await User.find({});

//       for (const user of users) {
//         const overdueTasks = await Task.find({
//           owner: user._id,
//           due_at: { $lte: new Date() }, // Find tasks where due_at is less than or equal to current date
//           toBeReminded: true,
//           completed: false
//         });

//         let overdueAmount = overdueTasks.length; // More efficient way to count overdue tasks
//         let taskList = "";

//         for (const task of overdueTasks) {
//           taskList += `${overdueAmount}. ${task.description}.\n`; // Use newline for better email formatting
//           task.completed = true;
//           await task.save();
//         }
//         if (overdueAmount > 0) {
//           const mailOptions = {
//             from: {address:process.env.USER}, // Replace with your sender email
//             to: user.email,
//             subject: `${overdueAmount} Tasks Overdue | TaskApp`,
//             text: `${user.name}, you have ${overdueAmount} tasks that are due for today. Make sure you get them done. ${taskList}`
//           };

//           transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//               console.error(error);
//             } else {
//               console.log("Email sent: ", info.response);
//             }
//           });
//         }
//       }

//       console.log("Ran cron for overdue tasks");
//     } catch (error) {
//       console.error("Error checking overdue tasks:", error);
//     }
//   });

// module.exports = checkOverdue;
