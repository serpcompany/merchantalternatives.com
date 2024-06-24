import {
  companySchema,
  company_proSchema,
  company_conSchema,
  db,
} from "database";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

const RESULTS_PER_PAGE = 10;

export const getPage = publicProcedure
  .input(
    z.object({
      page: z.number().optional(),
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
        company_pro: z.array(company_proSchema),
        company_con: z.array(company_conSchema),
      }),
    ),
  )
  .query(async ({ input: { page } }) => {
    const companies = await db.company.findMany({
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
    });

    return companies;
  });
