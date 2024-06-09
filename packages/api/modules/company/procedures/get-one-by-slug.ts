import { TRPCError } from "@trpc/server";
import { companySchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { getSignedUrl } from "storage";

export const getOneBySlug = publicProcedure
  .input(
    z.object({
      slug: z.string(),
    }),
  )
  .output(
    companySchema.extend({
      company_image: z.array(
        z.object({
          url: z.string().optional(),
        }),
      ),
    }),
  )
  .query(async ({ input: { slug } }) => {
    const company = await db.company.findFirst({
      where: {
        slug,
      },
      include: {
        company_image: {
          select: {
            url: true,
          },
        },
      },
    });

    if (!company) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Brand not found.",
      });
    }

    return company;
  });
