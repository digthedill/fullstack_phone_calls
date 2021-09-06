const express = require("express")
const helmet = require("helmet")

const app = express()

app.use(helmet())
app.use(express.json())

app.get("/", (req, res) => {
  res.send({ message: "Hello World" })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log("Serving on " + port)
})
