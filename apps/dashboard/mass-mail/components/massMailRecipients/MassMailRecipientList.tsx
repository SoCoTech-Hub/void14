'use client'
import { CompleteMassMailRecipient } from '@/lib/db/schema/massMailRecipients'
import { trpc } from '@/lib/trpc/client'
import MassMailRecipientModal from './MassMailRecipientModal'

export default function MassMailRecipientList({
	massMailRecipients
}: {
	massMailRecipients: CompleteMassMailRecipient[]
}) {
	const { data: m } = trpc.massMailRecipients.getMassMailRecipients.useQuery(
		undefined,
		{
			initialData: { massMailRecipients },
			refetchOnMount: false
		}
	)

	if (m.massMailRecipients.length === 0) {
		return <EmptyState />
	}

	return (
		<ul>
			{m.massMailRecipients.map((massMailRecipient) => (
				<MassMailRecipient
					massMailRecipient={massMailRecipient}
					key={massMailRecipient.id}
				/>
			))}
		</ul>
	)
}

const MassMailRecipient = ({
	massMailRecipient
}: {
	massMailRecipient: CompleteMassMailRecipient
}) => {
	return (
		<li className='flex justify-between my-2'>
			<div className='w-full'>
				<div>{massMailRecipient.name}</div>
			</div>
			<MassMailRecipientModal massMailRecipient={massMailRecipient} />
		</li>
	)
}

const EmptyState = () => {
	return (
		<div className='text-center'>
			<h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
				No mass mail recipients
			</h3>
			<p className='mt-1 text-sm text-muted-foreground'>
				Get started by creating a new mass mail recipient.
			</p>
			<div className='mt-6'>
				<MassMailRecipientModal emptyState={true} />
			</div>
		</div>
	)
}
