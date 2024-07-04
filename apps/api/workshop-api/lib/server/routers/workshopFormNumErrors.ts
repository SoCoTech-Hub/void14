import {
  createWorkshopFormNumError,
  deleteWorkshopFormNumError,
  updateWorkshopFormNumError,
} from "../api/workshopFormNumErrors/mutations";
import {
  getWorkshopFormNumErrorById,
  getWorkshopFormNumErrors,
} from "../api/workshopFormNumErrors/queries";
import {
  insertWorkshopFormNumErrorParams,
  updateWorkshopFormNumErrorParams,
  workshopFormNumErrorIdSchema,
} from "../db/schema/workshopFormNumErrors";
import { publicProcedure, router } from "../server/trpc";

export const workshopFormNumErrorsRouter = router({
  getWorkshopFormNumErrors: publicProcedure.query(async () => {
    return getWorkshopFormNumErrors();
  }),
  getWorkshopFormNumErrorById: publicProcedure
    .input(workshopFormNumErrorIdSchema)
    .query(async ({ input }) => {
      return getWorkshopFormNumErrorById(input.id);
    }),
  createWorkshopFormNumError: publicProcedure
    .input(insertWorkshopFormNumErrorParams)
    .mutation(async ({ input }) => {
      return createWorkshopFormNumError(input);
    }),
  updateWorkshopFormNumError: publicProcedure
    .input(updateWorkshopFormNumErrorParams)
    .mutation(async ({ input }) => {
      return updateWorkshopFormNumError(input.id, input);
    }),
  deleteWorkshopFormNumError: publicProcedure
    .input(workshopFormNumErrorIdSchema)
    .mutation(async ({ input }) => {
      return deleteWorkshopFormNumError(input.id);
    }),
});
