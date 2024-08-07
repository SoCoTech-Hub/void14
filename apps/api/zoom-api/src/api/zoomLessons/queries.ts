import type { ZoomLessonId } from "@soco/zoom-db/schema/zoomLessons";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/zoom-db";
import { db } from "@soco/zoom-db/client";
import {
  zoomLessonIdSchema,
  zoomLessons,
} from "@soco/zoom-db/schema/zoomLessons";

export const getZoomLessons = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(zoomLessons)
    .where(eq(zoomLessons.userId, session?.user.id!));
  const z = rows;
  return { zoomLessons: z };
};

export const getZoomLessonById = async (id: ZoomLessonId) => {
  const { session } = await getUserAuth();
  const { id: zoomLessonId } = zoomLessonIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(zoomLessons)
    .where(
      and(
        eq(zoomLessons.id, zoomLessonId),
        eq(zoomLessons.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const z = row;
  return { zoomLesson: z };
};
