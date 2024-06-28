import { companySchema, db } from "database";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const update = protectedProcedure
  .input(
    z.object({
      id: z.number(),
      data: companySchema.partial(),
    }),
  )
  .output(companySchema)
  .mutation(async ({ input: { id, data } }) => {
    return await db.company.update({
      where: {
        id,
      },
      data,
    });
  });
