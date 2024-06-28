import { TeamSchema, TeamMemberRoleSchema, db, companySchema } from "database";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const create = protectedProcedure
  .input(
    z.object({
      name: z.string(),
    }),
  )
  .output(
    companySchema.extend({
      team: TeamSchema.extend({
        memberships: z.array(
          z.object({
            id: z.string(),
            role: TeamMemberRoleSchema,
            isCreator: z.boolean(),
          }),
        ),
      }).nullable(),
    }),
  )
  .mutation(async ({ input: { name }, ctx: { user } }) => {
    const existingCompany = await db.company.findFirst({
      where: {
        slug: name.toLowerCase().replace(/\s/g, "-"),
      },
    });
    const slug = existingCompany
      ? `${name.toLowerCase().replace(/\s/g, "-")}-${Date.now()}`
      : name.toLowerCase().replace(/\s/g, "-");

    const company = await db.company.create({
      data: {
        name,
        slug,
        engaged: true,
        team: {
          create: {
            name,
            memberships: {
              create: {
                userId: user.id,
                role: TeamMemberRoleSchema.Values.OWNER,
                isCreator: true,
              },
            },
          },
        },
      },
      include: {
        team: {
          include: {
            memberships: {
              select: {
                id: true,
                role: true,
                isCreator: true,
              },
            },
          },
        },
      },
    });

    return company;
  });
