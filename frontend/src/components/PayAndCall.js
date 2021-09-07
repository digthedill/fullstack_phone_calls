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
  callComplete,
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
    if (!stripe || !elements) {
      return
    }
    const card = elements.getElement(CardElement)
    const payload = await stripe.createPaymentMethod({
      type: "card",
      card,
    })
    try {
      const { data: clientSecret } = await axios.post(
        "http://localhost:4000/create-payment-intent",
        {
          payload,
        }
      )

      const confirmCardPayment = await stripe.confirmCardPayment(
        clientSecret.clientSecret,
        {
          payment_method: payload.paymentMethod.id,
        }
      )
      if (confirmCardPayment.error) {
        setCardError(`Card error: ${confirmCardPayment.error.decline_code}`)
      }
      if (confirmCardPayment.paymentIntent.status === "succeeded") {
        setPaymentSuccess(true)
        await makeTwilioCall()
      }
      setProccessing(false)
    } catch (err) {
      setPaymentSuccess(false)
      setCardError("Please enter a valid card number")
      setProccessing(false)
      setCallError(null)
    }
  }

  const makeTwilioCall = async () => {
    setCalling(true)
    try {
      axios
        .post("http://localhost:4000/call", {
          cell_number: phoneNumber,
          uid: user.uid,
        })
        .then((res) => {
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
      console.log(err.message)
      setCallError("Invalid phone number")
    }
  }

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
        <Typography>"Placing Call. . . "</Typography>
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
