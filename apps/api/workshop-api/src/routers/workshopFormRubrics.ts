import {
  insertWorkshopFormRubricParams,
  updateWorkshopFormRubricParams,
  workshopFormRubricIdSchema,
} from "@soco/workshop-db/schema/workshopFormRubrics";

import {
  createWorkshopFormRubric,
  deleteWorkshopFormRubric,
  updateWorkshopFormRubric,
} from "../api/workshopFormRubrics/mutations";
import {
  getWorkshopFormRubricById,
  getWorkshopFormRubrics,
} from "../api/workshopFormRubrics/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const workshopFormRubricsRouter = createTRPCRouter({
  getWorkshopFormRubrics: publicProcedure.query(async () => {
    return getWorkshopFormRubrics();
  }),
  getWorkshopFormRubricById: publicProcedure
    .input(workshopFormRubricIdSchema)
    .query(async ({ input }) => {
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
