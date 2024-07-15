'use client'

import {
	AssignFeedbackEditpdfQuick,
	NewAssignFeedbackEditpdfQuickParams,
	insertAssignFeedbackEditpdfQuickParams
} from '@soco/assignment-db/schema/assignFeedbackEditpdfQuicks'
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

const AssignFeedbackEditpdfQuickForm = ({
	assignFeedbackEditpdfQuick,
	closeModal
}: {
	assignFeedbackEditpdfQuick?: AssignFeedbackEditpdfQuick
	closeModal?: () => void
}) => {
	const editing = !!assignFeedbackEditpdfQuick?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAssignFeedbackEditpdfQuickParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAssignFeedbackEditpdfQuickParams),
		defaultValues: assignFeedbackEditpdfQuick ?? {
			color: '',
			rawText: '',
			width: 0
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

		await utils.assignFeedbackEditpdfQuicks.getAssignFeedbackEditpdfQuicks.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Assign Feedback Editpdf Quick ${action}d!`)
	}

	const { mutate: createAssignFeedbackEditpdfQuick, isLoading: isCreating } =
		trpc.assignFeedbackEditpdfQuicks.createAssignFeedbackEditpdfQuick.useMutation(
			{
				onSuccess: (res) => onSuccess('create'),
				onError: (err) => onError('create', { error: err.message })
			}
		)

	const { mutate: updateAssignFeedbackEditpdfQuick, isLoading: isUpdating } =
		trpc.assignFeedbackEditpdfQuicks.updateAssignFeedbackEditpdfQuick.useMutation(
			{
				onSuccess: (res) => onSuccess('update'),
				onError: (err) => onError('update', { error: err.message })
			}
		)

	const { mutate: deleteAssignFeedbackEditpdfQuick, isLoading: isDeleting } =
		trpc.assignFeedbackEditpdfQuicks.deleteAssignFeedbackEditpdfQuick.useMutation(
			{
				onSuccess: (res) => onSuccess('delete'),
				onError: (err) => onError('delete', { error: err.message })
			}
		)

	const handleSubmit = (values: NewAssignFeedbackEditpdfQuickParams) => {
		if (editing) {
			updateAssignFeedbackEditpdfQuick({
				...values,
				id: assignFeedbackEditpdfQuick.id
			})
		} else {
			createAssignFeedbackEditpdfQuick(values)
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
					name='color'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Color</FormLabel>
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
					name='rawText'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Raw Text</FormLabel>
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
					name='width'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Width</FormLabel>
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
							deleteAssignFeedbackEditpdfQuick({
								id: assignFeedbackEditpdfQuick.id
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

export default AssignFeedbackEditpdfQuickForm
