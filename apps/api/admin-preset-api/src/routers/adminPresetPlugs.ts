import {
	getAdminPresetPlugById,
	getAdminPresetPlugs
} from '../api/adminPresetPlugs/queries'
import { publicProcedure,createTRPCRouter } from '../trpc'
import {
	adminPresetPlugIdSchema,
	insertAdminPresetPlugParams,
	updateAdminPresetPlugParams
} from '@soco/admin-preset-db/schema/adminPresetPlugs'
import {
	createAdminPresetPlug,
	deleteAdminPresetPlug,
	updateAdminPresetPlug
} from '../api/adminPresetPlugs/mutations'

export const adminPresetPlugsRouter =createTRPCRouter({
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
