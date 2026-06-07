import { NextResponse } from "next/server";

/**
 * Receives an order from the checkout form and forwards it to the
 * Google Apps Script web app (which appends a row to the order spreadsheet).
 * The Apps Script URL is kept server-side in ORDER_WEBHOOK_URL so it is
 * never exposed to the browser, and this server-to-server call has no CORS.
 */
export async function POST(req: Request) {
  const webhook = process.env.ORDER_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      { ok: false, error: "Order webhook not configured." },
      { status: 500 },
    );
  }

  try {
    const order = await req.json();

    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
      redirect: "follow", // Apps Script responds via a 302 redirect
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: `Sheet responded ${res.status}` },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 502 },
    );
  }
}
