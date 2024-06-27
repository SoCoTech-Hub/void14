import { getWorkshopById, getWorkshops } from "@/lib/api/workshops/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  workshopIdSchema,
  insertWorkshopParams,
  updateWorkshopParams,
} from "@/lib/db/schema/workshops";
import { createWorkshop, deleteWorkshop, updateWorkshop } from "@/lib/api/workshops/mutations";

export const workshopsRouter = router({
  getWorkshops: publicProcedure.query(async () => {
    return getWorkshops();
  }),
  getWorkshopById: publicProcedure.input(workshopIdSchema).query(async ({ input }) => {
    return getWorkshopById(input.id);
  }),
  createWorkshop: publicProcedure
    .input(insertWorkshopParams)
    .mutation(async ({ input }) => {
      return createWorkshop(input);
    }),
  updateWorkshop: publicProcedure
    .input(updateWorkshopParams)
    .mutation(async ({ input }) => {
      return updateWorkshop(input.id, input);
    }),
  deleteWorkshop: publicProcedure
    .input(workshopIdSchema)
    .mutation(async ({ input }) => {
      return deleteWorkshop(input.id);
    }),
});
