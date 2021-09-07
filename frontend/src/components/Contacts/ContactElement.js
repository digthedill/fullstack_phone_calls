import { Typography, Button } from "@material-ui/core"
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline"
import PhoneIcon from "@material-ui/icons/Phone"
import styled from "styled-components"

import { formatFromDatabase } from "../../utils/formatPhoneNumber"

const ContactElement = ({ contact, db, initCall }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your contact?")) {
      db.collection("contacts")
        .doc(contact.docId)
        .delete()
        .then(() => console.log("Contact Deleted!"))
        .catch((e) => console.error(e))
    }
  }

  const handleCall = () => {
    initCall(true)
  }
  return (
    <Wrapper>
      <Button color="secondary" className="trash-logo" onClick={handleDelete}>
        <DeleteOutlineIcon />
      </Button>

      <Container>
        <div className="contact-info">
          <Typography variant="body1">
            <strong> {contact.contactName}</strong>
          </Typography>
          <Typography variant="body1" className="phone-number">
            {formatFromDatabase(contact.contactNumber)}
          </Typography>
        </div>
        <div className="contact-action">
          <Button color="primary" onClick={handleCall}>
            <PhoneIcon />
          </Button>
        </div>
      </Container>
    </Wrapper>
  )
}

const Container = styled.div`
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 1.6px 1.6px 1px 1px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 1rem 0 1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
  width: 100%;

  .phone-number {
    padding: 0 1rem;
  }

  .contact-info {
    display: flex;
    align-items: center;
    @media (max-width: 500px) {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`

export default ContactElement
