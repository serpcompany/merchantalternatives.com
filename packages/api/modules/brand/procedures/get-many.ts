import { BrandSchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { getSignedUrl } from "storage";

export const getMany = publicProcedure
  .output(
    z.array(
      BrandSchema.extend({
        name: z.string(),
        logo: z.string().nullable(),
      }),
    ),
  )
  .query(async () => {
    const brands = await db.brand.findMany({
      include: {
        team: {
          select: {
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    const brandsWithSignedUrls = await Promise.all(
      brands.map(async (brand) => {
        if (brand.team.avatarUrl) {
          brand.team.avatarUrl = await getSignedUrl(brand.team.avatarUrl, {
            bucket: "avatars",
            expiresIn: 360,
          });
        }
        return brand;
      }),
    );

    return brandsWithSignedUrls.map((brand) => ({
      name: brand.team.name,
      logo: brand.team.avatarUrl,
      ...brand,
    }));
  });
