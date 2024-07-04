import {
  createEnrolLtiLti2ResourceLink,
  deleteEnrolLtiLti2ResourceLink,
  updateEnrolLtiLti2ResourceLink,
} from "../api/enrolLtiLti2ResourceLinks/mutations";
import {
  getEnrolLtiLti2ResourceLinkById,
  getEnrolLtiLti2ResourceLinks,
} from "../api/enrolLtiLti2ResourceLinks/queries";
import {
  enrolLtiLti2ResourceLinkIdSchema,
  insertEnrolLtiLti2ResourceLinkParams,
  updateEnrolLtiLti2ResourceLinkParams,
} from "../db/schema/enrolLtiLti2ResourceLinks";
import { publicProcedure, router } from "../server/trpc";

export const enrolLtiLti2ResourceLinksRouter = router({
  getEnrolLtiLti2ResourceLinks: publicProcedure.query(async () => {
    return getEnrolLtiLti2ResourceLinks();
  }),
  getEnrolLtiLti2ResourceLinkById: publicProcedure
    .input(enrolLtiLti2ResourceLinkIdSchema)
    .query(async ({ input }) => {
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
