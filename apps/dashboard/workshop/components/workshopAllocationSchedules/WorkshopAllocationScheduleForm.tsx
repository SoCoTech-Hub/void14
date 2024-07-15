'use client'

import {
	WorkshopAllocationSchedule,
	NewWorkshopAllocationScheduleParams,
	insertWorkshopAllocationScheduleParams
} from '@soco/workshop-db/schema/workshopAllocationSchedules'
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

const WorkshopAllocationScheduleForm = ({
	workshopAllocationSchedule,
	closeModal
}: {
	workshopAllocationSchedule?: WorkshopAllocationSchedule
	closeModal?: () => void
}) => {
	const { data: workshops } = trpc.workshops.getWorkshops.useQuery()
	const editing = !!workshopAllocationSchedule?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertWorkshopAllocationScheduleParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertWorkshopAllocationScheduleParams),
		defaultValues: workshopAllocationSchedule ?? {
			enabled: false,
			resultLog: '',
			resultMessage: '',
			resultStatus: 0,
			settings: '',
			submissionend: 0,
			workshopId: ''
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

		await utils.workshopAllocationSchedules.getWorkshopAllocationSchedules.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Workshop Allocation Schedule ${action}d!`)
	}

	const { mutate: createWorkshopAllocationSchedule, isLoading: isCreating } =
		trpc.workshopAllocationSchedules.createWorkshopAllocationSchedule.useMutation(
			{
				onSuccess: (res) => onSuccess('create'),
				onError: (err) => onError('create', { error: err.message })
			}
		)

	const { mutate: updateWorkshopAllocationSchedule, isLoading: isUpdating } =
		trpc.workshopAllocationSchedules.updateWorkshopAllocationSchedule.useMutation(
			{
				onSuccess: (res) => onSuccess('update'),
				onError: (err) => onError('update', { error: err.message })
			}
		)

	const { mutate: deleteWorkshopAllocationSchedule, isLoading: isDeleting } =
		trpc.workshopAllocationSchedules.deleteWorkshopAllocationSchedule.useMutation(
			{
				onSuccess: (res) => onSuccess('delete'),
				onError: (err) => onError('delete', { error: err.message })
			}
		)

	const handleSubmit = (values: NewWorkshopAllocationScheduleParams) => {
		if (editing) {
			updateWorkshopAllocationSchedule({
				...values,
				id: workshopAllocationSchedule.id
			})
		} else {
			createWorkshopAllocationSchedule(values)
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
					name='enabled'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Enabled</FormLabel>
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
					name='resultLog'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Result Log</FormLabel>
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
					name='resultMessage'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Result Message</FormLabel>
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
					name='resultStatus'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Result Status</FormLabel>
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
					name='settings'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Settings</FormLabel>
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
					name='submissionend'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Submissionend</FormLabel>
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
					name='workshopId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Workshop Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a workshop' />
									</SelectTrigger>
									<SelectContent>
										{workshops?.workshops.map((workshop) => (
											<SelectItem
												key={workshop.id}
												value={workshop.id.toString()}
											>
												{workshop.id}{' '}
												{/* TODO: Replace with a field from the workshop model */}
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
						onClick={() =>
							deleteWorkshopAllocationSchedule({
								id: workshopAllocationSchedule.id
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

export default WorkshopAllocationScheduleForm
