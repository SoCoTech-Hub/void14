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
import BadgeIssueForm from './BadgeIssueForm'
import { BadgeIssue } from '@/lib/db/schema/badgeIssues'

export default function BadgeIssueModal({
	badgeIssue,
	emptyState
}: {
	badgeIssue?: BadgeIssue
	emptyState?: boolean
}) {
	const [open, setOpen] = useState(false)
	const closeModal = () => setOpen(false)
	const editing = !!badgeIssue?.id
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
						New Badge Issue
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
					<DialogTitle>{editing ? 'Edit' : 'Create'} Badge Issue</DialogTitle>
				</DialogHeader>
				<div className='px-5 pb-5'>
					<BadgeIssueForm
						closeModal={closeModal}
						badgeIssue={badgeIssue}
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}
