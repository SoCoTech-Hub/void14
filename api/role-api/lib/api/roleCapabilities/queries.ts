import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type RoleCapabilityId, roleCapabilityIdSchema, roleCapabilities } from "@/lib/db/schema/roleCapabilities";
import { roles } from "@/lib/db/schema/roles";

export const getRoleCapabilities = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ roleCapability: roleCapabilities, role: roles }).from(roleCapabilities).leftJoin(roles, eq(roleCapabilities.roleId, roles.id)).where(eq(roleCapabilities.userId, session?.user.id!));
  const r = rows .map((r) => ({ ...r.roleCapability, role: r.role})); 
  return { roleCapabilities: r };
};

export const getRoleCapabilityById = async (id: RoleCapabilityId) => {
  const { session } = await getUserAuth();
  const { id: roleCapabilityId } = roleCapabilityIdSchema.parse({ id });
  const [row] = await db.select({ roleCapability: roleCapabilities, role: roles }).from(roleCapabilities).where(and(eq(roleCapabilities.id, roleCapabilityId), eq(roleCapabilities.userId, session?.user.id!))).leftJoin(roles, eq(roleCapabilities.roleId, roles.id));
  if (row === undefined) return {};
  const r =  { ...row.roleCapability, role: row.role } ;
  return { roleCapability: r };
};


