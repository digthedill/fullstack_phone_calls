import React from "react"
import styled from "styled-components"
import { Button, Grid, Typography } from "@material-ui/core"
import { logout } from "../config/firebase"

const Header = ({ user }) => {
  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h2">Phone A Friend</Typography>
        {user && (
          <Button variant="text" color="primary" onClick={() => logout()}>
            Logout
          </Button>
        )}
      </Grid>
    </Container>
  )
}

const Container = styled.header`
  padding: 2rem 0;
  border-bottom: 2px solid #0d47a1;
`
export default Header
