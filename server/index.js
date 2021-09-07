require("dotenv").config()
const path = require("path")
const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const twilioRoutes = require("./routes/twilio")
const stripeRoutes = require("./routes/stripe")

const app = express()

app.use(express.static(path.resolve(__dirname, "../frontend/build")))

app.use(helmet())
app.use(cors())
app.use(express.json())

// routes
app.use(twilioRoutes)
app.use(stripeRoutes)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log("Serving on " + port)
})
