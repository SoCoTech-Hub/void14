import { getWorkshopFormRubricById, getWorkshopFormRubrics } from "@/lib/api/workshopFormRubrics/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  workshopFormRubricIdSchema,
  insertWorkshopFormRubricParams,
  updateWorkshopFormRubricParams,
} from "@/lib/db/schema/workshopFormRubrics";
import { createWorkshopFormRubric, deleteWorkshopFormRubric, updateWorkshopFormRubric } from "@/lib/api/workshopFormRubrics/mutations";

export const workshopFormRubricsRouter = router({
  getWorkshopFormRubrics: publicProcedure.query(async () => {
    return getWorkshopFormRubrics();
  }),
  getWorkshopFormRubricById: publicProcedure.input(workshopFormRubricIdSchema).query(async ({ input }) => {
    return getWorkshopFormRubricById(input.id);
  }),
  createWorkshopFormRubric: publicProcedure
    .input(insertWorkshopFormRubricParams)
    .mutation(async ({ input }) => {
      return createWorkshopFormRubric(input);
    }),
  updateWorkshopFormRubric: publicProcedure
    .input(updateWorkshopFormRubricParams)
    .mutation(async ({ input }) => {
      return updateWorkshopFormRubric(input.id, input);
    }),
  deleteWorkshopFormRubric: publicProcedure
    .input(workshopFormRubricIdSchema)
    .mutation(async ({ input }) => {
      return deleteWorkshopFormRubric(input.id);
    }),
});
