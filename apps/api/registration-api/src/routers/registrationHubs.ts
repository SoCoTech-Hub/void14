import {
  insertRegistrationHubParams,
  registrationHubIdSchema,
  updateRegistrationHubParams,
} from "@soco/registration-db/schema/registrationHubs";

import {
  createRegistrationHub,
  deleteRegistrationHub,
  updateRegistrationHub,
} from "../api/registrationHubs/mutations";
import {
  getRegistrationHubById,
  getRegistrationHubs,
} from "../api/registrationHubs/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const registrationHubsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getRegistrationHubs: publicProcedure.query(async () => {
      return getRegistrationHubs();
    }),
    getRegistrationHubById: publicProcedure
      .input(registrationHubIdSchema)
      .query(async ({ input }) => {
        return getRegistrationHubById(input.id);
      }),
    createRegistrationHub: publicProcedure
      .input(insertRegistrationHubParams)
      .mutation(async ({ input }) => {
        return createRegistrationHub(input);
      }),
    updateRegistrationHub: publicProcedure
      .input(updateRegistrationHubParams)
      .mutation(async ({ input }) => {
        return updateRegistrationHub(input.id, input);
      }),
    deleteRegistrationHub: publicProcedure
      .input(registrationHubIdSchema)
      .mutation(async ({ input }) => {
        return deleteRegistrationHub(input.id);
      }),
  });
