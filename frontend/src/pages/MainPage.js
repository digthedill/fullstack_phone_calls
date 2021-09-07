import { useState } from "react"
import { Grid } from "@material-ui/core"
import styled from "styled-components"

import ContactList from "../components/Contacts/ContactList"
import CreateContact from "../components/Contacts/CreateContact"
import Checkout from "../components/Checkout"
import CallerInfo from "../components/CallerInfo"

const MainPage = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [initiatePay, setInitiatePay] = useState({
    start: false,
    contact: null,
  })

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          {initiatePay.start ? (
            <div className="checkout-and-info">
              <CallerInfo
                cancelPay={setInitiatePay}
                paymentSuccess={paymentSuccess}
                contactName={initiatePay.contact.contactName}
              />
              {paymentSuccess ? (
                <p>Call the person</p>
              ) : (
                <Checkout
                  canclePay={setInitiatePay}
                  setPaymentSuccess={setPaymentSuccess}
                />
              )}
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
