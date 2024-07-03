'use client'

import {
	AnalyticsTrainSample,
	NewAnalyticsTrainSampleParams,
	insertAnalyticsTrainSampleParams
} from '@/lib/db/schema/analyticsTrainSamples'
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

const AnalyticsTrainSampleForm = ({
	analyticsTrainSample,
	closeModal
}: {
	analyticsTrainSample?: AnalyticsTrainSample
	closeModal?: () => void
}) => {
	const editing = !!analyticsTrainSample?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAnalyticsTrainSampleParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAnalyticsTrainSampleParams),
		defaultValues: analyticsTrainSample ?? {
			analysableId: '',
			modelId: '',
			sampleIds: '',
			timeSplitting: ''
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

		await utils.analyticsTrainSamples.getAnalyticsTrainSamples.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Analytics Train Sample ${action}d!`)
	}

	const { mutate: createAnalyticsTrainSample, isLoading: isCreating } =
		trpc.analyticsTrainSamples.createAnalyticsTrainSample.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateAnalyticsTrainSample, isLoading: isUpdating } =
		trpc.analyticsTrainSamples.updateAnalyticsTrainSample.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteAnalyticsTrainSample, isLoading: isDeleting } =
		trpc.analyticsTrainSamples.deleteAnalyticsTrainSample.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewAnalyticsTrainSampleParams) => {
		if (editing) {
			updateAnalyticsTrainSample({ ...values, id: analyticsTrainSample.id })
		} else {
			createAnalyticsTrainSample(values)
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
					name='analysableId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Analysable Id</FormLabel>
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
					name='sampleIds'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sample Ids</FormLabel>
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
							deleteAnalyticsTrainSample({ id: analyticsTrainSample.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default AnalyticsTrainSampleForm
