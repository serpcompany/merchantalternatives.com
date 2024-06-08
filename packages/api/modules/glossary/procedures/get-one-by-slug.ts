import { TRPCError } from "@trpc/server";
import { glossarySchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const getOneBySlug = publicProcedure
  .input(
    z.object({
      slug: z.string(),
    }),
  )
  .output(glossarySchema)
  .query(async ({ input: { slug } }) => {
    const term = await db.glossary.findFirst({
      where: {
        slug,
      },
    });

    if (!term) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Brand not found.",
      });
    }

    return term;
  });
