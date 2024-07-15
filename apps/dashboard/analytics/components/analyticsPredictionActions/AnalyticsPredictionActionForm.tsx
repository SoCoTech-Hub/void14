'use client'

import {
	AnalyticsPredictionAction,
	NewAnalyticsPredictionActionParams,
	insertAnalyticsPredictionActionParams
} from '@soco/analytics-db/schema/analyticsPredictionActions'
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

const AnalyticsPredictionActionForm = ({
	analyticsPredictionAction,
	closeModal
}: {
	analyticsPredictionAction?: AnalyticsPredictionAction
	closeModal?: () => void
}) => {
	const editing = !!analyticsPredictionAction?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAnalyticsPredictionActionParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAnalyticsPredictionActionParams),
		defaultValues: analyticsPredictionAction ?? {
			actionName: '',
			predictionId: ''
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

		await utils.analyticsPredictionActions.getAnalyticsPredictionActions.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Analytics Prediction Action ${action}d!`)
	}

	const { mutate: createAnalyticsPredictionAction, isLoading: isCreating } =
		trpc.analyticsPredictionActions.createAnalyticsPredictionAction.useMutation(
			{
				onSuccess: (res) => onSuccess('create'),
				onError: (err) => onError('create', { error: err.message })
			}
		)

	const { mutate: updateAnalyticsPredictionAction, isLoading: isUpdating } =
		trpc.analyticsPredictionActions.updateAnalyticsPredictionAction.useMutation(
			{
				onSuccess: (res) => onSuccess('update'),
				onError: (err) => onError('update', { error: err.message })
			}
		)

	const { mutate: deleteAnalyticsPredictionAction, isLoading: isDeleting } =
		trpc.analyticsPredictionActions.deleteAnalyticsPredictionAction.useMutation(
			{
				onSuccess: (res) => onSuccess('delete'),
				onError: (err) => onError('delete', { error: err.message })
			}
		)

	const handleSubmit = (values: NewAnalyticsPredictionActionParams) => {
		if (editing) {
			updateAnalyticsPredictionAction({
				...values,
				id: analyticsPredictionAction.id
			})
		} else {
			createAnalyticsPredictionAction(values)
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
					name='actionName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Action Name</FormLabel>
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
					name='predictionId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Prediction Id</FormLabel>
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
							deleteAnalyticsPredictionAction({
								id: analyticsPredictionAction.id
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

export default AnalyticsPredictionActionForm
