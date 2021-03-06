const functions = require("firebase-functions")
// const Firestore = require('@google-cloud/firestore');

// const firestore = new Firestore();

const cors = require("cors")

const {
  getAllScreams,
  postOneScream,
  getScream,
  commentOnScream,
  likeScream,
  unlikeScream,
  deleteScream,
  getUsers
} = require("./handlers/screams")
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead,
  forgotPassword
} = require("./handlers/users")

const express = require("express")
const app = express()
const { db } = require("./util/admin")

app.use(cors())

const FBAuth = require("./util/fbAuth")

//Scream routes
app.get("/screams", getAllScreams)
app.post("/scream", FBAuth, postOneScream)
app.get("/scream/:screamId", getScream)
app.delete("/scream/:screamId", FBAuth, deleteScream)
app.get("/scream/:screamId/like", FBAuth, likeScream)
app.get("/scream/:screamId/unlike", FBAuth, unlikeScream)
app.post("/scream/:screamId/comment", FBAuth, commentOnScream)
app.post("/users", getUsers)

//Users routes
app.post("/signup", signup)
app.post("/login", login)
app.post("/user/image", FBAuth, uploadImage)
app.post("/user", FBAuth, addUserDetails)
app.get("/user", FBAuth, getAuthenticatedUser)
app.get("/user/:handle", getUserDetails)
app.post("/notifications", FBAuth, markNotificationsRead)
app.post("/forgot", forgotPassword)

exports.api = functions.https.onRequest(app)

exports.onUserStatusChanged = functions.database
  .ref("/status/{userId}")

  .onUpdate((change, context) => {
    const usersRef = db.collection("users")
    return change.after.ref
      .once("value")
      .then(statusSnap => change.after.val())
      .then(status => {
        if (status == "offline") {
          //console.log(context.params)
          usersRef.doc(context.params.userId).set(
            {
              online: false,
              last_active: Date.now()
            },
            { merge: true }
          )
        }
      })
  })

exports.createNotificationOnLike = functions.firestore
  .document("likes/{id}")
  .onCreate(snapshot => {
    return db
      .doc(`screams/${snapshot.data().screamId}`)
      .get()
      .then(doc => {
        if (doc.exists && doc.data().userHandle != snapshot.userHandle) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "like",
            read: false,
            screamId: doc.id
          })
        }
      })
      .catch(err => {
        console.error(err)
      })
  })

exports.deleteNotificationOnUnlike = functions.firestore
  .document("likes/{id}")
  .onDelete(snapshot => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch(err => {
        console.error(err)
      })
  })

exports.createNotificationOnComment = functions.firestore
  .document("comments/{id}")
  .onCreate(snapshot => {
    return db
      .doc(`screams/${snapshot.data().screamId}`)
      .get()
      .then(doc => {
        if (doc.exists && doc.data().userHandle != snapshot.userHandle) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "comment",
            read: false,
            screamId: doc.id
          })
        }
      })
      .catch(err => {
        console.error(err)
      })
  })

exports.onUserImageChange = functions.firestore
  .document("/users/{userId}")
  .onUpdate(change => {
    if (change.before.data().imageUrl != change.after.imageUrl) {
      const batch = db.batch()
      return db
        .collection("screams")
        .where("userHandle", "==", change.before.data().handle)
        .get()
        .then(data => {
          data.forEach(doc => {
            const scream = db.doc(`/screams/${doc.id}`)
            batch.update(scream, { userImage: change.after.data().imageUrl })
          })
          return batch.commit()
        })
    } else return true
  })

exports.onScreamDelete = functions.firestore
  .document("/screams/{screamId")
  .onDelete((snapshot, context) => {
    const screamId = context.params.screamId
    const batch = db.batch()
    return db
      .collection("comments")
      .where("screamId", "==", screamId)
      .get()
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/comments/${doc.id}`))
        })
        return db
          .collection("likes")
          .where("screamId", "==", screamId)
          .get()
      })
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/likes/${doc.id}`))
        })
        return db
          .collection("notifications")
          .where("screamId", "==", screamId)
          .get()
      })
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/notifications/${doc.id}`))
        })
        return batch.commit()
      })
      .catch(err => console.err())
  })
