import { getUserAuth } from "@soco/auth-service";
import { publicProcedure,createTRPCRouter } from "../trpc";
export const accountRouter =createTRPCRouter({
  getUser: publicProcedure.query(async () => {
    const { session } = await getUserAuth();
    return session;
  }),
});
