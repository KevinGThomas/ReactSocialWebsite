import firebase from "firebase"

import { myFirebase } from "./MyFirebase"
import axios from "axios"

navigator.serviceWorker.register("/my-sw.js").then(registration => {
  firebase.messaging().useServiceWorker(registration)
})

const messaging = firebase.messaging()

export const askForPermissionToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging()
    await messaging.requestPermission()
    const token = await messaging.getToken()
    //console.log("Token: ", token)
    const fcmUrl =
      "https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/all"
    const fcmKey =
      "AAAANJnHEW8:APA91bEK0jeLmHAsPhAlckOg8WEBX6jn-Cp1UjodE0QlOvS4WtYAPhVVCeDH2I1QNhchwffYuvi-y0CKoma4nkUflAseyMi-wV08S6gCHpIgUZgNIir7jMmlo0V-gMu0TGia1KTEDjmD"
    function buildRequest() {
      return {
        url: fcmUrl,
        method: "post",
        headers: {
          Authorization: `key=${fcmKey}`
        }
      }
    }

    const request = buildRequest()
    axios(request)
      .then(r => {
        console.log(r)
      })
      .catch(error => {
        console.log(error)
      })
    return token
  } catch (error) {
    console.error(error)
  }
}

export const sendNotifications = async (notification_body) => {
  try {
    const fcmUrl = "https://fcm.googleapis.com/fcm/send"
    const fcmKey =
      "AAAANJnHEW8:APA91bEK0jeLmHAsPhAlckOg8WEBX6jn-Cp1UjodE0QlOvS4WtYAPhVVCeDH2I1QNhchwffYuvi-y0CKoma4nkUflAseyMi-wV08S6gCHpIgUZgNIir7jMmlo0V-gMu0TGia1KTEDjmD"

    function buildNotification(data) {
      //const { name } = data
      return {
        notification: {
          title: "SocialApp",
          body: `${data}`,
          icon:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSXKo0-ro1DzFo1R-x7Tu_eWQPinzXONk_n1LJR-JjoguCrpr5q"
        },
        to: "/topics/all"
      }
    }

    function buildRequest(notification) {
      return {
        url: fcmUrl,
        method: "post",
        headers: {
          Authorization: `key=${fcmKey}`
        },
        data: notification
      }
    }

    // ref.child("test").on("child_added", snapshot => {
    //   console.log(snapshot.val())
    //   const notification = buildNotification(snapshot.val())
    //   sendNotification(notification)
    // })
    const notification = buildNotification(notification_body)
    console.log(notification)
    const request = buildRequest(notification)
    console.log(request)
    axios(request)
      .then(r => {
        console.log(r)
      })
      .catch(error => {
        console.log(error)
      })
  } catch (error) {
    console.error(error)
  }
}
