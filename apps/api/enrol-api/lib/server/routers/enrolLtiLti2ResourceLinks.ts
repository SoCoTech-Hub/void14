import { getEnrolLtiLti2ResourceLinkById, getEnrolLtiLti2ResourceLinks } from "@/lib/api/enrolLtiLti2ResourceLinks/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  enrolLtiLti2ResourceLinkIdSchema,
  insertEnrolLtiLti2ResourceLinkParams,
  updateEnrolLtiLti2ResourceLinkParams,
} from "@/lib/db/schema/enrolLtiLti2ResourceLinks";
import { createEnrolLtiLti2ResourceLink, deleteEnrolLtiLti2ResourceLink, updateEnrolLtiLti2ResourceLink } from "@/lib/api/enrolLtiLti2ResourceLinks/mutations";

export const enrolLtiLti2ResourceLinksRouter = router({
  getEnrolLtiLti2ResourceLinks: publicProcedure.query(async () => {
    return getEnrolLtiLti2ResourceLinks();
  }),
  getEnrolLtiLti2ResourceLinkById: publicProcedure.input(enrolLtiLti2ResourceLinkIdSchema).query(async ({ input }) => {
    return getEnrolLtiLti2ResourceLinkById(input.id);
  }),
  createEnrolLtiLti2ResourceLink: publicProcedure
    .input(insertEnrolLtiLti2ResourceLinkParams)
    .mutation(async ({ input }) => {
      return createEnrolLtiLti2ResourceLink(input);
    }),
  updateEnrolLtiLti2ResourceLink: publicProcedure
    .input(updateEnrolLtiLti2ResourceLinkParams)
    .mutation(async ({ input }) => {
      return updateEnrolLtiLti2ResourceLink(input.id, input);
    }),
  deleteEnrolLtiLti2ResourceLink: publicProcedure
    .input(enrolLtiLti2ResourceLinkIdSchema)
    .mutation(async ({ input }) => {
      return deleteEnrolLtiLti2ResourceLink(input.id);
    }),
});
