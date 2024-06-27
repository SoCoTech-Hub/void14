import { getMnetHost2serviceById, getMnetHost2services } from "@/lib/api/mnetHost2services/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  mnetHost2serviceIdSchema,
  insertMnetHost2serviceParams,
  updateMnetHost2serviceParams,
} from "@/lib/db/schema/mnetHost2services";
import { createMnetHost2service, deleteMnetHost2service, updateMnetHost2service } from "@/lib/api/mnetHost2services/mutations";

export const mnetHost2servicesRouter = router({
  getMnetHost2services: publicProcedure.query(async () => {
    return getMnetHost2services();
  }),
  getMnetHost2serviceById: publicProcedure.input(mnetHost2serviceIdSchema).query(async ({ input }) => {
    return getMnetHost2serviceById(input.id);
  }),
  createMnetHost2service: publicProcedure
    .input(insertMnetHost2serviceParams)
    .mutation(async ({ input }) => {
      return createMnetHost2service(input);
    }),
  updateMnetHost2service: publicProcedure
    .input(updateMnetHost2serviceParams)
    .mutation(async ({ input }) => {
      return updateMnetHost2service(input.id, input);
    }),
  deleteMnetHost2service: publicProcedure
    .input(mnetHost2serviceIdSchema)
    .mutation(async ({ input }) => {
      return deleteMnetHost2service(input.id);
    }),
});
