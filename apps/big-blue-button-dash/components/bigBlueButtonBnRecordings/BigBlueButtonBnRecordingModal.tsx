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
import BigBlueButtonBnRecordingForm from './BigBlueButtonBnRecordingForm'
import { BigBlueButtonBnRecording } from '@/lib/db/schema/bigBlueButtonBnRecordings'

export default function BigBlueButtonBnRecordingModal({
	bigBlueButtonBnRecording,
	emptyState
}: {
	bigBlueButtonBnRecording?: BigBlueButtonBnRecording
	emptyState?: boolean
}) {
	const [open, setOpen] = useState(false)
	const closeModal = () => setOpen(false)
	const editing = !!bigBlueButtonBnRecording?.id
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
						New Big Blue Button Recording
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
						{editing ? 'Edit' : 'Create'} Big Blue Button Recording
					</DialogTitle>
				</DialogHeader>
				<div className='px-5 pb-5'>
					<BigBlueButtonBnRecordingForm
						closeModal={closeModal}
						bigBlueButtonBnRecording={bigBlueButtonBnRecording}
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}