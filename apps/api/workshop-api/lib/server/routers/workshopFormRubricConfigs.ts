import { getWorkshopFormRubricConfigById, getWorkshopFormRubricConfigs } from "@/lib/api/workshopFormRubricConfigs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  workshopFormRubricConfigIdSchema,
  insertWorkshopFormRubricConfigParams,
  updateWorkshopFormRubricConfigParams,
} from "@/lib/db/schema/workshopFormRubricConfigs";
import { createWorkshopFormRubricConfig, deleteWorkshopFormRubricConfig, updateWorkshopFormRubricConfig } from "@/lib/api/workshopFormRubricConfigs/mutations";

export const workshopFormRubricConfigsRouter = router({
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
