import type { InfectedFileId } from "@soco/file-db/schema/infectedFiles";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/file-db";
import { db } from "@soco/file-db/client";
import {
  infectedFileIdSchema,
  infectedFiles,
} from "@soco/file-db/schema/infectedFiles";

export const getInfectedFiles = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(infectedFiles)
    .where(eq(infectedFiles.userId, session?.user.id!));
  const i = rows;
  return { infectedFiles: i };
};

export const getInfectedFileById = async (id: InfectedFileId) => {
  const { session } = await getUserAuth();
  const { id: infectedFileId } = infectedFileIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(infectedFiles)
    .where(
      and(
        eq(infectedFiles.id, infectedFileId),
        eq(infectedFiles.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const i = row;
  return { infectedFile: i };
};
