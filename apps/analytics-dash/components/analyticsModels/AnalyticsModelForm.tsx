'use client'

import {
	AnalyticsModel,
	NewAnalyticsModelParams,
	insertAnalyticsModelParams
} from '@/lib/db/schema/analyticsModels'
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
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const AnalyticsModelForm = ({
	analyticsModel,
	closeModal
}: {
	analyticsModel?: AnalyticsModel
	closeModal?: () => void
}) => {
	const editing = !!analyticsModel?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAnalyticsModelParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAnalyticsModelParams),
		defaultValues: analyticsModel ?? {
			contextIds: '',
			isEnabled: false,
			indicators: '',
			name: '',
			predictionsProcessor: '',
			target: '',
			timeSplitting: '',
			isTrained: false,
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

		await utils.analyticsModels.getAnalyticsModels.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Analytics Model ${action}d!`)
	}

	const { mutate: createAnalyticsModel, isLoading: isCreating } =
		trpc.analyticsModels.createAnalyticsModel.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateAnalyticsModel, isLoading: isUpdating } =
		trpc.analyticsModels.updateAnalyticsModel.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteAnalyticsModel, isLoading: isDeleting } =
		trpc.analyticsModels.deleteAnalyticsModel.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewAnalyticsModelParams) => {
		if (editing) {
			updateAnalyticsModel({ ...values, id: analyticsModel.id })
		} else {
			createAnalyticsModel(values)
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
					name='contextIds'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Context Ids</FormLabel>
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
					name='isEnabled'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Is Enabled</FormLabel>
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
					name='predictionsProcessor'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Predictions Processor</FormLabel>
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
					name='isTrained'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Is Trained</FormLabel>
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
						onClick={() => deleteAnalyticsModel({ id: analyticsModel.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default AnalyticsModelForm
