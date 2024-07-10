import {
	getAdminPresetAppPlugById,
	getAdminPresetAppPlugs
} from '../api/adminPresetAppPlugs/queries'
import { publicProcedure,createTRPCRouter } from '../trpc'
import {
	adminPresetAppPlugIdSchema,
	insertAdminPresetAppPlugParams,
	updateAdminPresetAppPlugParams
} from '@soco/admin-preset-db/schema/adminPresetAppPlugs'
import {
	createAdminPresetAppPlug,
	deleteAdminPresetAppPlug,
	updateAdminPresetAppPlug
} from '../api/adminPresetAppPlugs/mutations'

export const adminPresetAppPlugsRouter =createTRPCRouter({
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
