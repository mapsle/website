import { NextRequest } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function GET(request: NextRequest) {
  stripe.checkout.sessions.create({
    line_items: [],
    mode: "payment",
    success_url: "https://example.com/success",
  });
}
