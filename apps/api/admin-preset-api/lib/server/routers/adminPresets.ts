import {
	getAdminPresetById,
	getAdminPresets
} from '@/lib/api/adminPresets/queries'
import { publicProcedure, router } from '@/lib/server/trpc'
import {
	adminPresetIdSchema,
	insertAdminPresetParams,
	updateAdminPresetParams
} from '@/lib/db/schema/adminPresets'
import {
	createAdminPreset,
	deleteAdminPreset,
	updateAdminPreset
} from '@/lib/api/adminPresets/mutations'

export const adminPresetsRouter = router({
	getAdminPresets: publicProcedure.query(async () => {
		return getAdminPresets()
	}),
	getAdminPresetById: publicProcedure
		.input(adminPresetIdSchema)
		.query(async ({ input }) => {
			return getAdminPresetById(input.id)
		}),
	createAdminPreset: publicProcedure
		.input(insertAdminPresetParams)
		.mutation(async ({ input }) => {
			return createAdminPreset(input)
		}),
	updateAdminPreset: publicProcedure
		.input(updateAdminPresetParams)
		.mutation(async ({ input }) => {
			return updateAdminPreset(input.id, input)
		}),
	deleteAdminPreset: publicProcedure
		.input(adminPresetIdSchema)
		.mutation(async ({ input }) => {
			return deleteAdminPreset(input.id)
		})
})
