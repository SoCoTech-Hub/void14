import { getUserAuth } from "@soco/auth/utils";

import { publicProcedure, router } from "../server/trpc";

export const accountRouter = router({
  getUser: publicProcedure.query(async () => {
    const { session } = await getUserAuth();
    return session;
  }),
});