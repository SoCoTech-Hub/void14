import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type InfectedFileId, infectedFileIdSchema, infectedFiles } from "@/lib/db/schema/infectedFiles";

export const getInfectedFiles = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(infectedFiles).where(eq(infectedFiles.userId, session?.user.id!));
  const i = rows
  return { infectedFiles: i };
};

export const getInfectedFileById = async (id: InfectedFileId) => {
  const { session } = await getUserAuth();
  const { id: infectedFileId } = infectedFileIdSchema.parse({ id });
  const [row] = await db.select().from(infectedFiles).where(and(eq(infectedFiles.id, infectedFileId), eq(infectedFiles.userId, session?.user.id!)));
  if (row === undefined) return {};
  const i = row;
  return { infectedFile: i };
};


