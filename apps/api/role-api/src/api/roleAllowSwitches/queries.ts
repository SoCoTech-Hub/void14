import { db } from '@soco/role-db/index'
import { eq } from 'drizzle-orm'
import {
	type RoleAllowSwitchId,
	roleAllowSwitchIdSchema,
	roleAllowSwitches
} from '@soco/role-db/schema/roleAllowSwitches'
import { roles } from '@soco/role-db/schema/roles'

export const getRoleAllowSwitches = async () => {
	const rows = await db
		.select({
			roleAllowSwitch: roleAllowSwitches,
			role: roles,
			allowSwitch: roles
		})
		.from(roleAllowSwitches)
		.leftJoin(roles, eq(roleAllowSwitches.roleId, roles.id))
		.leftJoin(roles, eq(roleAllowSwitches.allowSwitchId, roles.id))
	const r = rows.map((r) => ({
		...r.roleAllowSwitch,
		role: r.role,
		allowSwitch: r.role
	}))
	return { roleAllowSwitches: r }
}

export const getRoleAllowSwitchById = async (id: RoleAllowSwitchId) => {
	const { id: roleAllowSwitchId } = roleAllowSwitchIdSchema.parse({ id })
	const [row] = await db
		.select({
			roleAllowSwitch: roleAllowSwitches,
			role: roles,
			allowSwitch: roles
		})
		.from(roleAllowSwitches)
		.where(eq(roleAllowSwitches.id, roleAllowSwitchId))
		.leftJoin(roles, eq(roleAllowSwitches.roleId, roles.id))
		.leftJoin(roles, eq(roleAllowSwitches.allowSwitchId, roles.id))
	if (row === undefined) return {}
	const r = {
		...row.roleAllowSwitch,
		role: row.role,
		allowSwitch: row.allowSwitch
	}
	return { roleAllowSwitch: r }
}
