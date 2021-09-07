import axios from "axios"
import { useState, useEffect } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { Button, Typography } from "@material-ui/core"
import styled from "styled-components"

import options from "../utils/stripeEleOptions"

import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../config/firebase"

const PayAndCall = ({
  setPaymentSuccess,
  phoneNumber,
  paymentSuccess,
  setCallComplete,
}) => {
  const [user] = useAuthState(auth)
  // stripe state
  const [isProccessing, setProccessing] = useState(false)
  const [cardError, setCardError] = useState(null)
  const stripe = useStripe()
  const elements = useElements()

  // twilio state
  const [calling, setCalling] = useState(false)
  const [callError, setCallError] = useState(null)

  // stripe error reset
  useEffect(() => {
    const subscribe = setTimeout(() => {
      if (cardError) {
        setCardError(null)
      }
    }, 5000)
    return () => subscribe
  }, [setCardError, cardError])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setProccessing(true)
    // if it didn't load exit function
    if (!stripe || !elements) {
      return
    }
    // get card details from stripe element componenet
    const card = elements.getElement(CardElement)
    const payload = await stripe.createPaymentMethod({
      type: "card",
      card,
    })

    // begin payment authorization
    try {
      // get secret from backend
      const { data: clientSecret } = await axios.post(
        "/create-payment-intent",
        {
          payload,
        }
      )
      // confirmation from stripe
      const confirmCardPayment = await stripe.confirmCardPayment(
        clientSecret.clientSecret,
        {
          payment_method: payload.paymentMethod.id,
        }
      )
      // handle card decline errors
      if (confirmCardPayment.error) {
        setCardError(`Card error: ${confirmCardPayment.error.decline_code}`)
      }
      // proceed with successful payment
      if (confirmCardPayment.paymentIntent.status === "succeeded") {
        setPaymentSuccess(true)
        await makeTwilioCall()
      }
      setProccessing(false) //reset the card element
    } catch (err) {
      setPaymentSuccess(false)
      setCardError("Please enter a valid card number")
      setProccessing(false)
      setCallError(null)
    }
  }

  const makeTwilioCall = async () => {
    setCalling(true)
    // make call to server with recipient phone number
    try {
      axios
        .post("/call", {
          cell_number: phoneNumber,
          uid: user.uid,
        })
        .then((res) => {
          // successful call to phone number
          if (res.data.callId) {
            setCallComplete(true)
            setCalling(false)
          }
        })
        .catch((err) => {
          console.log(err.message)
          setCallError("Invalid phone number")
        })
    } catch (err) {
      // extra error catching
      console.log(err.message)
      setCallError("Invalid phone number")
    }
  }
  // payment success toggles credit card view and attempting call view
  return !paymentSuccess ? (
    <Container>
      {cardError && (
        <Typography variant="caption" color="secondary">
          {cardError}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <CardElement options={options} />
        <Button
          variant="outlined"
          type="submit"
          disabled={!stripe || isProccessing}
        >
          Pay 50¢
        </Button>
      </form>
    </Container>
  ) : (
    <Container>
      {calling && !callError ? (
        <Typography variant="h4">"Placing Call. . . "</Typography>
      ) : null}
      {callError && (
        <Typography variant="caption" color="secondary">
          {callError}
        </Typography>
      )}
    </Container>
  )
}

const Container = styled.div`
  margin-top: 1rem;
  form {
    button {
      width: 100%;
      margin-top: 1rem;
    }
  }
`

export default PayAndCall
