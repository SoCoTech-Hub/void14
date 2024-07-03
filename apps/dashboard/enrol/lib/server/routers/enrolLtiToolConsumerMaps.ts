import { getEnrolLtiToolConsumerMapById, getEnrolLtiToolConsumerMaps } from "@/lib/api/enrolLtiToolConsumerMaps/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  enrolLtiToolConsumerMapIdSchema,
  insertEnrolLtiToolConsumerMapParams,
  updateEnrolLtiToolConsumerMapParams,
} from "@/lib/db/schema/enrolLtiToolConsumerMaps";
import { createEnrolLtiToolConsumerMap, deleteEnrolLtiToolConsumerMap, updateEnrolLtiToolConsumerMap } from "@/lib/api/enrolLtiToolConsumerMaps/mutations";

export const enrolLtiToolConsumerMapsRouter = router({
  getEnrolLtiToolConsumerMaps: publicProcedure.query(async () => {
    return getEnrolLtiToolConsumerMaps();
  }),
  getEnrolLtiToolConsumerMapById: publicProcedure.input(enrolLtiToolConsumerMapIdSchema).query(async ({ input }) => {
    return getEnrolLtiToolConsumerMapById(input.id);
  }),
  createEnrolLtiToolConsumerMap: publicProcedure
    .input(insertEnrolLtiToolConsumerMapParams)
    .mutation(async ({ input }) => {
      return createEnrolLtiToolConsumerMap(input);
    }),
  updateEnrolLtiToolConsumerMap: publicProcedure
    .input(updateEnrolLtiToolConsumerMapParams)
    .mutation(async ({ input }) => {
      return updateEnrolLtiToolConsumerMap(input.id, input);
    }),
  deleteEnrolLtiToolConsumerMap: publicProcedure
    .input(enrolLtiToolConsumerMapIdSchema)
    .mutation(async ({ input }) => {
      return deleteEnrolLtiToolConsumerMap(input.id);
    }),
});
