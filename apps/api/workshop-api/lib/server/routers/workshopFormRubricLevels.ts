import {
  createWorkshopFormRubricLevel,
  deleteWorkshopFormRubricLevel,
  updateWorkshopFormRubricLevel,
} from "../api/workshopFormRubricLevels/mutations";
import {
  getWorkshopFormRubricLevelById,
  getWorkshopFormRubricLevels,
} from "../api/workshopFormRubricLevels/queries";
import {
  insertWorkshopFormRubricLevelParams,
  updateWorkshopFormRubricLevelParams,
  workshopFormRubricLevelIdSchema,
} from "../db/schema/workshopFormRubricLevels";
import { publicProcedure, router } from "../server/trpc";

export const workshopFormRubricLevelsRouter = router({
  getWorkshopFormRubricLevels: publicProcedure.query(async () => {
    return getWorkshopFormRubricLevels();
  }),
  getWorkshopFormRubricLevelById: publicProcedure
    .input(workshopFormRubricLevelIdSchema)
    .query(async ({ input }) => {
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
