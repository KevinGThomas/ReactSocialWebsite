const admin = require("firebase-admin")

admin.initializeApp({
  credential: admin.credential.cert(require("./admin.json")),
  storageBucket: "socialapp-2b1be.appspot.com"
})

const db = admin.firestore()
//const rtdb = admin.database()

module.exports = { admin, db }
//module.exports = { admin, db, rtdb }

//{credential: admin.credential.cert(require("../../keys/admin.json"))}
