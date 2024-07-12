import {
	getAdminpresetsAppItAById,
	getAdminpresetsAppItAs
} from '../api/adminpresetsAppItAs/queries'
import { publicProcedure,createTRPCRouter } from '../trpc'
import {
	adminpresetsAppItAIdSchema,
	insertAdminpresetsAppItAParams,
	updateAdminpresetsAppItAParams
} from '@soco/admin-preset-db/schema/adminpresetsAppItAs'
import {
	createAdminpresetsAppItA,
	deleteAdminpresetsAppItA,
	updateAdminpresetsAppItA
} from '../api/adminpresetsAppItAs/mutations'

export const adminpresetsAppItAsRouter =createTRPCRouter({
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
