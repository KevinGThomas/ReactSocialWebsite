import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ
} from "../types"
import axios from "axios"

const firebase = require("firebase")

//Forgot Password
export const forgotPassword = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI })
  axios
    .post("/forgot", userData)
    .then(res => {
      //dispatch(getUserData())
      dispatch({ type: CLEAR_ERRORS })
      alert("Password reset mail sent successfully")
      history.push("/login")
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

//Login
export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI })
  axios
    .post("/login", userData)
    .then(res => {
      setAuthorizationHeader(res.data.token)
      dispatch(getUserData())
      dispatch({ type: CLEAR_ERRORS })
      history.push("/")
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

//Signup
export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI })
  axios
    .post("/signup", newUserData)
    .then(res => {
      //setAuthorizationHeader(res.data.token)
      //dispatch(getUserData())
      dispatch({ type: CLEAR_ERRORS })
      alert("Signup successful, please verify your email")
      history.push("/login")
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

//Logout
export const logoutUser = () => dispatch => {
  //firebase.auth().onDisconnect()
  localStorage.removeItem("FBIdToken")
  localStorage.removeItem("UserId")
  localStorage.removeItem("imageUrl")
  localStorage.removeItem("handle")
  delete axios.defaults.headers.common["Authorization"]

  dispatch({ type: SET_UNAUTHENTICATED })
}

//User data
export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER })
  axios
    .get("/user")
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      })
      console.log(res.data)
      const firestoreDb = firebase.firestore()
      const oldRealTimeDb = firebase.database()

      const usersRef = firestoreDb.collection("users") // Get a reference to the Users collection;
      const onlineRef = oldRealTimeDb.ref(".info/connected") // Get a reference to the list of connections

      onlineRef.on("value", snapshot => {
        oldRealTimeDb
          //.ref(`/status/${res.data.credentials.userId}`)
          .ref(`/status/${res.data.credentials.handle}`)
          .onDisconnect() // Set up the disconnect hook
          .set("offline") // The value to be set for this key when the client disconnects
          .then(() => {
            // Set the Firestore User's online status to true
            usersRef.doc(res.data.credentials.handle).set(
              {
                online: true
              },
              { merge: true }
            )

            // Let's also create a key in our real-time database
            // The value is set to 'online'
            oldRealTimeDb
              //.ref(`/status/${res.data.credentials.userId}`)
              .ref(`/status/${res.data.credentials.handle}`)
              .set("online")
          })
      })

      onlineRef.on("value", snapshot => {
        // Set the Firestore User's online status to true
        usersRef.doc(res.data.credentials.handle).set(
          {
            online: true
          },
          { merge: true }
        )

        oldRealTimeDb
          .ref(`/status/${res.data.credentials.handle}`)
          .set("online")
      })
    })
    .catch(err => console.log(err))
}

//Upload user Image
export const uploadImage = formData => dispatch => {
  dispatch({ type: LOADING_USER })
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData())
    })
    .catch(err => console.log(err))
}

//Update user details
export const editUserDetails = userDetails => dispatch => {
  dispatch({ type: LOADING_USER })
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData())
    })
    .catch(err => console.log(err))
}

//Mark notificiations read
export const markNotificationsRead = notificationIds => dispatch => {
  axios
    .post("/notifications", notificationIds)
    .then(res => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ
      })
    })
    .catch(err => console.log(err))
}

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`
  localStorage.setItem("FBIdToken", FBIdToken)
  // localStorage.setItem("UserId", userid)
  // localStorage.setItem("imageUrl", imageUrl)
  // localStorage.setItem("handle", handle)

  axios.defaults.headers.common["Authorization"] = FBIdToken
}
