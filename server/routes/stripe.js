require("dotenv").config()
const express = require("express")
const router = express.Router()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Phone Call",
          },
          unit_amount: 25,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://localhost:3000/success",
    cancel_url: "https://localhost:3000/main",
  })

  res.redirect(303, session.url)
})

module.exports = router
