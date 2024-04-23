'use client'

import {
	SupportComment,
	NewSupportCommentParams,
	insertSupportCommentParams
} from '@/lib/db/schema/supportComments'
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

const SupportCommentForm = ({
	supportComment,
	closeModal
}: {
	supportComment?: SupportComment
	closeModal?: () => void
}) => {
	const { data: supportTickets } =
		trpc.supportTickets.getSupportTickets.useQuery()
	const editing = !!supportComment?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertSupportCommentParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertSupportCommentParams),
		defaultValues: supportComment ?? {
			comment: '',
			attachments: '',
			timeSpent: '',
			supportTicketId: ''
		}
	})

	const onSuccess = async (
		action: 'create' | 'update' | 'delete',
		data?: { error?: string }
	) => {
		if (data?.error) {
			toast.error(data.error)
			return
		}

		await utils.supportComments.getSupportComments.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Support Comment ${action}d!`)
	}

	const { mutate: createSupportComment, isLoading: isCreating } =
		trpc.supportComments.createSupportComment.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateSupportComment, isLoading: isUpdating } =
		trpc.supportComments.updateSupportComment.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteSupportComment, isLoading: isDeleting } =
		trpc.supportComments.deleteSupportComment.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewSupportCommentParams) => {
		if (editing) {
			updateSupportComment({ ...values, id: supportComment.id })
		} else {
			createSupportComment(values)
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
					name='comment'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Comment</FormLabel>
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
					name='attachments'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Attachments</FormLabel>
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
					name='timeSpent'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Time Spent</FormLabel>
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
					name='supportTicketId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Support Ticket Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a support ticket' />
									</SelectTrigger>
									<SelectContent>
										{supportTickets?.supportTickets.map((supportTicket) => (
											<SelectItem
												key={supportTicket.id}
												value={supportTicket.id.toString()}
											>
												{supportTicket.name}{' '}
												{/* TODO: Replace with a field from the supportTicket model */}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
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
						onClick={() => deleteSupportComment({ id: supportComment.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default SupportCommentForm
