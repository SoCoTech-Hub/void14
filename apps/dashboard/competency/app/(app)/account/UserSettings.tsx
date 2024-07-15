'use client'
import UpdateNameCard from './UpdateNameCard'
import UpdateEmailCard from './UpdateEmailCard'
import { AuthSession } from '@soco/auth-service'

export default function UserSettings({
	session
}: {
	session: AuthSession['session']
}) {
	return (
		<>
			<UpdateNameCard name={session?.user.name ?? ''} />
			<UpdateEmailCard email={session?.user.email ?? ''} />
		</>
	)
}
