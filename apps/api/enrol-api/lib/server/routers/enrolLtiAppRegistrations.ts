import {
  createEnrolLtiAppRegistration,
  deleteEnrolLtiAppRegistration,
  updateEnrolLtiAppRegistration,
} from "../api/enrolLtiAppRegistrations/mutations";
import {
  getEnrolLtiAppRegistrationById,
  getEnrolLtiAppRegistrations,
} from "../api/enrolLtiAppRegistrations/queries";
import {
  enrolLtiAppRegistrationIdSchema,
  insertEnrolLtiAppRegistrationParams,
  updateEnrolLtiAppRegistrationParams,
} from "../db/schema/enrolLtiAppRegistrations";
import { publicProcedure, router } from "../server/trpc";

export const enrolLtiAppRegistrationsRouter = router({
  getEnrolLtiAppRegistrations: publicProcedure.query(async () => {
    return getEnrolLtiAppRegistrations();
  }),
  getEnrolLtiAppRegistrationById: publicProcedure
    .input(enrolLtiAppRegistrationIdSchema)
    .query(async ({ input }) => {
      return getEnrolLtiAppRegistrationById(input.id);
    }),
  createEnrolLtiAppRegistration: publicProcedure
    .input(insertEnrolLtiAppRegistrationParams)
    .mutation(async ({ input }) => {
      return createEnrolLtiAppRegistration(input);
    }),
  updateEnrolLtiAppRegistration: publicProcedure
    .input(updateEnrolLtiAppRegistrationParams)
    .mutation(async ({ input }) => {
      return updateEnrolLtiAppRegistration(input.id, input);
    }),
  deleteEnrolLtiAppRegistration: publicProcedure
    .input(enrolLtiAppRegistrationIdSchema)
    .mutation(async ({ input }) => {
      return deleteEnrolLtiAppRegistration(input.id);
    }),
});
