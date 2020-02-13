import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCXRI5OEMHROLTa28zpTqHuq4UpFKvtZog",
    authDomain: "chatapp-c4e69.firebaseapp.com",
    databaseURL: "https://chatapp-c4e69.firebaseio.com",
    projectId: "chatapp-c4e69",
    storageBucket: "chatapp-c4e69.appspot.com",
    messagingSenderId: "519811627004",
    appId: "1:519811627004:web:7968aeaa298f34f607e479"
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
