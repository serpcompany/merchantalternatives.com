import { industrySchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const getAll = publicProcedure
  .output(
    z.array(
      industrySchema.pick({
        id: true,
        slug: true,
        name: true,
        description: true,
      }),
    ),
  )
  .query(async () => {
    const res = await db.industry.findMany({
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
      },
    });

    console.log(res);
    return res;
  });
