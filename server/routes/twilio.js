const express = require("express")
const router = express.Router()
const makeCall = require("../make_call")

router.post("/call", async (req, res) => {
  const recipient = req.body.cell_number
  const uid = req.body.uid
  if (!uid) {
    // prevent unauthorized calls (need to connect to firebase auth)
    return res.status(400).send({ message: "You are not authorized to call" })
  }
  try {
    const call = await makeCall(recipient)
    if (!call) {
      return res
        .status(400)
        .send({ message: "Unverified phone number. Enter a real phone number" })
    }
    if (call.sid) {
      res.status(200).send({ message: "call completed", callId: call.sid })
    }
  } catch (e) {
    console.log(e.message)
    res.status(400).send(e)
  }
})

module.exports = router
