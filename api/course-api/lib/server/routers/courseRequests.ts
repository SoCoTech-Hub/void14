import { getCourseRequestById, getCourseRequests } from "@/lib/api/courseRequests/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  courseRequestIdSchema,
  insertCourseRequestParams,
  updateCourseRequestParams,
} from "@/lib/db/schema/courseRequests";
import { createCourseRequest, deleteCourseRequest, updateCourseRequest } from "@/lib/api/courseRequests/mutations";

export const courseRequestsRouter = router({
  getCourseRequests: publicProcedure.query(async () => {
    return getCourseRequests();
  }),
  getCourseRequestById: publicProcedure.input(courseRequestIdSchema).query(async ({ input }) => {
    return getCourseRequestById(input.id);
  }),
  createCourseRequest: publicProcedure
    .input(insertCourseRequestParams)
    .mutation(async ({ input }) => {
      return createCourseRequest(input);
    }),
  updateCourseRequest: publicProcedure
    .input(updateCourseRequestParams)
    .mutation(async ({ input }) => {
      return updateCourseRequest(input.id, input);
    }),
  deleteCourseRequest: publicProcedure
    .input(courseRequestIdSchema)
    .mutation(async ({ input }) => {
      return deleteCourseRequest(input.id);
    }),
});
