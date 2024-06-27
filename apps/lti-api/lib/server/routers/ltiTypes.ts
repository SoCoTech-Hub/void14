import { getLtiTypeById, getLtiTypes } from "@/lib/api/ltiTypes/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  ltiTypeIdSchema,
  insertLtiTypeParams,
  updateLtiTypeParams,
} from "@/lib/db/schema/ltiTypes";
import { createLtiType, deleteLtiType, updateLtiType } from "@/lib/api/ltiTypes/mutations";

export const ltiTypesRouter = router({
  getLtiTypes: publicProcedure.query(async () => {
    return getLtiTypes();
  }),
  getLtiTypeById: publicProcedure.input(ltiTypeIdSchema).query(async ({ input }) => {
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
