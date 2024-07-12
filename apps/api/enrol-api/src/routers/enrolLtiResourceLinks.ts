import {
  enrolLtiResourceLinkIdSchema,
  insertEnrolLtiResourceLinkParams,
  updateEnrolLtiResourceLinkParams,
} from "@soco/enrol-db/schema/enrolLtiResourceLinks";

import {
  createEnrolLtiResourceLink,
  deleteEnrolLtiResourceLink,
  updateEnrolLtiResourceLink,
} from "../api/enrolLtiResourceLinks/mutations";
import {
  getEnrolLtiResourceLinkById,
  getEnrolLtiResourceLinks,
} from "../api/enrolLtiResourceLinks/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const enrolLtiResourceLinksRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getEnrolLtiResourceLinks: publicProcedure.query(async () => {
      return getEnrolLtiResourceLinks();
    }),
    getEnrolLtiResourceLinkById: publicProcedure
      .input(enrolLtiResourceLinkIdSchema)
      .query(async ({ input }) => {
        return getEnrolLtiResourceLinkById(input.id);
      }),
    createEnrolLtiResourceLink: publicProcedure
      .input(insertEnrolLtiResourceLinkParams)
      .mutation(async ({ input }) => {
        return createEnrolLtiResourceLink(input);
      }),
    updateEnrolLtiResourceLink: publicProcedure
      .input(updateEnrolLtiResourceLinkParams)
      .mutation(async ({ input }) => {
        return updateEnrolLtiResourceLink(input.id, input);
      }),
    deleteEnrolLtiResourceLink: publicProcedure
      .input(enrolLtiResourceLinkIdSchema)
      .mutation(async ({ input }) => {
        return deleteEnrolLtiResourceLink(input.id);
      }),
  });
