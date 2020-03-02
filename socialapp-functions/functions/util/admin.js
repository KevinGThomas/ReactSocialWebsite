const admin = require("firebase-admin")
//const firebase = require("firebase")

admin.initializeApp({
  credential: admin.credential.cert(require("./admin.json")),
  storageBucket: "socialapp-2b1be.appspot.com"
})

const db = admin.firestore()

module.exports = { admin, db }

//{credential: admin.credential.cert(require("../../keys/admin.json"))}
