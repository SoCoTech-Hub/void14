import {
	getAdminPresetItById,
	getAdminPresetIts
} from '../api/adminPresetIts/queries'
import { publicProcedure,createTRPCRouter } from '../trpc'
import {
	adminPresetItIdSchema,
	insertAdminPresetItParams,
	updateAdminPresetItParams
} from '@soco/admin-preset-db/schema/adminPresetIts'
import {
	createAdminPresetIt,
	deleteAdminPresetIt,
	updateAdminPresetIt
} from '../api/adminPresetIts/mutations'

export const adminPresetItsRouter =createTRPCRouter({
	getAdminPresetIts: publicProcedure.query(async () => {
		return getAdminPresetIts()
	}),
	getAdminPresetItById: publicProcedure
		.input(adminPresetItIdSchema)
		.query(async ({ input }) => {
			return getAdminPresetItById(input.id)
		}),
	createAdminPresetIt: publicProcedure
		.input(insertAdminPresetItParams)
		.mutation(async ({ input }) => {
			return createAdminPresetIt(input)
		}),
	updateAdminPresetIt: publicProcedure
		.input(updateAdminPresetItParams)
		.mutation(async ({ input }) => {
			return updateAdminPresetIt(input.id, input)
		}),
	deleteAdminPresetIt: publicProcedure
		.input(adminPresetItIdSchema)
		.mutation(async ({ input }) => {
			return deleteAdminPresetIt(input.id)
		})
})
