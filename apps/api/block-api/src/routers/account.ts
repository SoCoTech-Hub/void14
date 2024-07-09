import { getUserAuth } from "@soco/auth-services";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const accountRouter = createTRPCRouter({
  getUser: publicProcedure.query(async () => {
    const { session } = await getUserAuth();
    return session;
  }),
});
