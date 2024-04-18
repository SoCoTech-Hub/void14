import {
	getAdminPresetPlugById,
	getAdminPresetPlugs
} from '@/lib/api/adminPresetPlugs/queries'
import { publicProcedure, router } from '@/lib/server/trpc'
import {
	adminPresetPlugIdSchema,
	insertAdminPresetPlugParams,
	updateAdminPresetPlugParams
} from '@/lib/db/schema/adminPresetPlugs'
import {
	createAdminPresetPlug,
	deleteAdminPresetPlug,
	updateAdminPresetPlug
} from '@/lib/api/adminPresetPlugs/mutations'

export const adminPresetPlugsRouter = router({
	getAdminPresetPlugs: publicProcedure.query(async () => {
		return getAdminPresetPlugs()
	}),
	getAdminPresetPlugById: publicProcedure
		.input(adminPresetPlugIdSchema)
		.query(async ({ input }) => {
			return getAdminPresetPlugById(input.id)
		}),
	createAdminPresetPlug: publicProcedure
		.input(insertAdminPresetPlugParams)
		.mutation(async ({ input }) => {
			return createAdminPresetPlug(input)
		}),
	updateAdminPresetPlug: publicProcedure
		.input(updateAdminPresetPlugParams)
		.mutation(async ({ input }) => {
			return updateAdminPresetPlug(input.id, input)
		}),
	deleteAdminPresetPlug: publicProcedure
		.input(adminPresetPlugIdSchema)
		.mutation(async ({ input }) => {
			return deleteAdminPresetPlug(input.id)
		})
})
