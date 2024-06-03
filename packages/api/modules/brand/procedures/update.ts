import { BrandSchema, db } from "database";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const update = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string().optional(),
      logoUrl: z.string().optional(),
      website: z.string().optional(),
      hqLocation: z.string().optional(),
      numOfEmployees: z.number().optional(),
      yearFounded: z.number().optional(),
      ceo: z.string().optional(),
      summary: z.string().optional(),
      overview: z.string().optional(),
      reviewOneliner: z.string().max(144).optional(),
    }),
  )
  .output(BrandSchema)
  .mutation(
    async ({
      input: {
        id,
        name,
        logoUrl,
        website,
        hqLocation,
        numOfEmployees,
        yearFounded,
        ceo,
        summary,
        overview,
        reviewOneliner,
      },
    }) => {
      const brand = await db.brand.update({
        where: {
          id,
        },
        data: {
          name,
          logoUrl,
          website,
          hqLocation,
          numOfEmployees,
          yearFounded,
          ceo,
          summary,
          overview,
          reviewOneliner,
        },
      });

      return brand;
    },
  );
