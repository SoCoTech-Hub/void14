import { getRegistrationHubById, getRegistrationHubs } from "@/lib/api/registrationHubs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  registrationHubIdSchema,
  insertRegistrationHubParams,
  updateRegistrationHubParams,
} from "@/lib/db/schema/registrationHubs";
import { createRegistrationHub, deleteRegistrationHub, updateRegistrationHub } from "@/lib/api/registrationHubs/mutations";

export const registrationHubsRouter = router({
  getRegistrationHubs: publicProcedure.query(async () => {
    return getRegistrationHubs();
  }),
  getRegistrationHubById: publicProcedure.input(registrationHubIdSchema).query(async ({ input }) => {
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
