import { TRPCError } from "@trpc/server";
import {
  industrySchema,
  db,
  companySchema,
  company_proSchema,
  company_conSchema,
} from "database";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

const RESULTS_PER_PAGE = 10;

export const getPageBySlug = publicProcedure
  .input(
    z.object({
      slug: z.string(),
      page: z.number().optional(),
    }),
  )
  .output(
    industrySchema.extend({
      company: z.array(
        companySchema.extend({
          company_image: z
            .object({
              id: z.number(),
              url: z.string(),
            })
            .array()
            .nullable(),
          company_pro: z.array(company_proSchema),
          company_con: z.array(company_conSchema),
        }),
      ),
    }),
  )
  .query(async ({ input: { slug, page } }) => {
    const industry = await db.industry.findFirst({
      where: {
        slug,
      },
      include: {
        company: {
          where: {
            editor_rating: {
              not: null,
            },
          },
          include: {
            company_image: {
              select: {
                id: true,
                url: true,
              },
            },
            company_pro: true,
            company_con: true,
          },
          skip: page ? (page - 1) * RESULTS_PER_PAGE : 0,
          take: RESULTS_PER_PAGE,
        },
      },
    });

    if (!industry) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Brand not found.",
      });
    }

    return industry;
  });
