import {
	getAdminpresetsAppItAById,
	getAdminpresetsAppItAs
} from '@/lib/api/adminpresetsAppItAs/queries'
import { publicProcedure, router } from '@/lib/server/trpc'
import {
	adminpresetsAppItAIdSchema,
	insertAdminpresetsAppItAParams,
	updateAdminpresetsAppItAParams
} from '@/lib/db/schema/adminpresetsAppItAs'
import {
	createAdminpresetsAppItA,
	deleteAdminpresetsAppItA,
	updateAdminpresetsAppItA
} from '@/lib/api/adminpresetsAppItAs/mutations'

export const adminpresetsAppItAsRouter = router({
	getAdminpresetsAppItAs: publicProcedure.query(async () => {
		return getAdminpresetsAppItAs()
	}),
	getAdminpresetsAppItAById: publicProcedure
		.input(adminpresetsAppItAIdSchema)
		.query(async ({ input }) => {
			return getAdminpresetsAppItAById(input.id)
		}),
	createAdminpresetsAppItA: publicProcedure
		.input(insertAdminpresetsAppItAParams)
		.mutation(async ({ input }) => {
			return createAdminpresetsAppItA(input)
		}),
	updateAdminpresetsAppItA: publicProcedure
		.input(updateAdminpresetsAppItAParams)
		.mutation(async ({ input }) => {
			return updateAdminpresetsAppItA(input.id, input)
		}),
	deleteAdminpresetsAppItA: publicProcedure
		.input(adminpresetsAppItAIdSchema)
		.mutation(async ({ input }) => {
			return deleteAdminpresetsAppItA(input.id)
		})
})
