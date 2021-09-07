import axios from "axios"
import { useState } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { Button } from "@material-ui/core"
import styled from "styled-components"
const CardForm = () => {
  const [isProccessing, setProccessing] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  const options = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        letterSpacing: "0.05em",
        "::placeholder": {
          color: "#757575",
        },
      },
      invalid: {
        color: "#9e2146",
      },
      complete: {
        color: "#4caf50",
      },
    },
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setProccessing(true)
    if (!stripe || !elements) {
      return
    }
    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    })

    const { data: clientSecret } = await axios.post(
      "http://localhost:4000/create-payment-intent",
      {
        payload,
      }
    )
    if (clientSecret) {
      setProccessing(false)
      console.log(clientSecret)
    }
    const confirmCardPayment = await stripe.confirmCardPayment(
      clientSecret.clientSecret,
      {
        payment_method: payload.paymentMethod.id,
      }
    )
    // now need to begin the twilio call
    console.log(confirmCardPayment)
  }

  return (
    <Container>
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

export default CardForm
