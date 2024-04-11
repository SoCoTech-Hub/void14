'use client'

import {
	MassMailMessage,
	NewMassMailMessageParams,
	insertMassMailMessageParams
} from '@/lib/db/schema/massMailMessages'
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const MassMailMessageForm = ({
	massMailMessage,
	closeModal
}: {
	massMailMessage?: MassMailMessage
	closeModal?: () => void
}) => {
	const { data: massMailLists } = trpc.massMailLists.getMassMailLists.useQuery()
	const editing = !!massMailMessage?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertMassMailMessageParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertMassMailMessageParams),
		defaultValues: massMailMessage ?? {
			name: '',
			body: '',
			publishDate: '',
			massMailListId: ''
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

		await utils.massMailMessages.getMassMailMessages.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Mass Mail Message ${action}d!`)
	}

	const { mutate: createMassMailMessage, isLoading: isCreating } =
		trpc.massMailMessages.createMassMailMessage.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateMassMailMessage, isLoading: isUpdating } =
		trpc.massMailMessages.updateMassMailMessage.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteMassMailMessage, isLoading: isDeleting } =
		trpc.massMailMessages.deleteMassMailMessage.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewMassMailMessageParams) => {
		if (editing) {
			updateMassMailMessage({ ...values, id: massMailMessage.id })
		} else {
			createMassMailMessage(values)
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
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='body'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Body</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='publishDate'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Publish Date</FormLabel>
							<br />
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={cn(
												'w-[240px] pl-3 text-left font-normal',
												!field.value && 'text-muted-foreground'
											)}
										>
											{field.value ? (
												format(new Date(field.value), 'PPpp') //#TODO: fix date to date time
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent
									className='w-auto p-0'
									align='start'
								>
									<Calendar
										mode='single'
										selected={new Date(field.value)}
										onSelect={field.onChange}
										disabled={(date) => date < new Date('2000-01-01')}
										initialFocus
									/>
								</PopoverContent>
							</Popover>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='massMailListId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mass Mail List Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a mass mail list' />
									</SelectTrigger>
									<SelectContent>
										{massMailLists?.massMailLists.map((massMailList) => (
											<SelectItem
												key={massMailList.id}
												value={massMailList.id.toString()}
											>
												{massMailList.name}{' '}
												{/* TODO: Replace with a field from the massMailList model */}
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
						onClick={() => deleteMassMailMessage({ id: massMailMessage.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default MassMailMessageForm
