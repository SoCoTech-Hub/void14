import { db } from '@soco/role-db/index'
import { eq } from 'drizzle-orm'
import {
	type RoleAllowViewId,
	roleAllowViewIdSchema,
	roleAllowViews
} from '@soco/role-db/schema/roleAllowViews'
import { roles } from '@soco/role-db/schema/roles'

export const getRoleAllowViews = async () => {
	const rows = await db
		.select({ roleAllowView: roleAllowViews, role: roles })
		.from(roles)
		.leftJoin(roleAllowViews, eq(roleAllowViews.allowViewId, roles.id))
	const r = rows.map((r) => ({
		...r.roleAllowView,
		role: r.role
	}))
	return { roleAllowViews: r }
}

export const getRoleAllowViewById = async (id: RoleAllowViewId) => {
	const { id: roleAllowViewId } = roleAllowViewIdSchema.parse({ id })
	const [row] = await db
		.select({ roleAllowView: roleAllowViews, role: roles })
		.from(roles)
		.leftJoin(roleAllowViews, eq(roleAllowViews.roleId, roles.id))
		.where(eq(roleAllowViews.id, roleAllowViewId))
	if (row === undefined) return {}
	const r = { ...row.roleAllowView, role: row.role }
	return { roleAllowView: r }
}
