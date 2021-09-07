import axios from "axios"
import { useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../config/firebase"

const MakingCall = ({ paymentSuccess, phoneNumber }) => {
  const [{ user: uid }] = useAuthState(auth)
  const [calling, setCalling] = useState(false)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const data = async () => {
      axios.post("http://localhost:4000/call", {
        cell_number: phoneNumber,
        uid,
      })
      setCalling(true)
    }

    console.log(data.callId)

    if (paymentSuccess && data.callId) {
      setCalling(false)
      setCompleted(true)
    }

    return data()
  }, [paymentSuccess, phoneNumber, uid])

  return (
    <div>
      {calling && <p>making call</p>}
      {completed && <p>Success!</p>}
    </div>
  )
}

export default MakingCall
