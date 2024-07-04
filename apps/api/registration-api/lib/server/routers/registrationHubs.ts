import {
  createRegistrationHub,
  deleteRegistrationHub,
  updateRegistrationHub,
} from "../api/registrationHubs/mutations";
import {
  getRegistrationHubById,
  getRegistrationHubs,
} from "../api/registrationHubs/queries";
import {
  insertRegistrationHubParams,
  registrationHubIdSchema,
  updateRegistrationHubParams,
} from "../db/schema/registrationHubs";
import { publicProcedure, router } from "../server/trpc";

export const registrationHubsRouter = router({
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
