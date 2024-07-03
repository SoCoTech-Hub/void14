import { getWorkshopFormRubricLevelById, getWorkshopFormRubricLevels } from "@/lib/api/workshopFormRubricLevels/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  workshopFormRubricLevelIdSchema,
  insertWorkshopFormRubricLevelParams,
  updateWorkshopFormRubricLevelParams,
} from "@/lib/db/schema/workshopFormRubricLevels";
import { createWorkshopFormRubricLevel, deleteWorkshopFormRubricLevel, updateWorkshopFormRubricLevel } from "@/lib/api/workshopFormRubricLevels/mutations";

export const workshopFormRubricLevelsRouter = router({
  getWorkshopFormRubricLevels: publicProcedure.query(async () => {
    return getWorkshopFormRubricLevels();
  }),
  getWorkshopFormRubricLevelById: publicProcedure.input(workshopFormRubricLevelIdSchema).query(async ({ input }) => {
    return getWorkshopFormRubricLevelById(input.id);
  }),
  createWorkshopFormRubricLevel: publicProcedure
    .input(insertWorkshopFormRubricLevelParams)
    .mutation(async ({ input }) => {
      return createWorkshopFormRubricLevel(input);
    }),
  updateWorkshopFormRubricLevel: publicProcedure
    .input(updateWorkshopFormRubricLevelParams)
    .mutation(async ({ input }) => {
      return updateWorkshopFormRubricLevel(input.id, input);
    }),
  deleteWorkshopFormRubricLevel: publicProcedure
    .input(workshopFormRubricLevelIdSchema)
    .mutation(async ({ input }) => {
      return deleteWorkshopFormRubricLevel(input.id);
    }),
});
