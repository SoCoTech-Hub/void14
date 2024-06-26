import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type AdminPresetId, adminPresetIdSchema, adminPresets } from "@/lib/db/schema/adminPresets";

export const getAdminPresets = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(adminPresets).where(eq(adminPresets.userId, session?.user.id!));
  const a = rows
  return { adminPresets: a };
};

export const getAdminPresetById = async (id: AdminPresetId) => {
  const { session } = await getUserAuth();
  const { id: adminPresetId } = adminPresetIdSchema.parse({ id });
  const [row] = await db.select().from(adminPresets).where(and(eq(adminPresets.id, adminPresetId), eq(adminPresets.userId, session?.user.id!)));
  if (row === undefined) return {};
  const a = row;
  return { adminPreset: a };
};


