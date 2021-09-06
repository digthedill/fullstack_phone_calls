import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { Button, Typography } from "@material-ui/core"
import styled from "styled-components"
const CardForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const options = {
    style: {
      base: {
        fontSize: "18px",
        color: "#424770",
        letterSpacing: "0.05em",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
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
        <label>
          <Typography variant="p">Card details</Typography>
          <CardElement
            options={options}
            onReady={() => {
              console.log("CardElement [ready]")
            }}
            onChange={(event) => {
              console.log("CardElement [change]", event)
            }}
            onBlur={() => {
              console.log("CardElement [blur]")
            }}
            onFocus={() => {
              console.log("CardElement [focus]")
            }}
          />
        </label>

        <Button variant="outlined" type="submit" disabled={!stripe}>
          Pay
        </Button>
      </form>
    </Container>
  )
}

const Container = styled.div`
  max-width: 600px;
`

export default CardForm
