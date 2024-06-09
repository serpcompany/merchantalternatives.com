import { companySchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

const RESULTS_PER_PAGE = 10;

export const getPageByIndustry = publicProcedure
  .input(
    z.object({
      page: z.number().optional(),
      industrySlug: z.string(),
    }),
  )
  .output(
    z.array(
      companySchema.extend({
        company_image: z
          .object({
            id: z.number(),
            url: z.string(),
          })
          .array()
          .nullable(),
      }),
    ),
  )
  .query(async ({ input: { page, industrySlug } }) => {
    const companies = await db.company.findMany({
      where: {
        editor_rating: {
          not: null,
        },
        industry: {
          some: {
            slug: industrySlug,
          },
        },
      },
      include: {
        company_image: {
          select: {
            id: true,
            url: true,
          },
        },
      },
      skip: page ? (page - 1) * RESULTS_PER_PAGE : 0,
      take: RESULTS_PER_PAGE,
    });

    return companies;
  });
