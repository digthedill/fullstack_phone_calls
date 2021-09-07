require("dotenv").config()
const express = require("express")
const router = express.Router()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

router.post("/create-payment-intent", async (req, res) => {
  const { paymentMethodType } = req.body

  const params = {
    payment_method_types: [paymentMethodType],
    amount: 50, //minimum payment is $.50
    currency: "usd",
  }
  // If this is for an ACSS payment, we add payment_method_options to create
  // the Mandate.
  if (paymentMethodType === "acss_debit") {
    params.payment_method_options = {
      acss_debit: {
        mandate_options: {
          payment_schedule: "sporadic",
          transaction_type: "personal",
        },
      },
    }
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create(params)
    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (e) {
    console.log(e.message)
    return res.status(400).send({
      error: {
        message: e.message,
      },
    })
  }
})

module.exports = router
