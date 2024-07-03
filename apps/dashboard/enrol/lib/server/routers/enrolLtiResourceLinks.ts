import { getEnrolLtiResourceLinkById, getEnrolLtiResourceLinks } from "@/lib/api/enrolLtiResourceLinks/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  enrolLtiResourceLinkIdSchema,
  insertEnrolLtiResourceLinkParams,
  updateEnrolLtiResourceLinkParams,
} from "@/lib/db/schema/enrolLtiResourceLinks";
import { createEnrolLtiResourceLink, deleteEnrolLtiResourceLink, updateEnrolLtiResourceLink } from "@/lib/api/enrolLtiResourceLinks/mutations";

export const enrolLtiResourceLinksRouter = router({
  getEnrolLtiResourceLinks: publicProcedure.query(async () => {
    return getEnrolLtiResourceLinks();
  }),
  getEnrolLtiResourceLinkById: publicProcedure.input(enrolLtiResourceLinkIdSchema).query(async ({ input }) => {
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
