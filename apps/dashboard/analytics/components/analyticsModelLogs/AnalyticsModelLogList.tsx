'use client'
import { CompleteAnalyticsModelLog } from '@soco/analytics-db/schema/analyticsModelLogs'
import { trpc } from '@/lib/trpc/client'
import AnalyticsModelLogModal from './AnalyticsModelLogModal'

export default function AnalyticsModelLogList({
	analyticsModelLogs
}: {
	analyticsModelLogs: CompleteAnalyticsModelLog[]
}) {
	const { data: a } = trpc.analyticsModelLogs.getAnalyticsModelLogs.useQuery(
		undefined,
		{
			initialData: { analyticsModelLogs },
			refetchOnMount: false
		}
	)

	if (a.analyticsModelLogs.length === 0) {
		return <EmptyState />
	}

	return (
		<ul>
			{a.analyticsModelLogs.map((analyticsModelLog) => (
				<AnalyticsModelLog
					analyticsModelLog={analyticsModelLog}
					key={analyticsModelLog.id}
				/>
			))}
		</ul>
	)
}

const AnalyticsModelLog = ({
	analyticsModelLog
}: {
	analyticsModelLog: CompleteAnalyticsModelLog
}) => {
	return (
		<li className='flex justify-between my-2'>
			<div className='w-full'>
				<div>{analyticsModelLog.dir}</div>
			</div>
			<AnalyticsModelLogModal analyticsModelLog={analyticsModelLog} />
		</li>
	)
}

const EmptyState = () => {
	return (
		<div className='text-center'>
			<h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
				No analytics models logs
			</h3>
			<p className='mt-1 text-sm text-muted-foreground'>
				Get started by creating a new analytics models log.
			</p>
			<div className='mt-6'>
				<AnalyticsModelLogModal emptyState={true} />
			</div>
		</div>
	)
}
