import * as functions from "firebase-functions";
// The Firebase Admin SDK to access Firestore.
import nodemailer = require("nodemailer");
import admin = require("firebase-admin");
require("firebase-admin");
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "preciousthobile99@gmail.com",
        pass: "jfwmfmhscjihcdub",
      },
    });

    const mailOptions = {
      from: "preciousthobile99@gmail.com",
      to: "thobilethombeni@gmail.com",
      subject: "Sending Email using Node.js",
      text: "That was easy!",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error: any) {
    console.log(error.message);
  }
  // admin.database().ref("users").once("value", (res: any) => {
  //   res.forEach((element: any) => {
  //     console.log(element.val());
  //     admin.auth().createUser({
  //       email: element.val().email,
  //       emailVerified: false,
  //       password: data.password,
  //       displayName: data.displayName,
  //       disabled: false,
  //     });
  //   });
  // });

  // functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});