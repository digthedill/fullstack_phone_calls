import React from "react"
import ContactList from "./ContactList"
import CreateContact from "./CreateContact"

const Contacts = () => {
  return (
    <div>
      <CreateContact />
      <ContactList />
    </div>
  )
}

export default Contacts
