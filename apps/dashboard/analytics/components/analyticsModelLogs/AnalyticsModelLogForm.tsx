'use client'

import {
	AnalyticsModelLog,
	NewAnalyticsModelLogParams,
	insertAnalyticsModelLogParams
} from '@soco/analytics-db/schema/analyticsModelLogs'
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

const AnalyticsModelLogForm = ({
	analyticsModelLog,
	closeModal
}: {
	analyticsModelLog?: AnalyticsModelLog
	closeModal?: () => void
}) => {
	const editing = !!analyticsModelLog?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAnalyticsModelLogParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAnalyticsModelLogParams),
		defaultValues: analyticsModelLog ?? {
			dir: '',
			evaluationMode: '',
			indicators: '',
			info: '',
			modelId: '',
			score: 0.0,
			target: '',
			timeSplitting: '',
			version: 0
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

		await utils.analyticsModelLogs.getAnalyticsModelLogs.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Analytics Models Log ${action}d!`)
	}

	const { mutate: createAnalyticsModelLog, isLoading: isCreating } =
		trpc.analyticsModelLogs.createAnalyticsModelLog.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateAnalyticsModelLog, isLoading: isUpdating } =
		trpc.analyticsModelLogs.updateAnalyticsModelLog.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteAnalyticsModelLog, isLoading: isDeleting } =
		trpc.analyticsModelLogs.deleteAnalyticsModelLog.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewAnalyticsModelLogParams) => {
		if (editing) {
			updateAnalyticsModelLog({ ...values, id: analyticsModelLog.id })
		} else {
			createAnalyticsModelLog(values)
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
					name='dir'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Dir</FormLabel>
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
					name='evaluationMode'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Evaluation Mode</FormLabel>
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
					name='indicators'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Indicators</FormLabel>
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
					name='info'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Info</FormLabel>
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
					name='score'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Score</FormLabel>
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
					name='target'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Target</FormLabel>
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
					name='timeSplitting'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Time Splitting</FormLabel>
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
					name='version'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Version</FormLabel>
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
							deleteAnalyticsModelLog({ id: analyticsModelLog.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default AnalyticsModelLogForm
