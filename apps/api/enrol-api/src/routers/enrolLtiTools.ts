import { getEnrolLtiToolById, getEnrolLtiTools } from "../api/enrolLtiTools/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  enrolLtiToolIdSchema,
  insertEnrolLtiToolParams,
  updateEnrolLtiToolParams,
} from "@soco/enrol-db/schema/enrolLtiTools";
import { createEnrolLtiTool, deleteEnrolLtiTool, updateEnrolLtiTool } from "../api/enrolLtiTools/mutations";

export const enrolLtiToolsRouter =createTRPCRouter({
  getEnrolLtiTools: publicProcedure.query(async () => {
    return getEnrolLtiTools();
  }),
  getEnrolLtiToolById: publicProcedure.input(enrolLtiToolIdSchema).query(async ({ input }) => {
    return getEnrolLtiToolById(input.id);
  }),
  createEnrolLtiTool: publicProcedure
    .input(insertEnrolLtiToolParams)
    .mutation(async ({ input }) => {
      return createEnrolLtiTool(input);
    }),
  updateEnrolLtiTool: publicProcedure
    .input(updateEnrolLtiToolParams)
    .mutation(async ({ input }) => {
      return updateEnrolLtiTool(input.id, input);
    }),
  deleteEnrolLtiTool: publicProcedure
    .input(enrolLtiToolIdSchema)
    .mutation(async ({ input }) => {
      return deleteEnrolLtiTool(input.id);
    }),
});
