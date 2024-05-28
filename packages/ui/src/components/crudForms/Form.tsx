'use client'

import {
	useForm,
	FormProvider,
	UseFormReturn,
	FieldValues
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../ui/button.js'

type GenericFormProps<T extends FieldValues> = {
	defaultValues: T
	schema: z.ZodType<T>
	onSubmit: (values: T) => void
	closeModal?: () => void
	children: React.ReactNode
	isSubmitting: boolean
	editing?: boolean
	onDelete?: () => void
}

function GenericForm<T extends FieldValues>({
	defaultValues,
	schema,
	onSubmit,
	closeModal,
	children,
	isSubmitting,
	editing = false,
	onDelete
}: GenericFormProps<T>) {
	const methods = useForm<T>({
		resolver: zodResolver(schema),
		defaultValues
	})

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className='space-y-8'
			>
				{children}
				<div className='flex space-x-4'>
					<Button
						type='submit'
						className='mr-1'
						disabled={isSubmitting}
					>
						{editing
							? `Sav${isSubmitting ? 'ing...' : 'e'}`
							: `Creat${isSubmitting ? 'ing...' : 'e'}`}
					</Button>
					{editing && onDelete && (
						<Button
							type='button'
							variant='destructive'
							onClick={onDelete}
						>
							Delet{isSubmitting ? 'ing...' : 'e'}
						</Button>
					)}
				</div>
			</form>
		</FormProvider>
	)
}

export default GenericForm
