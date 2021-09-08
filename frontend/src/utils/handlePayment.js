import axios from "axios"
const handleSubmit = async (
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
) => {
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
    const { data: clientSecret } = await axios.post("/create-payment-intent", {
      payload,
    })
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
      await makeTwilioCall(
        setCalling,
        phoneNumber,
        user,
        setCallComplete,
        setCallError
      )
    }
    setProccessing(false) //reset the card element
  } catch (err) {
    setPaymentSuccess(false)
    setCardError("Please enter a valid card number")
    setProccessing(false)
    setCallError(null)
  }
}

export default handleSubmit
