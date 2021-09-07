import { IconButton, Typography } from "@material-ui/core"
import CancelIcon from "@material-ui/icons/Cancel"
import styled from "styled-components"

const CallerInfo = ({ paymentSuccess, cancelPay, contactName }) => {
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel your call?")) {
      cancelPay({
        start: false,
        contact: null,
      })
    }
  }
  const message = paymentSuccess ? (
    <Typography variant="body1">
      Ready to call <strong>{contactName}</strong>
    </Typography>
  ) : (
    <Typography variant="body1">
      Please complete the payment to call <strong>{contactName}</strong>
    </Typography>
  )

  return (
    <Container>
      <div>
        <IconButton size="small" color="secondary" onClick={handleCancel}>
          <CancelIcon fontSize="small" />
        </IconButton>
      </div>
      {message}
    </Container>
  )
}

const Container = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;

  div {
    text-align: right;
  }
`
export default CallerInfo
