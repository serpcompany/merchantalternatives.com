import { TRPCError } from "@trpc/server";
import { BrandSchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { getSignedUrl } from "storage";

export const bySlug = publicProcedure
  .input(
    z.object({
      slug: z.string(),
    }),
  )
  .output(BrandSchema)
  .query(async ({ input: { slug } }) => {
    const brand = await db.brand.findFirst({
      where: {
        slug,
      },
    });

    if (!brand) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Brand not found.",
      });
    }

    if (brand.logoUrl) {
      brand.logoUrl = await getSignedUrl(brand.logoUrl, {
        bucket: "avatars",
        expiresIn: 360,
      });
    }

    return brand;
  });
