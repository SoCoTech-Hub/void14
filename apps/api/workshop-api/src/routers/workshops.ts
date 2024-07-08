import { getWorkshopById, getWorkshops } from "../api/workshops/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  workshopIdSchema,
  insertWorkshopParams,
  updateWorkshopParams,
} from "@soco/workshop-db/schema/workshops";
import { createWorkshop, deleteWorkshop, updateWorkshop } from "../api/workshops/mutations";

export const workshopsRouter =createTRPCRouter({
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
