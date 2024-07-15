'use client'
import { CompleteInmailResponse } from '@soco/inmail-db/schema/inmailResponses'
import { trpc } from '@/lib/trpc/client'
import InmailResponseModal from './InmailResponseModal'

export default function InmailResponseList({
	inmailResponses
}: {
	inmailResponses: CompleteInmailResponse[]
}) {
	const { data: i } = trpc.inmailResponses.getInmailResponses.useQuery(
		undefined,
		{
			initialData: { inmailResponses },
			refetchOnMount: false
		}
	)

	if (i.inmailResponses.length === 0) {
		return <EmptyState />
	}

	return (
		<ul>
			{i.inmailResponses.map((inmailResponse) => (
				<InmailResponse
					inmailResponse={inmailResponse}
					key={inmailResponse.id}
				/>
			))}
		</ul>
	)
}

const InmailResponse = ({
	inmailResponse
}: {
	inmailResponse: CompleteInmailResponse
}) => {
	return (
		<li className='flex justify-between my-2'>
			<div className='w-full flex flex-row gap-x-2'>
				<div>{inmailResponse.userId}</div>
				<div>{inmailResponse.inmail?.subject}</div>
				<div>{inmailResponse.read ? 'read' : 'unread'}</div>
			</div>
			<InmailResponseModal inmailResponse={inmailResponse} />
		</li>
	)
}

const EmptyState = () => {
	return (
		<div className='text-center'>
			<h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
				No inmail responses
			</h3>
			<p className='mt-1 text-sm text-muted-foreground'>
				Get started by creating a new inmail response.
			</p>
			<div className='mt-6'>
				<InmailResponseModal emptyState={true} />
			</div>
		</div>
	)
}
