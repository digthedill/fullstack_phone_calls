import { useState } from "react"
import { Button, TextField } from "@material-ui/core"
import MuiPhoneNumber from "material-ui-phone-number"

import React from "react"

const CreateContact = () => {
  const [contactName, setContactName] = useState("")
  const [contactNumber, setContactNumber] = useState("")

  const createNewContact = (e) => {
    e.preventDefault()
    // format number here
    console.log({
      contactName,
      contactNumber,
    })
    // send to database
  }

  return (
    <form onSubmit={createNewContact}>
      <TextField
        id="contact-name"
        label="New Contact"
        value={contactName}
        onChange={(e) => setContactName(e.target.value)}
      />
      <MuiPhoneNumber
        label="Phone Number"
        value={contactNumber}
        onChange={(e) => setContactNumber(e)}
        defaultCountry={"us"}
      />
      <Button type="submit" variant="outlined">
        +
      </Button>
    </form>
  )
}

export default CreateContact
