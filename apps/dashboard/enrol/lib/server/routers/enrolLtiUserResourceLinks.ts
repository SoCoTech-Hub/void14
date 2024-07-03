import { getEnrolLtiUserResourceLinkById, getEnrolLtiUserResourceLinks } from "@/lib/api/enrolLtiUserResourceLinks/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  enrolLtiUserResourceLinkIdSchema,
  insertEnrolLtiUserResourceLinkParams,
  updateEnrolLtiUserResourceLinkParams,
} from "@/lib/db/schema/enrolLtiUserResourceLinks";
import { createEnrolLtiUserResourceLink, deleteEnrolLtiUserResourceLink, updateEnrolLtiUserResourceLink } from "@/lib/api/enrolLtiUserResourceLinks/mutations";

export const enrolLtiUserResourceLinksRouter = router({
  getEnrolLtiUserResourceLinks: publicProcedure.query(async () => {
    return getEnrolLtiUserResourceLinks();
  }),
  getEnrolLtiUserResourceLinkById: publicProcedure.input(enrolLtiUserResourceLinkIdSchema).query(async ({ input }) => {
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
