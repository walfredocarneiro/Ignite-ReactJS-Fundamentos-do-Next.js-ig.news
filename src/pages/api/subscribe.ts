import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { stripe } from "../../services/stripe";

export default async (req: NextApiRequest, res: NextApiResponse)=>{
  if (req.method === 'POST') {
    const session = await getSession({req})

    const stripecustomer = await stripe.customers.create({
      email: session.user.email,
      // metadata
    })

    const stipeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripecustomer.id,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        { price: 'price_1KwPXWA6QUONcj7TDQ0VWLRJ', quantity: 1}
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    })

    // se deu certo retorna status 200 
    return res.status(200).json({ sessionId: stipeCheckoutSession})
  } else {
    res.setHeader('allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}