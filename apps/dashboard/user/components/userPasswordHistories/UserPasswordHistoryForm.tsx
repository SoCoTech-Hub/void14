'use client'

import {
	UserPasswordHistory,
	NewUserPasswordHistoryParams,
	insertUserPasswordHistoryParams
} from '@/lib/db/schema/userPasswordHistories'
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

const UserPasswordHistoryForm = ({
	userPasswordHistory,
	closeModal
}: {
	userPasswordHistory?: UserPasswordHistory
	closeModal?: () => void
}) => {
	const editing = !!userPasswordHistory?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertUserPasswordHistoryParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertUserPasswordHistoryParams),
		defaultValues: userPasswordHistory ?? {
			hash: ''
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

		await utils.userPasswordHistories.getUserPasswordHistories.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`User Password History ${action}d!`)
	}

	const { mutate: createUserPasswordHistory, isLoading: isCreating } =
		trpc.userPasswordHistories.createUserPasswordHistory.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onSuccess('create', { error: err.message })
		})

	const { mutate: updateUserPasswordHistory, isLoading: isUpdating } =
		trpc.userPasswordHistories.updateUserPasswordHistory.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onSuccess('update', { error: err.message })
		})

	const { mutate: deleteUserPasswordHistory, isLoading: isDeleting } =
		trpc.userPasswordHistories.deleteUserPasswordHistory.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onSuccess('delete', { error: err.message })
		})

	const handleSubmit = (values: NewUserPasswordHistoryParams) => {
		if (editing) {
			updateUserPasswordHistory({ ...values, id: userPasswordHistory.id })
		} else {
			createUserPasswordHistory(values)
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
					name='hash'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Hash</FormLabel>
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
							deleteUserPasswordHistory({ id: userPasswordHistory.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default UserPasswordHistoryForm
