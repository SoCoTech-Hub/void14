import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { CourseRequestId } from "../db/schema/courseRequests";
import { db } from "../db/index";
import {
  courseRequestIdSchema,
  courseRequests,
} from "../db/schema/courseRequests";

export const getCourseRequests = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(courseRequests)
    .where(eq(courseRequests.userId, session?.user.id!));
  const c = rows;
  return { courseRequests: c };
};

export const getCourseRequestById = async (id: CourseRequestId) => {
  const { session } = await getUserAuth();
  const { id: courseRequestId } = courseRequestIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(courseRequests)
    .where(
      and(
        eq(courseRequests.id, courseRequestId),
        eq(courseRequests.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const c = row;
  return { courseRequest: c };
};
