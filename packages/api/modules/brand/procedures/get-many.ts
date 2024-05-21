import { BrandSchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { getSignedUrl } from "storage";

export const getMany = publicProcedure
  .output(z.array(BrandSchema))
  .query(async () => {
    const brands = await db.brand.findMany();

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
