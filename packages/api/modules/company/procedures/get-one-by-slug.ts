import { TRPCError } from "@trpc/server";
import {
  companySchema,
  company_imageSchema,
  industrySchema,
  business_typeSchema,
  company_proSchema,
  company_conSchema,
  db,
} from "database";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const getOneBySlug = publicProcedure
  .input(
    z.object({
      slug: z.string(),
    }),
  )
  .output(
    companySchema.extend({
      company_image: company_imageSchema
        .pick({
          id: true,
          url: true,
        })
        .array(),
      industry: industrySchema
        .pick({
          id: true,
          name: true,
        })
        .array(),
      business_type: business_typeSchema
        .pick({
          id: true,
          name: true,
        })
        .array(),
      company_pro: company_proSchema
        .pick({
          id: true,
          text: true,
        })
        .array(),
      company_con: company_conSchema
        .pick({
          id: true,
          text: true,
        })
        .array(),
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
            id: true,
            url: true,
          },
        },
        industry: {
          select: {
            id: true,
            name: true,
          },
        },
        business_type: {
          select: {
            id: true,
            name: true,
          },
        },
        company_pro: {
          select: {
            id: true,
            text: true,
          },
        },
        company_con: {
          select: {
            id: true,
            text: true,
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
