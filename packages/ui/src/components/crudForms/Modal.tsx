'use client'

import { useState, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../ui/dialog'
import { CourseCategory } from '@/lib/db/schema/courseCategories'

type ModalProps<T> = {
	triggerButton: ReactNode
	title: string
	children: ReactNode
	item?: T
	emptyState?: boolean
}

export default function Modal<T>({
	triggerButton,
	title,
	children,
	item,
	emptyState
}: ModalProps<T>) {
	const [open, setOpen] = useState(false)
	const closeModal = () => setOpen(false)
	const editing = !!item

	return (
		<Dialog
			onOpenChange={setOpen}
			open={open}
		>
			<DialogTrigger asChild>{triggerButton}</DialogTrigger>
			<DialogContent>
				<DialogHeader className='px-5 pt-5'>
					<DialogTitle>
						{editing ? `Edit ${title}` : `Create ${title}`}
					</DialogTitle>
				</DialogHeader>
				<div className='px-5 pb-5'>{children}</div>
			</DialogContent>
		</Dialog>
	)
}

export function CourseCategoryModal({
	courseCategory,
	emptyState
}: {
	courseCategory?: CourseCategory
	emptyState?: boolean
}) {
	const triggerButton = emptyState ? (
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
			New Course Category
		</Button>
	) : (
		<Button
			variant={courseCategory ? 'ghost' : 'outline'}
			size={courseCategory ? 'sm' : 'icon'}
		>
			{courseCategory ? 'Edit' : '+'}
		</Button>
	)

	return (
		<Modal
			triggerButton={triggerButton}
			title='Course Category'
			item={courseCategory}
		>
			<CourseCategoryForm
				closeModal={() => setOpen(false)}
				courseCategory={courseCategory}
			/>
		</Modal>
	)
}
