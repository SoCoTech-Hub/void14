import {
  createExternalService,
  deleteExternalService,
  updateExternalService,
} from "../api/externalServices/mutations";
import {
  getExternalServiceById,
  getExternalServices,
} from "../api/externalServices/queries";
import {
  externalServiceIdSchema,
  insertExternalServiceParams,
  updateExternalServiceParams,
} from "../db/schema/externalServices";
import { publicProcedure, router } from "../server/trpc";

export const externalServicesRouter = router({
  getExternalServices: publicProcedure.query(async () => {
    return getExternalServices();
  }),
  getExternalServiceById: publicProcedure
    .input(externalServiceIdSchema)
    .query(async ({ input }) => {
      return getExternalServiceById(input.id);
    }),
  createExternalService: publicProcedure
    .input(insertExternalServiceParams)
    .mutation(async ({ input }) => {
      return createExternalService(input);
    }),
  updateExternalService: publicProcedure
    .input(updateExternalServiceParams)
    .mutation(async ({ input }) => {
      return updateExternalService(input.id, input);
    }),
  deleteExternalService: publicProcedure
    .input(externalServiceIdSchema)
    .mutation(async ({ input }) => {
      return deleteExternalService(input.id);
    }),
});
