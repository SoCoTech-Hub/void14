import {
	getAdminPresetItById,
	getAdminPresetIts
} from '@/lib/api/adminPresetIts/queries'
import { publicProcedure, router } from '@/lib/server/trpc'
import {
	adminPresetItIdSchema,
	insertAdminPresetItParams,
	updateAdminPresetItParams
} from '@/lib/db/schema/adminPresetIts'
import {
	createAdminPresetIt,
	deleteAdminPresetIt,
	updateAdminPresetIt
} from '@/lib/api/adminPresetIts/mutations'

export const adminPresetItsRouter = router({
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
