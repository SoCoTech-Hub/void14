'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../ui/dialog'
import BadgeBackpackOauth2Form from './BadgeBackpackOauth2Form'
import { BadgeBackpackOauth2 } from '@/lib/db/schema/badgeBackpackOauth2s'

export default function BadgeBackpackOauth2Modal({
	badgeBackpackOauth2,
	emptyState
}: {
	badgeBackpackOauth2?: BadgeBackpackOauth2
	emptyState?: boolean
}) {
	const [open, setOpen] = useState(false)
	const closeModal = () => setOpen(false)
	const editing = !!badgeBackpackOauth2?.id
	return (
		<Dialog
			onOpenChange={setOpen}
			open={open}
		>
			<DialogTrigger asChild>
				{emptyState ? (
					<Button>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='mr-1'
						>
							<path d='M5 12h14' />
							<path d='M12 5v14' />
						</svg>
						New Badge Backpack Oauth2
					</Button>
				) : (
					<Button
						variant={editing ? 'ghost' : 'outline'}
						size={editing ? 'sm' : 'icon'}
					>
						{editing ? 'Edit' : '+'}
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className='max-h-screen overflow-auto my-4 custom-scrollbar'>
				<DialogHeader className='px-5 pt-5'>
					<DialogTitle>
						{editing ? 'Edit' : 'Create'} Badge Backpack Oauth2
					</DialogTitle>
				</DialogHeader>
				<div className='px-5 pb-5'>
					<BadgeBackpackOauth2Form
						closeModal={closeModal}
						badgeBackpackOauth2={badgeBackpackOauth2}
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}
