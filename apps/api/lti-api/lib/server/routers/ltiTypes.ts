import {
  createLtiType,
  deleteLtiType,
  updateLtiType,
} from "../api/ltiTypes/mutations";
import { getLtiTypeById, getLtiTypes } from "../api/ltiTypes/queries";
import {
  insertLtiTypeParams,
  ltiTypeIdSchema,
  updateLtiTypeParams,
} from "../db/schema/ltiTypes";
import { publicProcedure, router } from "../server/trpc";

export const ltiTypesRouter = router({
  getLtiTypes: publicProcedure.query(async () => {
    return getLtiTypes();
  }),
  getLtiTypeById: publicProcedure
    .input(ltiTypeIdSchema)
    .query(async ({ input }) => {
      return getLtiTypeById(input.id);
    }),
  createLtiType: publicProcedure
    .input(insertLtiTypeParams)
    .mutation(async ({ input }) => {
      return createLtiType(input);
    }),
  updateLtiType: publicProcedure
    .input(updateLtiTypeParams)
    .mutation(async ({ input }) => {
      return updateLtiType(input.id, input);
    }),
  deleteLtiType: publicProcedure
    .input(ltiTypeIdSchema)
    .mutation(async ({ input }) => {
      return deleteLtiType(input.id);
    }),
});
