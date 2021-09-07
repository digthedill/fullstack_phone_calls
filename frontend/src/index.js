import React from "react"
import ReactDOM from "react-dom"
import dotenv from "dotenv"
import "./index.css"
import App from "./App"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

dotenv.config()

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
  document.getElementById("root")
)
