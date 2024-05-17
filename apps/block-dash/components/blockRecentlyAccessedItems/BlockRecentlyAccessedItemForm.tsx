'use client'

import {
	BlockRecentlyAccessedItem,
	NewBlockRecentlyAccessedItemParams,
	insertBlockRecentlyAccessedItemParams
} from '@/lib/db/schema/blockRecentlyAccessedItems'
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

const BlockRecentlyAccessedItemForm = ({
	blockRecentlyAccessedItem,
	closeModal
}: {
	blockRecentlyAccessedItem?: BlockRecentlyAccessedItem
	closeModal?: () => void
}) => {
	const editing = !!blockRecentlyAccessedItem?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertBlockRecentlyAccessedItemParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertBlockRecentlyAccessedItemParams),
		defaultValues: blockRecentlyAccessedItem ?? {
			cmId: '',
			courseId: ''
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

		await utils.blockRecentlyAccessedItems.getBlockRecentlyAccessedItems.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Block Recently Accessed Item ${action}d!`)
	}

	const { mutate: createBlockRecentlyAccessedItem, isLoading: isCreating } =
		trpc.blockRecentlyAccessedItems.createBlockRecentlyAccessedItem.useMutation(
			{
				onSuccess: (res) => onSuccess('create'),
				onError: (err) => onError('create', { error: err.message })
			}
		)

	const { mutate: updateBlockRecentlyAccessedItem, isLoading: isUpdating } =
		trpc.blockRecentlyAccessedItems.updateBlockRecentlyAccessedItem.useMutation(
			{
				onSuccess: (res) => onSuccess('update'),
				onError: (err) => onError('update', { error: err.message })
			}
		)

	const { mutate: deleteBlockRecentlyAccessedItem, isLoading: isDeleting } =
		trpc.blockRecentlyAccessedItems.deleteBlockRecentlyAccessedItem.useMutation(
			{
				onSuccess: (res) => onSuccess('delete'),
				onError: (err) => onError('delete', { error: err.message })
			}
		)

	const handleSubmit = (values: NewBlockRecentlyAccessedItemParams) => {
		if (editing) {
			updateBlockRecentlyAccessedItem({
				...values,
				id: blockRecentlyAccessedItem.id
			})
		} else {
			createBlockRecentlyAccessedItem(values)
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
					name='cmId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Cm Id</FormLabel>
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
					name='courseId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Course Id</FormLabel>
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
							deleteBlockRecentlyAccessedItem({
								id: blockRecentlyAccessedItem.id
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

export default BlockRecentlyAccessedItemForm
