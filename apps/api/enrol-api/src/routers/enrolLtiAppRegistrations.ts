import {
  enrolLtiAppRegistrationIdSchema,
  insertEnrolLtiAppRegistrationParams,
  updateEnrolLtiAppRegistrationParams,
} from "@soco/enrol-db/schema/enrolLtiAppRegistrations";

import {
  createEnrolLtiAppRegistration,
  deleteEnrolLtiAppRegistration,
  updateEnrolLtiAppRegistration,
} from "../api/enrolLtiAppRegistrations/mutations";
import {
  getEnrolLtiAppRegistrationById,
  getEnrolLtiAppRegistrations,
} from "../api/enrolLtiAppRegistrations/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const enrolLtiAppRegistrationsRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
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
