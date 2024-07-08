import { getScormById, getScorms } from "../api/scorms/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  scormIdSchema,
  insertScormParams,
  updateScormParams,
} from "@soco/scorm-db/schema/scorms";
import { createScorm, deleteScorm, updateScorm } from "../api/scorms/mutations";

export const scormsRouter =createTRPCRouter({
  getScorms: publicProcedure.query(async () => {
    return getScorms();
  }),
  getScormById: publicProcedure.input(scormIdSchema).query(async ({ input }) => {
    return getScormById(input.id);
  }),
  createScorm: publicProcedure
    .input(insertScormParams)
    .mutation(async ({ input }) => {
      return createScorm(input);
    }),
  updateScorm: publicProcedure
    .input(updateScormParams)
    .mutation(async ({ input }) => {
      return updateScorm(input.id, input);
    }),
  deleteScorm: publicProcedure
    .input(scormIdSchema)
    .mutation(async ({ input }) => {
      return deleteScorm(input.id);
    }),
});
