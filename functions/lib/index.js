"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = void 0;
const functions = require("firebase-functions");
// The Firebase Admin SDK to access Firestore.
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
require("firebase-admin");
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.helloWorld = functions.https.onRequest((request, response) => {
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
            subject: "This is Sending Email using Node.js",
            text: "That was easy!",
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email sent: " + info.response);
            }
        });
    }
    catch (error) {
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
// Listen for changes in all documents in the 'users' collection
exports.newUserRegistration = functions.firestore
    .document("User/{userId}")
    .onCreate((snapshot, context) => {
    console.log(snapshot.id, snapshot.data());
    // admin.database().ref("users").once("value", (res: any) => {
    //   res.forEach((element: any) => {
    //     console.log(element.val());
    const password = Array(10)
        .fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
        .map((x) => {
        return x[Math.floor(Math.random() * x.length)];
    })
        .join("");
    console.log(snapshot.data().Email, password);
    return admin
        .auth()
        .createUser({
        email: snapshot.data().Email,
        emailVerified: false,
        password: password,
    })
        .then(async (res) => {
        console.log(res.uid);
        return await admin
            .firestore()
            .collection("users")
            .doc(res.uid)
            .set(Object.assign(snapshot.data(), { uid: res.uid }))
            .then(() => {
            sendRegEmail(snapshot.data(), password);
            admin.firestore().collection("User").doc(snapshot.id).delete();
        }).catch((er) => console.log(er.message));
    });
    // });
    // });
});
/**
 * @params @toEmail & @password are used to send emails to new registered users.
 */
function sendRegEmail(userObj, password) {
    /**
     * Beginnings of documentation...
     */
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
            to: userObj.Email,
            subject: "Welcome CodeTribe Time Sheet",
            text: "Hi " + userObj.Name,
            html: "Hi " + userObj.Name +
                "<p>Welcome to codeTribe Time sheet,</p>" +
                "<p>This is the platform will be used to</p>" +
                " <p>track your attendence </p>" +
                "</br>" +
                "<p>Use this details To login</p>" +
                "</br>" +
                "<p>Email:</p>" +
                userObj.Email +
                "</br>" +
                "<p>Default Password </p>" +
                password +
                "</br></br>" +
                "<h1>This password will be used only once</h1>" +
                "</br>" +
                "Happy Coding," +
                "</br>" +
                "Digital Time frame Team ",
        };
        return transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email sent: " + info.response);
            }
        });
    }
    catch (error) {
        console.log(error.message);
    }
}
//# sourceMappingURL=index.js.map