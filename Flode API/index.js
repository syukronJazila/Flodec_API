// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

import {initializeApp, applicationDefault } from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging";
import express, { json } from "express";
import cors from "cors";


process.env.GOOGLE_APPLICATION_CREDENTIALS;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});


initializeApp({
  credential: applicationDefault(),
  projectId: 'flodec-p24s',
});

app.post("/send", function (req, res) {
  const receivedToken = req.body.fcmToken;
  
  const message = {
    notification: {
      title: "Flodec",
      body: 'Hujan deras terjadi di Jl. Gaperta Ujung, 10 menit lagi akan banjir nih'
    },
    token: "d3HyBNn3Tf6F9Z6v2jJYNZ:APA91bHN6qm64nxBKtg5xp_ZPKrol649kImisNJ2_idCG0BKXtPPstw4mWnTX5S__0wgrwU8wP6IqI9aOjDqHKwe-iYLHHgk12BebV_afI6hN_VJUY86Apef2KkW0jJ0mdXV0bTEYuKB",
  };
  
  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({
        message: "Successfully sent message",
        token: "d3HyBNn3Tf6F9Z6v2jJYNZ:APA91bHN6qm64nxBKtg5xp_ZPKrol649kImisNJ2_idCG0BKXtPPstw4mWnTX5S__0wgrwU8wP6IqI9aOjDqHKwe-iYLHHgk12BebV_afI6hN_VJUY86Apef2KkW0jJ0mdXV0bTEYuKB",
      });
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
      console.log("Error sending message:", error);
    });
  
  
});

app.listen(3030, function () {
  console.log("Server started on port 3030");
});
