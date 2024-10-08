import { createAdminApiCaller } from "api/modules/trpc";
import type { SubscriptionStatusType } from "database";
import { Buffer } from "node:buffer";
import { createHmac, timingSafeEqual } from "node:crypto";

export default defineEventHandler(async (event) => {
  try {
    const text = await readRawBody(event);
    const hmac = createHmac(
      "sha256",
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
    const signatureHeader = getHeader(event, "stripe-signature");
    if (!signatureHeader) {
      throw new Error("Missing stripe-signature header");
    }
    const signatureParts = signatureHeader
      .split(",")
      .map((part) => part.split("="));
    const signatureKey =
      signatureParts.find((part) => part[0] === "v1")?.[1] ?? "";
    const signatureTimestamp =
      signatureParts.find((part) => part[0] === "t")?.[1] ?? "";
    const digest = Buffer.from(
      hmac.update(`${signatureTimestamp}.${text}`).digest("hex"),
      "utf8",
    );
    const signature = Buffer.from(signatureKey, "utf8");

    if (!timingSafeEqual(digest, signature))
      throw new Error("Invalid signature.");

    const payload = await readBody(event);
    const type = payload?.type as string;

    if (
      ![
        "customer.subscription.created",
        "customer.subscription.updated",
        "customer.subscription.deleted",
      ].includes(type)
    ) {
      throw new Error("Invalid event type.");
    }

    const statusMap: Record<string, SubscriptionStatusType> = {
      active: "ACTIVE",
      past_due: "PAST_DUE",
      unpaid: "UNPAID",
      canceled: "CANCELED",
      incomplete: "INCOMPLETE",
      incomplete_expired: "EXPIRED",
      trialing: "TRIALING",
      paused: "PAUSED",
    };

    const apiCaller = await createAdminApiCaller();

    const data = payload?.data.object;
    if (!data) {
      throw new Error("Invalid payload.");
    }

    await apiCaller.billing.syncSubscription({
      id: String(data.id),
      teamId: data.metadata?.team_id,
      customerId: String(data.customer),
      planId: String(data.plan.product),
      variantId: String(data.plan.id),
      status: statusMap[data.status],
      nextPaymentDate: new Date(
        (data.trial_end ?? data.current_period_end ?? 0) * 1000,
      ),
    });
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: `Webhook error: ${error instanceof Error ? error.message : ""}`,
    });
  }

  setResponseStatus(event, 204);
  return null;
});
