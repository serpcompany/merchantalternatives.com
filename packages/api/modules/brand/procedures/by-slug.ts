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
  .output(
    BrandSchema.extend({
      alternatives: BrandSchema.pick({
        id: true,
        name: true,
        slug: true,
        logoUrl: true,
        reviewOneliner: true,
        rating: true,
      }).array(),
    }),
  )
  .query(async ({ input: { slug } }) => {
    const brand = await db.brand.findFirst({
      where: {
        slug,
      },
      include: {
        alternatives: {
          select: {
            id: true,
            name: true,
            slug: true,
            logoUrl: true,
            reviewOneliner: true,
            rating: true,
          },
        },
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
    for (const alternative of brand.alternatives) {
      if (alternative.logoUrl) {
        alternative.logoUrl = await getSignedUrl(alternative.logoUrl, {
          bucket: "avatars",
          expiresIn: 360,
        });
      }
    }

    return brand;
  });
