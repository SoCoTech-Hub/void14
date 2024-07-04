import {
  createEnrolLtiLti2ShareKey,
  deleteEnrolLtiLti2ShareKey,
  updateEnrolLtiLti2ShareKey,
} from "../api/enrolLtiLti2ShareKeys/mutations";
import {
  getEnrolLtiLti2ShareKeyById,
  getEnrolLtiLti2ShareKeys,
} from "../api/enrolLtiLti2ShareKeys/queries";
import {
  enrolLtiLti2ShareKeyIdSchema,
  insertEnrolLtiLti2ShareKeyParams,
  updateEnrolLtiLti2ShareKeyParams,
} from "../db/schema/enrolLtiLti2ShareKeys";
import { publicProcedure, router } from "../server/trpc";

export const enrolLtiLti2ShareKeysRouter = router({
  getEnrolLtiLti2ShareKeys: publicProcedure.query(async () => {
    return getEnrolLtiLti2ShareKeys();
  }),
  getEnrolLtiLti2ShareKeyById: publicProcedure
    .input(enrolLtiLti2ShareKeyIdSchema)
    .query(async ({ input }) => {
      return getEnrolLtiLti2ShareKeyById(input.id);
    }),
  createEnrolLtiLti2ShareKey: publicProcedure
    .input(insertEnrolLtiLti2ShareKeyParams)
    .mutation(async ({ input }) => {
      return createEnrolLtiLti2ShareKey(input);
    }),
  updateEnrolLtiLti2ShareKey: publicProcedure
    .input(updateEnrolLtiLti2ShareKeyParams)
    .mutation(async ({ input }) => {
      return updateEnrolLtiLti2ShareKey(input.id, input);
    }),
  deleteEnrolLtiLti2ShareKey: publicProcedure
    .input(enrolLtiLti2ShareKeyIdSchema)
    .mutation(async ({ input }) => {
      return deleteEnrolLtiLti2ShareKey(input.id);
    }),
});
