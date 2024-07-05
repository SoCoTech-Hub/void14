import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { FileConversionId } from "../../db/schema/fileConversions";
import { db } from "../../db/index";
import {
  fileConversionIdSchema,
  fileConversions,
} from "../../db/schema/fileConversions";

export const getFileConversions = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(fileConversions)
    .where(eq(fileConversions.userId, session?.user.id!));
  const f = rows;
  return { fileConversions: f };
};

export const getFileConversionById = async (id: FileConversionId) => {
  const { session } = await getUserAuth();
  const { id: fileConversionId } = fileConversionIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(fileConversions)
    .where(
      and(
        eq(fileConversions.id, fileConversionId),
        eq(fileConversions.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const f = row;
  return { fileConversion: f };
};
