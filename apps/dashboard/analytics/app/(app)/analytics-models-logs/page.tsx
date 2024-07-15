import AnalyticsModelLogList from '@/components/analyticsModelLogs/AnalyticsModelLogList'
import NewAnalyticsModelLogModal from '@/components/analyticsModelLogs/AnalyticsModelLogModal'
import { api } from '@/lib/trpc/api'
import { checkAuth } from '@soco/auth-service'

export default async function AnalyticsModelLogs() {
	await checkAuth()
	const { analyticsModelLogs } =
		await api.analyticsModelLogs.getAnalyticsModelLogs.query()

	return (
		<main>
			<div className='flex justify-between'>
				<h1 className='font-semibold text-2xl my-2'>Analytics Models Logs</h1>
				<NewAnalyticsModelLogModal />
			</div>
			<AnalyticsModelLogList analyticsModelLogs={analyticsModelLogs} />
		</main>
	)
}
