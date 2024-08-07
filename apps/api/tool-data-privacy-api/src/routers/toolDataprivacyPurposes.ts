import {
  insertToolDataprivacyPurposeParams,
  toolDataprivacyPurposeIdSchema,
  updateToolDataprivacyPurposeParams,
} from "@soco/tool-data-privacy-db/schema/toolDataprivacyPurposes";

import {
  createToolDataprivacyPurpose,
  deleteToolDataprivacyPurpose,
  updateToolDataprivacyPurpose,
} from "../api/toolDataprivacyPurposes/mutations";
import {
  getToolDataprivacyPurposeById,
  getToolDataprivacyPurposes,
} from "../api/toolDataprivacyPurposes/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const toolDataprivacyPurposesRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
  getToolDataprivacyPurposes: publicProcedure.query(async () => {
    return getToolDataprivacyPurposes();
  }),
  getToolDataprivacyPurposeById: publicProcedure
    .input(toolDataprivacyPurposeIdSchema)
    .query(async ({ input }) => {
      return getToolDataprivacyPurposeById(input.id);
    }),
  createToolDataprivacyPurpose: publicProcedure
    .input(insertToolDataprivacyPurposeParams)
    .mutation(async ({ input }) => {
      return createToolDataprivacyPurpose(input);
    }),
  updateToolDataprivacyPurpose: publicProcedure
    .input(updateToolDataprivacyPurposeParams)
    .mutation(async ({ input }) => {
      return updateToolDataprivacyPurpose(input.id, input);
    }),
  deleteToolDataprivacyPurpose: publicProcedure
    .input(toolDataprivacyPurposeIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolDataprivacyPurpose(input.id);
    }),
});
