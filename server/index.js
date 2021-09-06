const express = require("express")
const helmet = require("helmet")
const { makeCall } = require("./make_call")

const app = express()

app.use(helmet())
app.use(express.json())

app.get("/", (req, res) => {
  res.send({ message: "Hello World" })
})

// middleware with stripe payment

app.post("/call", async (req, res) => {
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

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log("Serving on " + port)
})
