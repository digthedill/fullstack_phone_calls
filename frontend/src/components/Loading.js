import React from "react"
import styled from "styled-components"
import CircularProgress from "@material-ui/core/CircularProgress"
import { Typography } from "@material-ui/core"

// center on screen

const Loading = () => {
  return (
    <Container>
      <div>
        <Typography variant="h3">Loading</Typography>
        <CircularProgress />
      </div>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  height: 100%;
  left: 0;
  right: 0;

  margin: 0 auto;

  div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h3 {
      letter-spacing: 0.06em;
    }
  }
`

export default Loading
