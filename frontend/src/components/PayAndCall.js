import { useState, useEffect } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { Button, Typography } from "@material-ui/core"
import styled from "styled-components"

import options from "../utils/stripeEleOptions"

import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../config/firebase"

// bloated api calls
import makeTwilioCall from "../utils/makeTwilioCall"
import handlePayment from "../utils/handlePayment"

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

  // payment success toggles credit card view and attempting call view
  return !paymentSuccess ? (
    <Container>
      {cardError && (
        <Typography variant="caption" color="secondary">
          {cardError}
        </Typography>
      )}
      <form
        onSubmit={(event) =>
          handlePayment(
            event,
            setProccessing,
            stripe,
            elements,
            CardElement,
            setCardError,
            setPaymentSuccess,
            makeTwilioCall,
            setCalling,
            phoneNumber,
            user,
            setCallComplete,
            setCallError
          )
        }
      >
        <CardElement options={options} />
        <Button
          variant="outlined"
          type="submit"
          disabled={!stripe || isProccessing}
        >
          Pay 50¢ and Call
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
