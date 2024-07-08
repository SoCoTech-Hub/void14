import { getEnrolLtiLti2NonceById, getEnrolLtiLti2Nonces } from "../api/enrolLtiLti2Nonces/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  enrolLtiLti2NonceIdSchema,
  insertEnrolLtiLti2NonceParams,
  updateEnrolLtiLti2NonceParams,
} from "@soco/enrol-db/schema/enrolLtiLti2Nonces";
import { createEnrolLtiLti2Nonce, deleteEnrolLtiLti2Nonce, updateEnrolLtiLti2Nonce } from "../api/enrolLtiLti2Nonces/mutations";

export const enrolLtiLti2NoncesRouter =createTRPCRouter({
  getEnrolLtiLti2Nonces: publicProcedure.query(async () => {
    return getEnrolLtiLti2Nonces();
  }),
  getEnrolLtiLti2NonceById: publicProcedure.input(enrolLtiLti2NonceIdSchema).query(async ({ input }) => {
    return getEnrolLtiLti2NonceById(input.id);
  }),
  createEnrolLtiLti2Nonce: publicProcedure
    .input(insertEnrolLtiLti2NonceParams)
    .mutation(async ({ input }) => {
      return createEnrolLtiLti2Nonce(input);
    }),
  updateEnrolLtiLti2Nonce: publicProcedure
    .input(updateEnrolLtiLti2NonceParams)
    .mutation(async ({ input }) => {
      return updateEnrolLtiLti2Nonce(input.id, input);
    }),
  deleteEnrolLtiLti2Nonce: publicProcedure
    .input(enrolLtiLti2NonceIdSchema)
    .mutation(async ({ input }) => {
      return deleteEnrolLtiLti2Nonce(input.id);
    }),
});
