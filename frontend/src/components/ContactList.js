import { useEffect, useState } from "react"
import styled from "styled-components"
import { useAuthState } from "react-firebase-hooks/auth"
import { Typography } from "@material-ui/core"

import ContactElement from "./ContactElement"
import { db, auth } from "../config/firebase"

const ContactList = ({ initPay }) => {
  const [user] = useAuthState(auth)
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    const getUserContacts = async () => {
      db.collection("contacts")
        // .orderBy("createdAt", "desc") //not working in real time
        .where("uid", "==", user.uid)
        .onSnapshot((querySnapshot) => {
          setContacts([])
          querySnapshot.forEach((doc) => {
            const _contact = {
              docId: doc.id,
              ...doc.data(),
            }
            setContacts((prev) => [...prev, _contact])
          })
        })
    }
    getUserContacts()
    // unsubsribe to listener
    return () =>
      db.collection("contacts").where("uid", "==", user.uid).onSnapshot()
  }, [user.uid])

  return (
    <Wrapper>
      <Container>
        <Typography variant="h4">Contact List</Typography>
        {contacts.length > 0
          ? contacts.map((contact) => {
              return (
                <ContactElement
                  key={contact.createdAt}
                  contact={contact}
                  db={db}
                  initPay={initPay}
                />
              )
            })
          : "Create Contacts"}
      </Container>
    </Wrapper>
  )
}

const Container = styled.div`
  max-width: 800px;
`

const Wrapper = styled.div`
  width: 100%;
`

export default ContactList
