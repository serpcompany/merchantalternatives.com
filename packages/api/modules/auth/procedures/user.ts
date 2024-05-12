import { TeamMembershipSchema, TeamSchema, UserSchema, db } from "database";
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
              team: TeamSchema,
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
