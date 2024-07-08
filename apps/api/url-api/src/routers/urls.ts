import { getUrlById, getUrls } from "../api/urls/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  urlIdSchema,
  insertUrlParams,
  updateUrlParams,
} from "@soco/url-db/schema/urls";
import { createUrl, deleteUrl, updateUrl } from "../api/urls/mutations";

export const urlsRouter =createTRPCRouter({
  getUrls: publicProcedure.query(async () => {
    return getUrls();
  }),
  getUrlById: publicProcedure.input(urlIdSchema).query(async ({ input }) => {
    return getUrlById(input.id);
  }),
  createUrl: publicProcedure
    .input(insertUrlParams)
    .mutation(async ({ input }) => {
      return createUrl(input);
    }),
  updateUrl: publicProcedure
    .input(updateUrlParams)
    .mutation(async ({ input }) => {
      return updateUrl(input.id, input);
    }),
  deleteUrl: publicProcedure
    .input(urlIdSchema)
    .mutation(async ({ input }) => {
      return deleteUrl(input.id);
    }),
});
