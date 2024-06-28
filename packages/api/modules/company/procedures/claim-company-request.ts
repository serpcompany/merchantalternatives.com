import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";

export const claimCompanyRequest = protectedProcedure
  .input(
    z.object({
      companyName: z.string(),
    }),
  )
  .mutation(async ({ ctx: { user }, input: { companyName } }) => {
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
      templateId: "claimCompanyRequest",
      context: { email: user.email, name: user.name, companyName },
    });
  });
