import {
	getAdminPresetAppPlugById,
	getAdminPresetAppPlugs
} from '@/lib/api/adminPresetAppPlugs/queries'
import { publicProcedure, router } from '@/lib/server/trpc'
import {
	adminPresetAppPlugIdSchema,
	insertAdminPresetAppPlugParams,
	updateAdminPresetAppPlugParams
} from '@/lib/db/schema/adminPresetAppPlugs'
import {
	createAdminPresetAppPlug,
	deleteAdminPresetAppPlug,
	updateAdminPresetAppPlug
} from '@/lib/api/adminPresetAppPlugs/mutations'

export const adminPresetAppPlugsRouter = router({
	getAdminPresetAppPlugs: publicProcedure.query(async () => {
		return getAdminPresetAppPlugs()
	}),
	getAdminPresetAppPlugById: publicProcedure
		.input(adminPresetAppPlugIdSchema)
		.query(async ({ input }) => {
			return getAdminPresetAppPlugById(input.id)
		}),
	createAdminPresetAppPlug: publicProcedure
		.input(insertAdminPresetAppPlugParams)
		.mutation(async ({ input }) => {
			return createAdminPresetAppPlug(input)
		}),
	updateAdminPresetAppPlug: publicProcedure
		.input(updateAdminPresetAppPlugParams)
		.mutation(async ({ input }) => {
			return updateAdminPresetAppPlug(input.id, input)
		}),
	deleteAdminPresetAppPlug: publicProcedure
		.input(adminPresetAppPlugIdSchema)
		.mutation(async ({ input }) => {
			return deleteAdminPresetAppPlug(input.id)
		})
})
