const functions = require('firebase-functions')
const admin = require('firebase-admin')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
admin.initializeApp();

const express = require('express');
const app = express();

app.get('/screams', (req, res) => {
  admin
    .firestore()
    .collection('screams')
    .get()
    .then(data => {
      let screams = []
      data.forEach(doc => {
        screams.push(doc.data())
      })
      return res.json(screams)
    })
    .catch(err => console.error(err))
});

app.post('/screams',((req, res) => {
  
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: admin.firestore.Timestamp.fromDate(new Date())
  }

  admin
    .firestore()
    .collection('screams')
    .add(newScream)
    .then(doc => {
      res.json({ message: `document ${doc.id}  created successfully` })
    })
    .catch(err => {
      res.sendStatus(500).json({ error: 'something went went wrong' })
      console.error(err)
    })
}))

exports.api = functions.https.onRequest(app);