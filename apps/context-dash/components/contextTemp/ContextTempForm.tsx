'use client'

import {
	ContextTemp,
	NewContextTempParams,
	insertContextTempParams
} from '@/lib/db/schema/contextTemp'
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

const ContextTempForm = ({
	contextTemp,
	closeModal
}: {
	contextTemp?: ContextTemp
	closeModal?: () => void
}) => {
	const { data: contexts } = trpc.contexts.getContexts.useQuery()
	const editing = !!contextTemp?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertContextTempParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertContextTempParams),
		defaultValues: contextTemp ?? {
			contextId: '',
			depth: 0,
			locked: 0,
			path: ''
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

		await utils.contextTemp.getContextTemp.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Context Temp ${action}d!`)
	}

	const { mutate: createContextTemp, isLoading: isCreating } =
		trpc.contextTemp.createContextTemp.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateContextTemp, isLoading: isUpdating } =
		trpc.contextTemp.updateContextTemp.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteContextTemp, isLoading: isDeleting } =
		trpc.contextTemp.deleteContextTemp.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewContextTempParams) => {
		if (editing) {
			updateContextTemp({ ...values, id: contextTemp.id })
		} else {
			createContextTemp(values)
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
					name='contextId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Context Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a context' />
									</SelectTrigger>
									<SelectContent>
										{contexts?.contexts.map((context) => (
											<SelectItem
												key={context.id}
												value={context.id.toString()}
											>
												{context.id}{' '}
												{/* TODO: Replace with a field from the context model */}
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
					name='depth'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Depth</FormLabel>
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
					name='locked'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Locked</FormLabel>
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
					name='path'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Path</FormLabel>
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
						onClick={() => deleteContextTemp({ id: contextTemp.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default ContextTempForm
