import {
	getAdminPresetsAppById,
	getAdminPresetsApps
} from '@/lib/api/adminPresetsApps/queries'
import { publicProcedure, router } from '@/lib/server/trpc'
import {
	adminPresetsAppIdSchema,
	insertAdminPresetsAppParams,
	updateAdminPresetsAppParams
} from '@/lib/db/schema/adminPresetsApps'
import {
	createAdminPresetsApp,
	deleteAdminPresetsApp,
	updateAdminPresetsApp
} from '@/lib/api/adminPresetsApps/mutations'

export const adminPresetsAppsRouter = router({
	getAdminPresetsApps: publicProcedure.query(async () => {
		return getAdminPresetsApps()
	}),
	getAdminPresetsAppById: publicProcedure
		.input(adminPresetsAppIdSchema)
		.query(async ({ input }) => {
			return getAdminPresetsAppById(input.id)
		}),
	createAdminPresetsApp: publicProcedure
		.input(insertAdminPresetsAppParams)
		.mutation(async ({ input }) => {
			return createAdminPresetsApp(input)
		}),
	updateAdminPresetsApp: publicProcedure
		.input(updateAdminPresetsAppParams)
		.mutation(async ({ input }) => {
			return updateAdminPresetsApp(input.id, input)
		}),
	deleteAdminPresetsApp: publicProcedure
		.input(adminPresetsAppIdSchema)
		.mutation(async ({ input }) => {
			return deleteAdminPresetsApp(input.id)
		})
})
