import { glossarySchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const getAll = publicProcedure
  .output(
    z.array(
      glossarySchema.pick({
        id: true,
        title: true,
        slug: true,
        one_liner: true,
      }),
    ),
  )
  .query(async () => {
    return await db.glossary.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        one_liner: true,
      },
    });
  });
