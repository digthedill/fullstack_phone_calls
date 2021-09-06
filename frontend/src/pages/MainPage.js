import { Typography } from "@material-ui/core"
import styled from "styled-components"
import Checkout from "../components/Checkout"
import Contacts from "../components/Contacts/"
const MainApp = ({ user }) => {
  return (
    <Container>
      <Typography variant="h4" color="primary">
        {user && user.displayName} Dashboard
      </Typography>
      <br />

      <Contacts />
    </Container>
  )
}

const Container = styled.div`
  margin-top: 3rem;
`
export default MainApp
