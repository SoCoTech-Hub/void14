import {
  createWorkshop,
  deleteWorkshop,
  updateWorkshop,
} from "../api/workshops/mutations";
import { getWorkshopById, getWorkshops } from "../api/workshops/queries";
import {
  insertWorkshopParams,
  updateWorkshopParams,
  workshopIdSchema,
} from "../db/schema/workshops";
import { publicProcedure, router } from "../server/trpc";

export const workshopsRouter = router({
  getWorkshops: publicProcedure.query(async () => {
    return getWorkshops();
  }),
  getWorkshopById: publicProcedure
    .input(workshopIdSchema)
    .query(async ({ input }) => {
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
