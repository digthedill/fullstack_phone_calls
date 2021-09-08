import axios from "axios"
const makeTwilioCall = async (
  setCalling,
  phoneNumber,
  user,
  setCallComplete,
  setCallError
) => {
  setCalling(true)
  // make call to server with recipient phone number
  try {
    axios
      .post("/call", {
        cell_number: phoneNumber,
        uid: user.uid,
      })
      .then((res) => {
        // successful call to phone number
        if (res.data.callId) {
          setCallComplete(true)
          setCalling(false)
        }
      })
      .catch((err) => {
        console.log(err.message)
        setCallError("Invalid phone number")
      })
  } catch (err) {
    // extra error catching
    console.log(err.message)
    setCallError("Invalid phone number")
  }
}

export default makeTwilioCall
