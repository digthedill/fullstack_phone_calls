import { Typography } from "@material-ui/core"
import styled from "styled-components"
const MainApp = ({ user }) => {
  return (
    <Container>
      <Typography variant="h4" color="primary">
        {user && user.displayName} Dashboard
      </Typography>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 3rem;
`
export default MainApp
