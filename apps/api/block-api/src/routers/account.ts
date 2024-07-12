import { getUserAuth } from "@soco/auth-service";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const accountRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getUser: publicProcedure.query(async () => {
      const { session } = await getUserAuth();
      return session;
    }),
  });
