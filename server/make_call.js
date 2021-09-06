require("dotenv").config()
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require("twilio")(accountSid, authToken)

const makeCall = async (recipient) => {
  try {
    const call = await client.calls.create({
      url: "http://demo.twilio.com/docs/voice.xml",
      to: recipient,
      from: "+15716206595",
    })
    if (call) {
      return call
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = { makeCall }
