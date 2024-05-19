import { TRPCError } from "@trpc/server";
import { BrandSchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { getSignedUrl } from "storage";

export const byHandle = publicProcedure
  .input(
    z.object({
      handle: z.string(),
    }),
  )
  .output(
    BrandSchema.extend({
      name: z.string(),
      logo: z.string().nullable(),
    }),
  )
  .query(async ({ input: { handle } }) => {
    const brand = await db.brand.findFirst({
      where: {
        handle,
      },
      include: {
        team: {
          select: {
            name: true,
            avatarUrl: true,
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

    if (brand.team.avatarUrl) {
      brand.team.avatarUrl = await getSignedUrl(brand.team.avatarUrl, {
        bucket: "avatars",
        expiresIn: 360,
      });
    }

    return {
      name: brand.team.name,
      logo: brand.team.avatarUrl,
      ...brand,
    };
  });
