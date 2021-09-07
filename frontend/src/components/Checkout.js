import axios from "axios"
import { useState, useEffect } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { Button, Typography } from "@material-ui/core"
import styled from "styled-components"

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

const CardForm = ({ setPaymentSuccess }) => {
  const [isProccessing, setProccessing] = useState(false)
  const [error, setError] = useState(null)
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    const subscribe = setTimeout(() => {
      if (error) {
        setError("")
      }
    }, 5000)

    return subscribe
  }, [setError, error])

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
        setError(`Card error: ${confirmCardPayment.error.decline_code}`)
      }
      if (confirmCardPayment.paymentIntent.status === "succeeded") {
        setPaymentSuccess(true)
      }

      setProccessing(false)
    } catch (err) {
      setError("Please enter a valid card number")
    }
  }

  return (
    <Container>
      {error && (
        <Typography variant="caption" color="secondary">
          {error}
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
