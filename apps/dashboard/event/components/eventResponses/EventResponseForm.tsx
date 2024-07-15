'use client'

import {
	EventResponse,
	NewEventResponseParams,
	insertEventResponseParams
} from '@soco/event-db/schema/eventResponses'
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

const EventResponseForm = ({
	eventResponse,
	closeModal
}: {
	eventResponse?: EventResponse
	closeModal?: () => void
}) => {
	const { data: events } = trpc.events.getEvents.useQuery()
	const editing = !!eventResponse?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertEventResponseParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertEventResponseParams),
		defaultValues: eventResponse ?? {
			eventId: '',
			attendance: ''
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

		await utils.eventResponses.getEventResponses.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Event Response ${action}d!`)
	}

	const { mutate: createEventResponse, isLoading: isCreating } =
		trpc.eventResponses.createEventResponse.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateEventResponse, isLoading: isUpdating } =
		trpc.eventResponses.updateEventResponse.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteEventResponse, isLoading: isDeleting } =
		trpc.eventResponses.deleteEventResponse.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewEventResponseParams) => {
		if (editing) {
			updateEventResponse({ ...values, id: eventResponse.id })
		} else {
			createEventResponse(values)
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
					name='eventId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Event Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a event' />
									</SelectTrigger>
									<SelectContent>
										{events?.events.map((event) => (
											<SelectItem
												key={event.id}
												value={event.id.toString()}
											>
												{event.id}{' '}
												{/* TODO: Replace with a field from the event model */}
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
					name='attendance'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Attendance</FormLabel>
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
						onClick={() => deleteEventResponse({ id: eventResponse.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default EventResponseForm
