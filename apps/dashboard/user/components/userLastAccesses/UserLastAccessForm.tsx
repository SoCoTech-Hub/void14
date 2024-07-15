'use client'

import {
	UserLastAccess,
	NewUserLastAccessParams,
	insertUserLastAccessParams
} from '@soco/user-db/schema/userLastAccesses'
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

const UserLastAccessForm = ({
	userLastAccess,
	closeModal
}: {
	userLastAccess?: UserLastAccess
	closeModal?: () => void
}) => {
	const editing = !!userLastAccess?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertUserLastAccessParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertUserLastAccessParams),
		defaultValues: userLastAccess ?? {
			courseId: ''
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

		await utils.userLastAccesses.getUserLastAccesses.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`User Last Access ${action}d!`)
	}

	const { mutate: createUserLastAccess, isLoading: isCreating } =
		trpc.userLastAccesses.createUserLastAccess.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onSuccess('create', { error: err.message })
		})

	const { mutate: updateUserLastAccess, isLoading: isUpdating } =
		trpc.userLastAccesses.updateUserLastAccess.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onSuccess('update', { error: err.message })
		})

	const { mutate: deleteUserLastAccess, isLoading: isDeleting } =
		trpc.userLastAccesses.deleteUserLastAccess.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onSuccess('delete', { error: err.message })
		})

	const handleSubmit = (values: NewUserLastAccessParams) => {
		if (editing) {
			updateUserLastAccess({ ...values, id: userLastAccess.id })
		} else {
			createUserLastAccess(values)
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
						onClick={() => deleteUserLastAccess({ id: userLastAccess.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default UserLastAccessForm
