import {
  enrolLtiUserResourceLinkIdSchema,
  insertEnrolLtiUserResourceLinkParams,
  updateEnrolLtiUserResourceLinkParams,
} from "@soco/enrol-db/schema/enrolLtiUserResourceLinks";

import {
  createEnrolLtiUserResourceLink,
  deleteEnrolLtiUserResourceLink,
  updateEnrolLtiUserResourceLink,
} from "../api/enrolLtiUserResourceLinks/mutations";
import {
  getEnrolLtiUserResourceLinkById,
  getEnrolLtiUserResourceLinks,
} from "../api/enrolLtiUserResourceLinks/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const enrolLtiUserResourceLinksRouter = createTRPCRouter({
  getEnrolLtiUserResourceLinks: publicProcedure.query(async () => {
    return getEnrolLtiUserResourceLinks();
  }),
  getEnrolLtiUserResourceLinkById: publicProcedure
    .input(enrolLtiUserResourceLinkIdSchema)
    .query(async ({ input }) => {
      return getEnrolLtiUserResourceLinkById(input.id);
    }),
  createEnrolLtiUserResourceLink: publicProcedure
    .input(insertEnrolLtiUserResourceLinkParams)
    .mutation(async ({ input }) => {
      return createEnrolLtiUserResourceLink(input);
    }),
  updateEnrolLtiUserResourceLink: publicProcedure
    .input(updateEnrolLtiUserResourceLinkParams)
    .mutation(async ({ input }) => {
      return updateEnrolLtiUserResourceLink(input.id, input);
    }),
  deleteEnrolLtiUserResourceLink: publicProcedure
    .input(enrolLtiUserResourceLinkIdSchema)
    .mutation(async ({ input }) => {
      return deleteEnrolLtiUserResourceLink(input.id);
    }),
});
