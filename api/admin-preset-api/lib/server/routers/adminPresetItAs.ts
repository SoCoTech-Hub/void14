import {
	getAdminPresetItAById,
	getAdminPresetItAs
} from '@/lib/api/adminPresetItAs/queries'
import { publicProcedure, router } from '@/lib/server/trpc'
import {
	adminPresetItAIdSchema,
	insertAdminPresetItAParams,
	updateAdminPresetItAParams
} from '@/lib/db/schema/adminPresetItAs'
import {
	createAdminPresetItA,
	deleteAdminPresetItA,
	updateAdminPresetItA
} from '@/lib/api/adminPresetItAs/mutations'

export const adminPresetItAsRouter = router({
	getAdminPresetItAs: publicProcedure.query(async () => {
		return getAdminPresetItAs()
	}),
	getAdminPresetItAById: publicProcedure
		.input(adminPresetItAIdSchema)
		.query(async ({ input }) => {
			return getAdminPresetItAById(input.id)
		}),
	createAdminPresetItA: publicProcedure
		.input(insertAdminPresetItAParams)
		.mutation(async ({ input }) => {
			return createAdminPresetItA(input)
		}),
	updateAdminPresetItA: publicProcedure
		.input(updateAdminPresetItAParams)
		.mutation(async ({ input }) => {
			return updateAdminPresetItA(input.id, input)
		}),
	deleteAdminPresetItA: publicProcedure
		.input(adminPresetItAIdSchema)
		.mutation(async ({ input }) => {
			return deleteAdminPresetItA(input.id)
		})
})
