import MassMailRecipientList from '@/components/massMailRecipients/MassMailRecipientList'
import NewMassMailRecipientModal from '@/components/massMailRecipients/MassMailRecipientModal'
import { api } from '@/lib/trpc/api'
import { checkAuth } from '@/lib/auth/utils'

export default async function MassMailRecipients() {
	await checkAuth()
	const { massMailRecipients } =
		await api.massMailRecipients.getMassMailRecipients.query()

	return (
		<main>
			<div className='flex justify-between'>
				<h1 className='font-semibold text-2xl my-2'>Mass Mail Recipients</h1>
				<NewMassMailRecipientModal />
			</div>
			<MassMailRecipientList massMailRecipients={massMailRecipients} />
		</main>
	)
}
