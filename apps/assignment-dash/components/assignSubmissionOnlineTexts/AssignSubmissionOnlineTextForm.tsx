'use client'

import {
	AssignSubmissionOnlineText,
	NewAssignSubmissionOnlineTextParams,
	insertAssignSubmissionOnlineTextParams
} from '@/lib/db/schema/assignSubmissionOnlineTexts'
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const AssignSubmissionOnlineTextForm = ({
	assignSubmissionOnlineText,
	closeModal
}: {
	assignSubmissionOnlineText?: AssignSubmissionOnlineText
	closeModal?: () => void
}) => {
	const { data: assignments } = trpc.assignments.getAssignments.useQuery()
	const editing = !!assignSubmissionOnlineText?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAssignSubmissionOnlineTextParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAssignSubmissionOnlineTextParams),
		defaultValues: assignSubmissionOnlineText ?? {
			assignmentId: '',
			onlineFormat: 0,
			onlineText: '',
			submission: 0
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

		await utils.assignSubmissionOnlineTexts.getAssignSubmissionOnlineTexts.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Assign Submission Online Text ${action}d!`)
	}

	const { mutate: createAssignSubmissionOnlineText, isLoading: isCreating } =
		trpc.assignSubmissionOnlineTexts.createAssignSubmissionOnlineText.useMutation(
			{
				onSuccess: (res) => onSuccess('create'),
				onError: (err) => onError('create', { error: err.message })
			}
		)

	const { mutate: updateAssignSubmissionOnlineText, isLoading: isUpdating } =
		trpc.assignSubmissionOnlineTexts.updateAssignSubmissionOnlineText.useMutation(
			{
				onSuccess: (res) => onSuccess('update'),
				onError: (err) => onError('update', { error: err.message })
			}
		)

	const { mutate: deleteAssignSubmissionOnlineText, isLoading: isDeleting } =
		trpc.assignSubmissionOnlineTexts.deleteAssignSubmissionOnlineText.useMutation(
			{
				onSuccess: (res) => onSuccess('delete'),
				onError: (err) => onError('delete', { error: err.message })
			}
		)

	const handleSubmit = (values: NewAssignSubmissionOnlineTextParams) => {
		if (editing) {
			updateAssignSubmissionOnlineText({
				...values,
				id: assignSubmissionOnlineText.id
			})
		} else {
			createAssignSubmissionOnlineText(values)
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
					name='assignmentId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Assignment Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a assignment' />
									</SelectTrigger>
									<SelectContent>
										{assignments?.assignments.map((assignment) => (
											<SelectItem
												key={assignment.id}
												value={assignment.id.toString()}
											>
												{assignment.id}{' '}
												{/* TODO: Replace with a field from the assignment model */}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='onlineFormat'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Online Format</FormLabel>
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
					name='onlineText'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Online Text</FormLabel>
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
					name='submission'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Submission</FormLabel>
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
							deleteAssignSubmissionOnlineText({
								id: assignSubmissionOnlineText.id
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

export default AssignSubmissionOnlineTextForm
