'use client'

import {
	BlockRecentActivity,
	NewBlockRecentActivityParams,
	insertBlockRecentActivityParams
} from '@/lib/db/schema/blockRecentActivities'
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

const BlockRecentActivityForm = ({
	blockRecentActivity,
	closeModal
}: {
	blockRecentActivity?: BlockRecentActivity
	closeModal?: () => void
}) => {
	const editing = !!blockRecentActivity?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertBlockRecentActivityParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertBlockRecentActivityParams),
		defaultValues: blockRecentActivity ?? {
			action: 0,
			cmId: '',
			courseId: '',
			modName: ''
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

		await utils.blockRecentActivities.getBlockRecentActivities.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Block Recent Activity ${action}d!`)
	}

	const { mutate: createBlockRecentActivity, isLoading: isCreating } =
		trpc.blockRecentActivities.createBlockRecentActivity.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateBlockRecentActivity, isLoading: isUpdating } =
		trpc.blockRecentActivities.updateBlockRecentActivity.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteBlockRecentActivity, isLoading: isDeleting } =
		trpc.blockRecentActivities.deleteBlockRecentActivity.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewBlockRecentActivityParams) => {
		if (editing) {
			updateBlockRecentActivity({ ...values, id: blockRecentActivity.id })
		} else {
			createBlockRecentActivity(values)
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
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='cmId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Cm Id</FormLabel>
							<FormControl>
								<Input {...field} />
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
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='modName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mod Name</FormLabel>
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
							deleteBlockRecentActivity({ id: blockRecentActivity.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default BlockRecentActivityForm
