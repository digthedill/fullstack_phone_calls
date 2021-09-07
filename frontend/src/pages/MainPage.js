import { useState } from "react"
import { Grid } from "@material-ui/core"
import styled from "styled-components"

import ContactList from "../components/Contacts/ContactList"
import CreateContact from "../components/Contacts/CreateContact"
import Checkout from "../components/Checkout"

const MainPage = () => {
  const [initiateCall, setInitiateCall] = useState(false)
  // on initiate call -> change create contact to Call Contact Componenet
  return (
    <Container>
      <Grid container spacing="5">
        <Grid item xs={12} sm={6} md={4}>
          <CreateContact />
          {initiateCall && <Checkout cancleCall={setInitiateCall} />}
        </Grid>
        <Grid item xs={12} md={7}>
          <ContactList initCall={setInitiateCall} />
        </Grid>
      </Grid>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 3rem;
`

export default MainPage
