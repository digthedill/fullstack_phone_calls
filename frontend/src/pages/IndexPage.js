import React from "react"
import Typography from "@material-ui/core/Typography"
import styled from "styled-components"
import SignUpForm from "../components/SignUpForm"

const IndexPage = () => {
  return (
    <Container>
      <Typography variant="h4">Join The Communication</Typography>
      <Typography variant="caption">
        At this time we can only call U.S. numbers
      </Typography>
      <SignUpForm />
    </Container>
  )
}

export default IndexPage

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  img {
    max-width: 250px;
    margin: 0;
  }
  /* 
  @media (max-width: 700px) {
    margin-top: 6rem;
  } */
`
