'use client'

import {
	AssignFeedbackEditpdfQueue,
	NewAssignFeedbackEditpdfQueueParams,
	insertAssignFeedbackEditpdfQueueParams
} from '@/lib/db/schema/assignFeedbackEditpdfQueues'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { trpc } from '@/lib/trpc/client'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const AssignFeedbackEditpdfQueueForm = ({
	assignFeedbackEditpdfQueue,
	closeModal
}: {
	assignFeedbackEditpdfQueue?: AssignFeedbackEditpdfQueue
	closeModal?: () => void
}) => {
	const editing = !!assignFeedbackEditpdfQueue?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAssignFeedbackEditpdfQueueParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAssignFeedbackEditpdfQueueParams),
		defaultValues: assignFeedbackEditpdfQueue ?? {
			attemptedConversions: '',
			submissionAttempt: 0,
			submissionId: ''
		}
	})

	const onError = async (
		action: 'create' | 'update' | 'delete',
		data?: { error?: string }
	) => {
		if (data?.error) {
			toast.error(data.error)
			return
		}
		return
	}

	const onSuccess = async (
		action: 'create' | 'update' | 'delete',
		data?: { error?: string }
	) => {
		if (data?.error) {
			toast.error(data.error)
			return
		}

		await utils.assignFeedbackEditpdfQueues.getAssignFeedbackEditpdfQueues.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Assign Feedback Editpdf Queue ${action}d!`)
	}

	const { mutate: createAssignFeedbackEditpdfQueue, isLoading: isCreating } =
		trpc.assignFeedbackEditpdfQueues.createAssignFeedbackEditpdfQueue.useMutation(
			{
				onSuccess: (res) => onSuccess('create'),
				onError: (err) => onError('create', { error: err.message })
			}
		)

	const { mutate: updateAssignFeedbackEditpdfQueue, isLoading: isUpdating } =
		trpc.assignFeedbackEditpdfQueues.updateAssignFeedbackEditpdfQueue.useMutation(
			{
				onSuccess: (res) => onSuccess('update'),
				onError: (err) => onError('update', { error: err.message })
			}
		)

	const { mutate: deleteAssignFeedbackEditpdfQueue, isLoading: isDeleting } =
		trpc.assignFeedbackEditpdfQueues.deleteAssignFeedbackEditpdfQueue.useMutation(
			{
				onSuccess: (res) => onSuccess('delete'),
				onError: (err) => onError('delete', { error: err.message })
			}
		)

	const handleSubmit = (values: NewAssignFeedbackEditpdfQueueParams) => {
		if (editing) {
			updateAssignFeedbackEditpdfQueue({
				...values,
				id: assignFeedbackEditpdfQueue.id
			})
		} else {
			createAssignFeedbackEditpdfQueue(values)
		}
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className={'space-y-8'}
			>
				<FormField
					control={form.control}
					name='attemptedConversions'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Attempted Conversions</FormLabel>
							<FormControl>
								<Input
									{...field}
									value={field.value || ''}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='submissionAttempt'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Submission Attempt</FormLabel>
							<FormControl>
								<Input
									{...field}
									value={field.value || ''}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='submissionId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Submission Id</FormLabel>
							<FormControl>
								<Input
									{...field}
									value={field.value || ''}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					className='mr-1'
					disabled={isCreating || isUpdating}
				>
					{editing
						? `Sav${isUpdating ? 'ing...' : 'e'}`
						: `Creat${isCreating ? 'ing...' : 'e'}`}
				</Button>
				{editing ? (
					<Button
						type='button'
						variant={'destructive'}
						onClick={() =>
							deleteAssignFeedbackEditpdfQueue({
								id: assignFeedbackEditpdfQueue.id
							})
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default AssignFeedbackEditpdfQueueForm
