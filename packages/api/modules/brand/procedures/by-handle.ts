import { TRPCError } from "@trpc/server";
import { BrandSchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const byHandle = publicProcedure
  .input(
    z.object({
      handle: z.string(),
    }),
  )
  .output(BrandSchema)
  .query(async ({ input: { handle }, ctx: { abilities } }) => {
    const brand = await db.brand.findFirst({
      where: {
        handle,
      },
    });

    if (!brand) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Brand not found.",
      });
    }

    return brand;
  });
