import { TRPCError } from "@trpc/server";
import { blogSchema, authorSchema, tagSchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const getOneBySlug = publicProcedure
  .input(
    z.object({
      slug: z.string(),
    }),
  )
  .output(
    blogSchema.extend({
      author: authorSchema.nullable(),
      tags: z.array(tagSchema),
    }),
  )
  .query(async ({ input: { slug } }) => {
    const blog = await db.blog.findFirst({
      where: {
        slug,
      },
      include: {
        author: true,
        tags: true,
      },
    });

    if (!blog) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Brand not found.",
      });
    }

    return blog;
  });
