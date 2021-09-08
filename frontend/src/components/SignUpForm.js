import React from "react"
import firebase from "firebase"
import { StyledFirebaseAuth } from "react-firebaseui"

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/main",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
  ],
}

const SignUpForm = () => {
  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  )
}

export default SignUpForm
