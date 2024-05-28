import { TeamSchema, TeamMemberRoleSchema, db, BrandSchema } from "database";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const create = protectedProcedure
  .input(
    z.object({
      name: z.string(),
    }),
  )
  .output(
    BrandSchema.extend({
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
    const existingBrand = await db.brand.findFirst({
      where: {
        handle: name.toLowerCase().replace(/\s/g, "-"),
      },
    });
    const handle = existingBrand
      ? `${name.toLowerCase().replace(/\s/g, "-")}-${Date.now()}`
      : name.toLowerCase().replace(/\s/g, "-");

    const brand = await db.brand.create({
      data: {
        name,
        handle,
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

    return brand;
  });
