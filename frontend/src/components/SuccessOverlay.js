import { useRef } from "react"
import styled from "styled-components"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import useOutsideClick from "../hooks/useOutsideClick"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"

const SuccessOverlay = ({ show, setShow }) => {
  const ref = useRef()
  useOutsideClick(ref, () => {
    if (show) {
      setShow(false)
    }
  })
  return (
    <Wrapper>
      <Container>
        <Overlay ref={ref}>
          <div className="exit-button">
            <IconButton onClick={() => setShow(false)}>
              <ExitToAppIcon />
            </IconButton>
          </div>
          <div className="message">
            <Typography variant="h3">Call Success!</Typography>
          </div>
        </Overlay>
      </Container>
    </Wrapper>
  )
}

const Overlay = styled.div`
  background: #2196f3;
  backdrop-filter: opacity(85);
  color: #f4f4f4f4;
  max-width: 300px;
  max-height: 150px;
  box-shadow: 2px 2px 2px 1px #334;
  padding: 1rem;
  padding-bottom: 3rem;
  border-radius: 5px;

  h3 {
    font-weight: 200;
  }

  .exit-button {
    text-align: right;
  }
  .message {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  backdrop-filter: blur(3px);
  z-index: 1;
`

export default SuccessOverlay
