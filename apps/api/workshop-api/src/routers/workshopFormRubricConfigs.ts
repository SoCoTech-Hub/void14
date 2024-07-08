import { getWorkshopFormRubricConfigById, getWorkshopFormRubricConfigs } from "../api/workshopFormRubricConfigs/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  workshopFormRubricConfigIdSchema,
  insertWorkshopFormRubricConfigParams,
  updateWorkshopFormRubricConfigParams,
} from "@soco/workshop-db/schema/workshopFormRubricConfigs";
import { createWorkshopFormRubricConfig, deleteWorkshopFormRubricConfig, updateWorkshopFormRubricConfig } from "../api/workshopFormRubricConfigs/mutations";

export const workshopFormRubricConfigsRouter =createTRPCRouter({
  getWorkshopFormRubricConfigs: publicProcedure.query(async () => {
    return getWorkshopFormRubricConfigs();
  }),
  getWorkshopFormRubricConfigById: publicProcedure.input(workshopFormRubricConfigIdSchema).query(async ({ input }) => {
    return getWorkshopFormRubricConfigById(input.id);
  }),
  createWorkshopFormRubricConfig: publicProcedure
    .input(insertWorkshopFormRubricConfigParams)
    .mutation(async ({ input }) => {
      return createWorkshopFormRubricConfig(input);
    }),
  updateWorkshopFormRubricConfig: publicProcedure
    .input(updateWorkshopFormRubricConfigParams)
    .mutation(async ({ input }) => {
      return updateWorkshopFormRubricConfig(input.id, input);
    }),
  deleteWorkshopFormRubricConfig: publicProcedure
    .input(workshopFormRubricConfigIdSchema)
    .mutation(async ({ input }) => {
      return deleteWorkshopFormRubricConfig(input.id);
    }),
});
