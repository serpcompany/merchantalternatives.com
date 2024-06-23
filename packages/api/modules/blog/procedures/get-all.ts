import { blogSchema, authorSchema, tagSchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const getAll = publicProcedure
  .output(
    z.array(
      blogSchema
        .pick({
          id: true,
          slug: true,
          title: true,
          created_at: true,
          excerpt: true,
        })
        .extend({
          author: authorSchema
            .pick({
              id: true,
              name: true,
              slug: true,
            })
            .nullable(),
          tags: z.array(
            tagSchema.pick({
              id: true,
              name: true,
            }),
          ),
        }),
    ),
  )
  .query(async () => {
    return await db.blog.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        created_at: true,
        excerpt: true,
        author: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  });
