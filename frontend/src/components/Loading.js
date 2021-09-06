import React from "react"
import { Typography } from "@material-ui/core"
import styled from "styled-components"

// center on screen

const Loading = () => {
  return (
    <Container>
      <div>
        <Typography variant="h1">Loading . . .</Typography>
      </div>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  width: 100%;
  height: 100%;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: -35px -35px 0 0;
  }
`

export default Loading
