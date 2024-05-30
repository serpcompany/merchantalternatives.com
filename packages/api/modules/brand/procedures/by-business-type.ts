import { BrandSchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { getSignedUrl } from "storage";

export const byBusinessType = publicProcedure
  .input(
    z.object({
      businessTypeSlug: z.string(),
    }),
  )
  .output(z.array(BrandSchema))
  .query(async ({ input: { businessTypeSlug } }) => {
    const brands = await db.brand.findMany({
      where: {
        businessTypesServed: {
          some: {
            slug: businessTypeSlug,
          },
        },
      },
      orderBy: {
        rating: "desc",
      },
    });

    const brandsWithSignedUrls = await Promise.all(
      brands.map(async (brand) => ({
        ...brand,
        logoUrl: brand.logoUrl
          ? await getSignedUrl(brand.logoUrl, {
              bucket: "avatars",
              expiresIn: 360,
            })
          : null,
      })),
    );

    return brandsWithSignedUrls;
  });
