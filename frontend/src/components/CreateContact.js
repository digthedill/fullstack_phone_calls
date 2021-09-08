import { useState } from "react"
import firebase from "firebase"
import { useAuthState } from "react-firebase-hooks/auth"

import { Button, TextField } from "@material-ui/core"
import MuiPhoneNumber from "material-ui-phone-number"
import styled from "styled-components"

import { formatToDatabase } from "../utils/formatPhoneNumber"
import { db, auth } from "../config/firebase"

const CreateContact = () => {
  const [user] = useAuthState(auth)
  const [contactName, setContactName] = useState("")
  const [contactNumber, setContactNumber] = useState("")

  const createNewContact = (e) => {
    e.preventDefault()
    const payload = {
      uid: user.uid,
      contactName,
      contactNumber: formatToDatabase(contactNumber),
      createdAt: firebase.firestore.Timestamp.now(),
    }
    db.collection("contacts")
      .add(payload)
      .then(() => {
        //use docRef as a var to get the doc id
        setContactName("")
        setContactNumber("")
      })
      .catch((error) => {
        console.error("Error writing document: ", error)
      })
  }

  return (
    <FormContainer onSubmit={createNewContact}>
      <TextField
        id="contact-name"
        label="New Contact"
        value={contactName}
        required
        onChange={(e) => setContactName(e.target.value)}
      />
      <MuiPhoneNumber
        value={contactNumber}
        onChange={(e) => setContactNumber(e)}
        defaultCountry={"us"}
        required
      />
      <Button type="submit" variant="outlined">
        Add to Contacts
      </Button>
    </FormContainer>
  )
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;

  input {
    margin: 0.8rem 0;
  }
  button {
    margin: 0.8rem 0;
    width: min-content;
  }
`

export default CreateContact
