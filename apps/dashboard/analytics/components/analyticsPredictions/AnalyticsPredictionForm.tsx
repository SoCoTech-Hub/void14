'use client'

import {
	AnalyticsPrediction,
	NewAnalyticsPredictionParams,
	insertAnalyticsPredictionParams
} from '@soco/analytics-db/schema/analyticsPredictions'
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
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@soco/utils'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const AnalyticsPredictionForm = ({
	analyticsPrediction,
	closeModal
}: {
	analyticsPrediction?: AnalyticsPrediction
	closeModal?: () => void
}) => {
	const editing = !!analyticsPrediction?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAnalyticsPredictionParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAnalyticsPredictionParams),
		defaultValues: analyticsPrediction ?? {
			calculations: '',
			contextId: '',
			modelId: '',
			prediciton: 0.0,
			predicitonScore: 0.0,
			rangeIndex: 0,
			sampleId: '',
			startTime: '',
			endTime: ''
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

		await utils.analyticsPredictions.getAnalyticsPredictions.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Analytics Prediction ${action}d!`)
	}

	const onError = async (
		action: 'create' | 'update' | 'delete',
		data?: { error?: string }
	) => {
		if (data?.error) {
			toast.error(`Error on ${action}: ${data.error}`)
			return
		}
	}

	const { mutate: createAnalyticsPrediction, isLoading: isCreating } =
		trpc.analyticsPredictions.createAnalyticsPrediction.useMutation({
			onSuccess: () => onSuccess('create'),
			onError: (err: { message: string }) =>
				onError('create', { error: err.message })
		})

	const { mutate: updateAnalyticsPrediction, isLoading: isUpdating } =
		trpc.analyticsPredictions.updateAnalyticsPrediction.useMutation({
			onSuccess: () => onSuccess('update'),
			onError: (err: { message: any }) =>
				onError('update', { error: err.message })
		})

	const { mutate: deleteAnalyticsPrediction, isLoading: isDeleting } =
		trpc.analyticsPredictions.deleteAnalyticsPrediction.useMutation({
			onSuccess: () => onSuccess('delete'),
			onError: (err: { message: any }) =>
				onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewAnalyticsPredictionParams) => {
		if (editing) {
			updateAnalyticsPrediction({ ...values, id: analyticsPrediction.id })
		} else {
			createAnalyticsPrediction(values)
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
					name='calculations'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Calculations</FormLabel>
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
					name='contextId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Context Id</FormLabel>
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
					name='modelId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Model Id</FormLabel>
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
					name='prediciton'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Prediciton</FormLabel>
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
					name='predicitonScore'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Prediciton Score</FormLabel>
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
					name='rangeIndex'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Range Index</FormLabel>
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
					name='sampleId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sample Id</FormLabel>
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
					name='startTime'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Start Time</FormLabel>
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
												format(new Date(field.value), 'PPP')
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
										disabled={(date) =>
											date > new Date() || date < new Date('1900-01-01')
										}
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
					name='endTime'
					render={({ field }) => (
						<FormItem>
							<FormLabel>End Time</FormLabel>
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
												format(new Date(field.value), 'PPP')
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
										disabled={(date) =>
											date > new Date() || date < new Date('1900-01-01')
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>

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
							deleteAnalyticsPrediction({ id: analyticsPrediction.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default AnalyticsPredictionForm
