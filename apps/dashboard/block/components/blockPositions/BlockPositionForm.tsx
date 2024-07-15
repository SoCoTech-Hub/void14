'use client'

import {
	BlockPosition,
	NewBlockPositionParams,
	insertBlockPositionParams
} from '@soco/block-db/schema/blockPositions'
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const BlockPositionForm = ({
	blockPosition,
	closeModal
}: {
	blockPosition?: BlockPosition
	closeModal?: () => void
}) => {
	const { data: blockInstances } =
		trpc.blockInstances.getBlockInstances.useQuery()
	const editing = !!blockPosition?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertBlockPositionParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertBlockPositionParams),
		defaultValues: blockPosition ?? {
			blockInstanceId: '',
			contextId: '',
			pageType: '',
			region: '',
			subPage: '',
			visible: false,
			weight: 0
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

		await utils.blockPositions.getBlockPositions.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Block Position ${action}d!`)
	}

	const { mutate: createBlockPosition, isLoading: isCreating } =
		trpc.blockPositions.createBlockPosition.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateBlockPosition, isLoading: isUpdating } =
		trpc.blockPositions.updateBlockPosition.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteBlockPosition, isLoading: isDeleting } =
		trpc.blockPositions.deleteBlockPosition.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewBlockPositionParams) => {
		if (editing) {
			updateBlockPosition({ ...values, id: blockPosition.id })
		} else {
			createBlockPosition(values)
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
					name='blockInstanceId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Block Instance Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a block instance' />
									</SelectTrigger>
									<SelectContent>
										{blockInstances?.blockInstances.map((blockInstance) => (
											<SelectItem
												key={blockInstance.id}
												value={blockInstance.id.toString()}
											>
												{blockInstance.id}{' '}
												{/* TODO: Replace with a field from the blockInstance model */}
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
					name='pageType'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Page Type</FormLabel>
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
					name='region'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Region</FormLabel>
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
					name='subPage'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sub Page</FormLabel>
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
					name='visible'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Visible</FormLabel>
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
					name='weight'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Weight</FormLabel>
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
						onClick={() => deleteBlockPosition({ id: blockPosition.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default BlockPositionForm
