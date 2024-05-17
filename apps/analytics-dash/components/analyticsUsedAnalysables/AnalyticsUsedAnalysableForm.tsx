'use client'

import {
	AnalyticsUsedAnalysable,
	NewAnalyticsUsedAnalysableParams,
	insertAnalyticsUsedAnalysableParams
} from '@/lib/db/schema/analyticsUsedAnalysables'
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

const AnalyticsUsedAnalysableForm = ({
	analyticsUsedAnalysable,
	closeModal
}: {
	analyticsUsedAnalysable?: AnalyticsUsedAnalysable
	closeModal?: () => void
}) => {
	const editing = !!analyticsUsedAnalysable?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAnalyticsUsedAnalysableParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAnalyticsUsedAnalysableParams),
		defaultValues: analyticsUsedAnalysable ?? {
			action: '',
			analysableId: '',
			firstAnalysis: '',
			modelId: ''
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

		await utils.analyticsUsedAnalysables.getAnalyticsUsedAnalysables.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Analytics Used Analysable ${action}d!`)
	}

	const { mutate: createAnalyticsUsedAnalysable, isLoading: isCreating } =
		trpc.analyticsUsedAnalysables.createAnalyticsUsedAnalysable.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateAnalyticsUsedAnalysable, isLoading: isUpdating } =
		trpc.analyticsUsedAnalysables.updateAnalyticsUsedAnalysable.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteAnalyticsUsedAnalysable, isLoading: isDeleting } =
		trpc.analyticsUsedAnalysables.deleteAnalyticsUsedAnalysable.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewAnalyticsUsedAnalysableParams) => {
		if (editing) {
			updateAnalyticsUsedAnalysable({
				...values,
				id: analyticsUsedAnalysable.id
			})
		} else {
			createAnalyticsUsedAnalysable(values)
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
					name='action'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Action</FormLabel>
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
					name='firstAnalysis'
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Analysis</FormLabel>
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
							deleteAnalyticsUsedAnalysable({ id: analyticsUsedAnalysable.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default AnalyticsUsedAnalysableForm
