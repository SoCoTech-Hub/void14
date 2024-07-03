import { db } from '@/lib/db/index'
import { eq } from 'drizzle-orm'
import {
	type RoleAllowOverrideId,
	roleAllowOverrideIdSchema,
	roleAllowOverrides
} from '@/lib/db/schema/roleAllowOverrides'
import { roles } from '@/lib/db/schema/roles'

export const getRoleAllowOverrides = async () => {
	const rows = await db
		.select({
			roleAllowOverride: roleAllowOverrides,
			role: roles,
			allowOverride: roles
		})
		.from(roleAllowOverrides)
		.leftJoin(roles, eq(roleAllowOverrides.roleId, roles.id))
		.leftJoin(roles, eq(roleAllowOverrides.allowOverrideId, roles.id))
	const r = rows.map((r) => ({
		...r.roleAllowOverride,
		role: r.role,
		allowOverride: r.allowOverride
	}))
	return { roleAllowOverrides: r }
}

export const getRoleAllowOverrideById = async (id: RoleAllowOverrideId) => {
	const { id: roleAllowOverrideId } = roleAllowOverrideIdSchema.parse({ id })
	const [row] = await db
		.select({
			roleAllowOverride: roleAllowOverrides,
			role: roles,
			allowOverride: roles
		})
		.from(roleAllowOverrides)
		.where(eq(roleAllowOverrides.id, roleAllowOverrideId))
		.leftJoin(roles, eq(roleAllowOverrides.roleId, roles.id))
		.leftJoin(roles, eq(roleAllowOverrides.allowOverrideId, roles.id))
	if (row === undefined) return {}
	const r = {
		...row.roleAllowOverride,
		role: row.role,
		allowOverride: row.allowOverride
	}
	return { roleAllowOverride: r }
}
