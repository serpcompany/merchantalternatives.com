import type { inferAsyncReturnType } from "@trpc/server";
import { lucia } from "auth";
import { db } from "database";
import { parseCookies, type H3Event } from "h3";
import { defineAbilitiesFor } from "../auth";

export async function createContext(event?: H3Event | { isAdmin?: boolean }) {
  const sessionId =
    (event &&
      "node" in event &&
      parseCookies(event)?.[lucia.sessionCookieName]) ||
    null;
  const { user, session } = sessionId
    ? await lucia.validateSession(sessionId)
    : { user: null, session: null };

  const teamMemberships = user
    ? await db.teamMembership.findMany({
        where: {
          userId: user.id,
        },
        include: {
          team: {
            include: {
              company: {
                include: {
                  company_image: true,
                  company_pro: true,
                  company_con: true,
                },
              },
            },
          },
        },
      })
    : null;

  const abilities = defineAbilitiesFor({
    user,
    teamMemberships,
  });

  return {
    user,
    teamMemberships,
    abilities,
    session,
    isAdmin: event && "isAdmin" in event ? event.isAdmin : false,
    event: event && "node" in event ? event : undefined,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
