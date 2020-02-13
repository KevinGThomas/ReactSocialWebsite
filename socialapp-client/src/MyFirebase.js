import firebase from "firebase"

const config = {
  apiKey: "AIzaSyCQ8qtkqRnXFCR2ebDiLroz7bbcAYuv9zc",
  authDomain: "socialapp-2b1be.firebaseapp.com",
  databaseURL: "https://socialapp-2b1be.firebaseio.com",
  projectId: "socialapp-2b1be",
  storageBucket: "socialapp-2b1be.appspot.com",
  messagingSenderId: "225918259567",
  appId: "1:225918259567:web:cd53f4bf9681568f65989a"

  // apiKey: "AIzaSyCXRI5OEMHROLTa28zpTqHuq4UpFKvtZog",
  // authDomain: "chatapp-c4e69.firebaseapp.com",
  // databaseURL: "https://chatapp-c4e69.firebaseio.com",
  // projectId: "chatapp-c4e69",
  // storageBucket: "chatapp-c4e69.appspot.com",
  // messagingSenderId: "519811627004",
  // appId: "1:519811627004:web:7968aeaa298f34f607e479"

  // apiKey: 'AIzaSyAC9ZSyvTxU2o5W0jcL0hDvzS4utLuicE8',
  // authDomain: 'flutterchatdemo.firebaseapp.com',
  // databaseURL: 'https://flutterchatdemo.firebaseio.com',
  // projectId: 'flutterchatdemo',
  // storageBucket: 'flutterchatdemo.appspot.com',
  // messagingSenderId: '347976604232'
}
firebase.initializeApp(config)
firebase.firestore().settings({
  timestampsInSnapshots: true
})

export const myFirebase = firebase
export const myFirestore = firebase.firestore()
export const myStorage = firebase.storage()
