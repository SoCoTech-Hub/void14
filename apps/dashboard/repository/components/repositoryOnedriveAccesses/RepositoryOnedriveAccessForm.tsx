'use client'

import {
	RepositoryOnedriveAccess,
	NewRepositoryOnedriveAccessParams,
	insertRepositoryOnedriveAccessParams
} from '@soco/repository-db/schema/repositoryOnedriveAccesses'
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

const RepositoryOnedriveAccessForm = ({
	repositoryOnedriveAccess,
	closeModal
}: {
	repositoryOnedriveAccess?: RepositoryOnedriveAccess
	closeModal?: () => void
}) => {
	const editing = !!repositoryOnedriveAccess?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertRepositoryOnedriveAccessParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertRepositoryOnedriveAccessParams),
		defaultValues: repositoryOnedriveAccess ?? {
			itemId: '',
			permissionId: ''
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

		await utils.repositoryOnedriveAccesses.getRepositoryOnedriveAccesses.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Repository Onedrive Access ${action}d!`)
	}

	const { mutate: createRepositoryOnedriveAccess, isLoading: isCreating } =
		trpc.repositoryOnedriveAccesses.createRepositoryOnedriveAccess.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateRepositoryOnedriveAccess, isLoading: isUpdating } =
		trpc.repositoryOnedriveAccesses.updateRepositoryOnedriveAccess.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteRepositoryOnedriveAccess, isLoading: isDeleting } =
		trpc.repositoryOnedriveAccesses.deleteRepositoryOnedriveAccess.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewRepositoryOnedriveAccessParams) => {
		if (editing) {
			updateRepositoryOnedriveAccess({
				...values,
				id: repositoryOnedriveAccess.id
			})
		} else {
			createRepositoryOnedriveAccess(values)
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
					name='itemId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Item Id</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='permissionId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Permission Id</FormLabel>
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
							deleteRepositoryOnedriveAccess({
								id: repositoryOnedriveAccess.id
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

export default RepositoryOnedriveAccessForm
