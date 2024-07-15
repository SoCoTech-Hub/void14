'use client'

import {
	SupportTicket,
	NewSupportTicketParams,
	insertSupportTicketParams
} from '@soco/support-db/schema/supportTickets'
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
import { Checkbox } from '@/components/ui/checkbox'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const SupportTicketForm = ({
	supportTicket,
	closeModal
}: {
	supportTicket?: SupportTicket
	closeModal?: () => void
}) => {
	const { data: supportDepartments } =
		trpc.supportDepartments.getSupportDepartments.useQuery()
	const { data: supportTopics } = trpc.supportTopics.getSupportTopics.useQuery()
	const { data: supportStatuses } =
		trpc.supportStatuses.getSupportStatuses.useQuery()
	const editing = !!supportTicket?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertSupportTicketParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertSupportTicketParams),
		defaultValues: supportTicket ?? {
			name: '',
			descrption: '',
			attachments: '',
			timeSpent: '',
			open: false,
			path: '',
			device: '',
			assignedTo: '',
			supportDepartmentId: '',
			supportTopicId: '',
			supportStatusId: '',
			province: '',
			grade: ''
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

		await utils.supportTickets.getSupportTickets.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Support Ticket ${action}d!`)
	}

	const { mutate: createSupportTicket, isLoading: isCreating } =
		trpc.supportTickets.createSupportTicket.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateSupportTicket, isLoading: isUpdating } =
		trpc.supportTickets.updateSupportTicket.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteSupportTicket, isLoading: isDeleting } =
		trpc.supportTickets.deleteSupportTicket.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewSupportTicketParams) => {
		if (editing) {
			updateSupportTicket({ ...values, id: supportTicket.id })
		} else {
			createSupportTicket(values)
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
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
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
					name='descrption'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descrption</FormLabel>
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
					name='open'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Open</FormLabel>
							<br />
							<FormControl>
								<Checkbox
									{...field}
									checked={!!field.value}
									onCheckedChange={field.onChange}
									value={''}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='path'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Path</FormLabel>
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
					name='device'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Device</FormLabel>
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
					name='assignedTo'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Assigned To</FormLabel>
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
					name='supportDepartmentId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Support Department Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a support department' />
									</SelectTrigger>
									<SelectContent>
										{supportDepartments?.supportDepartments.map(
											(supportDepartment) => (
												<SelectItem
													key={supportDepartment.id}
													value={supportDepartment.id.toString()}
												>
													{supportDepartment.name}{' '}
													{/* TODO: Replace with a field from the supportDepartment model */}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='supportTopicId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Support Topic Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a support topic' />
									</SelectTrigger>
									<SelectContent>
										{supportTopics?.supportTopics.map((supportTopic) => (
											<SelectItem
												key={supportTopic.id}
												value={supportTopic.id.toString()}
											>
												{supportTopic.name}{' '}
												{/* TODO: Replace with a field from the supportTopic model */}
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
					name='supportStatusId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Support Status Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a support status' />
									</SelectTrigger>
									<SelectContent>
										{supportStatuses?.supportStatuses.map((supportStatus) => (
											<SelectItem
												key={supportStatus.id}
												value={supportStatus.id.toString()}
											>
												{supportStatus.name}{' '}
												{/* TODO: Replace with a field from the supportStatus model */}
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
					name='province'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Province</FormLabel>
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
					name='grade'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Grade</FormLabel>
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
						onClick={() => deleteSupportTicket({ id: supportTicket.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default SupportTicketForm
