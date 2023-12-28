import { stripe } from "@/lib/stripe";
import prisma from "@/prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-signature") as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error:${error.message}`, { status: 400 });
  }
  const session = event.data.object as Stripe.Checkout.Session;
  const address = session.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];
  const addressStripe = addressComponents.filter((c) => c !== null).join(", ");
  if (event.type === "checkout.session.completed") {
    const order = await prisma.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressStripe,
        phone: session.customer_details?.phone || "",
      },
      include: {
        orderItem: true,
      },
    });
    const productIds = order.orderItem.map((orderItem) => orderItem.productId);
    await prisma.product.updateMany({
      where: { id: { in: [...productIds] } },
      data: {
        isArchived: true,
      },
    });
  }
  return new NextResponse(null,{status:200})
}
