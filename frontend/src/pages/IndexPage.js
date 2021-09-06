import React from "react"
import styled from "styled-components"
import SignUpForm from "../components/SignUpForm"

const IndexPage = () => {
  return (
    <Container>
      <h3>Join The Communication</h3>
      <SignUpForm />
    </Container>
  )
}

export default IndexPage

const Container = styled.div`
  width: 100%;
  height: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 14rem;
  /* 
  @media (max-width: 700px) {
    margin-top: 6rem;
  } */
`
