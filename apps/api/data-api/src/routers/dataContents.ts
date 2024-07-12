import {
  dataContentIdSchema,
  insertDataContentParams,
  updateDataContentParams,
} from "@soco/data-db/schema/dataContents";

import {
  createDataContent,
  deleteDataContent,
  updateDataContent,
} from "../api/dataContents/mutations";
import {
  getDataContentById,
  getDataContents,
} from "../api/dataContents/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const dataContentsRouter = createTRPCRouter({
  getDataContents: publicProcedure.query(async () => {
    return getDataContents();
  }),
  getDataContentById: publicProcedure
    .input(dataContentIdSchema)
    .query(async ({ input }) => {
      return getDataContentById(input.id);
    }),
  createDataContent: publicProcedure
    .input(insertDataContentParams)
    .mutation(async ({ input }) => {
      return createDataContent(input);
    }),
  updateDataContent: publicProcedure
    .input(updateDataContentParams)
    .mutation(async ({ input }) => {
      return updateDataContent(input.id, input);
    }),
  deleteDataContent: publicProcedure
    .input(dataContentIdSchema)
    .mutation(async ({ input }) => {
      return deleteDataContent(input.id);
    }),
});
