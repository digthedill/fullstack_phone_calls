const express = require("express")
const router = express.Router()
const makeCall = require("../make_call")

// opportunity to verify the user
router.post("/call", async (req, res) => {
  const recipient = req.body.cell_number
  try {
    const call = await makeCall(recipient)
    if (call.sid) {
      res.status(200).send({ message: "call completed", callId: call.sid })
    } else {
      throw new Error("Couldnt complete call")
    }
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

module.exports = router
