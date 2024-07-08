import { db } from "@soco/admin-preset-db/index";
import { and, eq } from "drizzle-orm";
import { 
  AdminPresetsAppId, 
  NewAdminPresetsAppParams,
  UpdateAdminPresetsAppParams, 
  updateAdminPresetsAppSchema,
  insertAdminPresetsAppSchema, 
  adminPresetsApps,
  adminPresetsAppIdSchema 
} from "@soco/admin-preset-db/schema/adminPresetsApps";
import { getUserAuth } from "@/lib/auth/utils";

export const createAdminPresetsApp = async (adminPresetsApp: NewAdminPresetsAppParams) => {
  const { session } = await getUserAuth();
  const newAdminPresetsApp = insertAdminPresetsAppSchema.parse({ ...adminPresetsApp, userId: session?.user.id! });
  try {
    const [a] =  await db.insert(adminPresetsApps).values(newAdminPresetsApp).returning();
    return { adminPresetsApp: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAdminPresetsApp = async (id: AdminPresetsAppId, adminPresetsApp: UpdateAdminPresetsAppParams) => {
  const { session } = await getUserAuth();
  const { id: adminPresetsAppId } = adminPresetsAppIdSchema.parse({ id });
  const newAdminPresetsApp = updateAdminPresetsAppSchema.parse({ ...adminPresetsApp, userId: session?.user.id! });
  try {
    const [a] =  await db
     .update(adminPresetsApps)
     .set({...newAdminPresetsApp, updatedAt: new Date() })
     .where(and(eq(adminPresetsApps.id, adminPresetsAppId!), eq(adminPresetsApps.userId, session?.user.id!)))
     .returning();
    return { adminPresetsApp: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAdminPresetsApp = async (id: AdminPresetsAppId) => {
  const { session } = await getUserAuth();
  const { id: adminPresetsAppId } = adminPresetsAppIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(adminPresetsApps).where(and(eq(adminPresetsApps.id, adminPresetsAppId!), eq(adminPresetsApps.userId, session?.user.id!)))
    .returning();
    return { adminPresetsApp: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

