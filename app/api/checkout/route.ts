import { NextRequest } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function GET(request: NextRequest) {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "price_1RqUwjGRy7XLTRcO1xefEskq",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000",
  });

  return Response.json(session);
}
