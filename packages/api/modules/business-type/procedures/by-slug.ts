import { TRPCError } from "@trpc/server";
import { BusinessTypeSchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const bySlug = publicProcedure
  .input(
    z.object({
      slug: z.string(),
    }),
  )
  .output(BusinessTypeSchema)
  .query(async ({ input: { slug } }) => {
    const businessType = await db.businessType.findUnique({
      where: {
        slug,
      },
    });

    if (!businessType) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Brand not found.",
      });
    }

    return businessType;
  });
