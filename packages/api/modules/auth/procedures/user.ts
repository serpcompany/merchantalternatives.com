import {
  TeamMembershipSchema,
  TeamSchema,
  UserSchema,
  db,
  companySchema,
  company_imageSchema,
  company_proSchema,
  company_conSchema,
} from "database";
import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { getUserAvatarUrl } from "../lib/avatar-url";

export const user = publicProcedure
  .output(
    UserSchema.pick({
      id: true,
      email: true,
      role: true,
      avatarUrl: true,
      name: true,
      onboardingComplete: true,
    })
      .extend({
        teamMemberships: z
          .array(
            TeamMembershipSchema.extend({
              team: TeamSchema.extend({
                company: companySchema.extend({
                  company_image: z.array(company_imageSchema),
                  company_pro: z.array(company_proSchema),
                  company_con: z.array(company_conSchema),
                }),
              }),
            }),
          )
          .nullable(),
        impersonatedBy: UserSchema.pick({
          id: true,
          name: true,
        }).nullish(),
      })
      .nullable(),
  )
  .query(async ({ ctx: { user, teamMemberships, session } }) => {
    if (!user) {
      return null;
    }

    const impersonatedBy = session?.impersonatorId
      ? await db.user.findUnique({
          where: {
            id: session.impersonatorId,
          },
          select: {
            id: true,
            name: true,
          },
        })
      : undefined;

    return {
      ...user,
      avatarUrl: await getUserAvatarUrl(user.avatarUrl),
      impersonatedBy,
      teamMemberships,
    };
  });
