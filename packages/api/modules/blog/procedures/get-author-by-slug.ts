import { blogSchema, authorSchema, tagSchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";

export const getAuthorBySlug = publicProcedure
  .input(
    z.object({
      slug: z.string(),
    }),
  )
  .output(
    authorSchema.extend({
      blogs: z.array(
        blogSchema
          .pick({
            id: true,
            slug: true,
            title: true,
            created_at: true,
            excerpt: true,
          })
          .extend({
            tags: z.array(
              tagSchema.pick({
                id: true,
                name: true,
              }),
            ),
          }),
      ),
    }),
  )
  .query(async ({ input: { slug } }) => {
    const author = await db.author.findFirst({
      where: {
        slug,
      },
      include: {
        blogs: {
          include: {
            tags: true,
          },
        },
      },
    });

    if (!author) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Brand not found.",
      });
    }

    return author;
  });
