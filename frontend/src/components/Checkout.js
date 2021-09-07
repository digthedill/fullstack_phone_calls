import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { Button, Typography } from "@material-ui/core"
import styled from "styled-components"
const CardForm = () => {
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

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    })

    console.log("[PaymentMethod]", payload)

    // this is where I send the payload to stripe node server
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <CardElement options={options} />

        <Button variant="outlined" type="submit" disabled={!stripe}>
          Pay 25¢
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
