import { db } from "../../../../configs/FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { paddle } from "../../../../lib/paddle";
import { EventName } from "@paddle/paddle-node-sdk";

export async function POST(req) {
  const rawBody = await req.text();
  const signature = req.headers.get("Paddle-Signature");
  const secretKey = process.env.PADDLE_WEBHOOK;

  if (!signature || !secretKey) {
    return NextResponse.json(
      { error: "Missing signature or secret" },
      { status: 400 }
    );
  }
  try {
    const eventData = await paddle.webhooks.unmarshal(
      rawBody,
      secretKey,
      signature
    );

    if (eventData.eventType === EventName.TransactionCompleted) {
      const logoId = eventData.data.customData.logoId;
      const email = eventData.data.customData.email;
      if (!logoId && !email) {
        return NextResponse.json({ error: "Missing logoId or email" }, { status: 400 });
      }

      const logoRef = doc(db, "users", email, "logos", logoId);
      await updateDoc(logoRef, { isWaterMark: false });
      console.log(`✅ Watermark removed for logo ${logoId}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Paddle webhook error:", error);
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    );
  }
}
