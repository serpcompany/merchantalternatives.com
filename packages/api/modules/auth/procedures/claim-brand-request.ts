import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";

export const claimBrandRequest = protectedProcedure
  .input(
    z.object({
      email: z
        .string()
        .email()
        .min(1)
        .max(255)
        .transform((v) => v.toLowerCase()),
      name: z.string(),
      brandName: z.string(),
    }),
  )
  .mutation(async ({ ctx: { user }, input: { email, name, brandName } }) => {
    if (!user) {
      return;
    }

    if (!process.env.MAIL_NOTIFICATIONS) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Mail notifications env var missing",
      });
    }

    sendEmail({
      to: process.env.MAIL_NOTIFICATIONS,
      templateId: "claimBrandRequest",
      context: { name, email, brandName },
    });
  });
