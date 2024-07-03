'use client'

import {
	ToolUserToursStep,
	NewToolUserToursStepParams,
	insertToolUserToursStepParams
} from '@/lib/db/schema/toolUserToursSteps'
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

const ToolUserToursStepForm = ({
	toolUserToursStep,
	closeModal
}: {
	toolUserToursStep?: ToolUserToursStep
	closeModal?: () => void
}) => {
	const editing = !!toolUserToursStep?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertToolUserToursStepParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertToolUserToursStepParams),
		defaultValues: toolUserToursStep ?? {
			configData: '',
			content: '',
			contentFormat: 0,
			sortOrder: 0,
			targetType: 0,
			targetValue: '',
			title: '',
			tourId: ''
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

		await utils.toolUserToursSteps.getToolUserToursSteps.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Tool User Tours Step ${action}d!`)
	}

	const { mutate: createToolUserToursStep, isLoading: isCreating } =
		trpc.toolUserToursSteps.createToolUserToursStep.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onSuccess('create', { error: err.message })
		})

	const { mutate: updateToolUserToursStep, isLoading: isUpdating } =
		trpc.toolUserToursSteps.updateToolUserToursStep.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onSuccess('update', { error: err.message })
		})

	const { mutate: deleteToolUserToursStep, isLoading: isDeleting } =
		trpc.toolUserToursSteps.deleteToolUserToursStep.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onSuccess('delete', { error: err.message })
		})

	const handleSubmit = (values: NewToolUserToursStepParams) => {
		if (editing) {
			updateToolUserToursStep({ ...values, id: toolUserToursStep.id })
		} else {
			createToolUserToursStep(values)
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
					name='configData'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Config Data</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='content'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Content</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='contentFormat'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Content Format</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='sortOrder'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sort Order</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='targetType'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Target Type</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='targetValue'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Target Value</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='tourId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tour Id</FormLabel>
							<FormControl>
								<Input {...field} />
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
							deleteToolUserToursStep({ id: toolUserToursStep.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default ToolUserToursStepForm
