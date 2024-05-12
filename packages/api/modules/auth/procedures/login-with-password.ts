import { TRPCError } from "@trpc/server";
import { lucia } from "auth";
import { verifyPassword } from "auth/lib/password";
import { UserSchema, db } from "database";
import { setCookie } from "h3";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const loginWithPassword = publicProcedure
  .input(
    z.object({
      email: z
        .string()
        .email()
        .min(1)
        .max(255)
        .transform((v) => v.toLowerCase()),
      password: z.string().min(8).max(255),
    }),
  )
  .output(
    z.object({
      user: UserSchema.pick({
        id: true,
        email: true,
        name: true,
        role: true,
        avatarUrl: true,
      }),
    }),
  )
  .mutation(async ({ input: { email, password }, ctx: { event } }) => {
    const user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!user || !user.hashedPassword)
      throw new TRPCError({
        code: "NOT_FOUND",
      });

    if (!user.emailVerified)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Email not verified",
      });

    const isValidPassword = await verifyPassword(user.hashedPassword, password);

    if (!isValidPassword)
      throw new TRPCError({
        code: "NOT_FOUND",
      });

    const session = await lucia.createSession(user.id, {});

    const sessionCookie = lucia.createSessionCookie(session.id);
    if (event) {
      setCookie(
        event,
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }

    return {
      user,
    };
  });
