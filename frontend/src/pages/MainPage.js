import { useState, useEffect } from "react"
import { Grid } from "@material-ui/core"
import styled from "styled-components"

import ContactList from "../components/ContactList"
import CreateContact from "../components/CreateContact"
import PayAndCall from "../components/PayAndCall"
import CallerInfo from "../components/CallerInfo"
import SuccessOverlay from "../components/SuccessOverlay"

const MainPage = () => {
  const [callComplete, setCallComplete] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [initiatePay, setInitiatePay] = useState({
    start: false,
    contact: null,
  })
  // reset the payment method for each phone call
  useEffect(() => {
    setPaymentSuccess(false)
  }, [initiatePay.contact])

  useEffect(() => {
    setPaymentSuccess(false)
    setInitiatePay({
      start: false,
      contact: null,
    })
  }, [callComplete])

  return (
    <Container>
      {callComplete && (
        <SuccessOverlay show={callComplete} setShow={setCallComplete} />
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          {initiatePay.start ? (
            <div className="checkout-and-info">
              <CallerInfo
                cancelPay={setInitiatePay}
                paymentSuccess={paymentSuccess}
                contactName={initiatePay.contact.contactName}
              />
              <PayAndCall
                paymentSuccess={paymentSuccess}
                phoneNumber={initiatePay.contact.contactNumber}
                canclePay={setInitiatePay}
                setPaymentSuccess={setPaymentSuccess}
                setCallComplete={setCallComplete}
              />
            </div>
          ) : (
            <CreateContact />
          )}
        </Grid>
        <Grid item xs={12} md={7}>
          <ContactList initPay={setInitiatePay} />
        </Grid>
      </Grid>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 3rem;
  .checkout-and-info {
    margin-bottom: 1rem;
  }
`

export default MainPage
