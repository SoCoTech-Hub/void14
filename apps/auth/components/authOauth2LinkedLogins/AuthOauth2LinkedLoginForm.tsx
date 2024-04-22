'use client'

import {
	AuthOauth2LinkedLogin,
	NewAuthOauth2LinkedLoginParams,
	insertAuthOauth2LinkedLoginParams
} from '@/lib/db/schema/authOauth2LinkedLogins'
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

const AuthOauth2LinkedLoginForm = ({
	authOauth2LinkedLogin,
	closeModal
}: {
	authOauth2LinkedLogin?: AuthOauth2LinkedLogin
	closeModal?: () => void
}) => {
	const editing = !!authOauth2LinkedLogin?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAuthOauth2LinkedLoginParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAuthOauth2LinkedLoginParams),
		defaultValues: authOauth2LinkedLogin ?? {
			confirmToken: '',
			confirmTokenExpires: 0,
			email: '',
			issuerId: '',
			userModifiedId: '',
			userName: ''
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

		await utils.authOauth2LinkedLogins.getAuthOauth2LinkedLogins.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Auth Oauth2 Linked Login ${action}d!`)
	}

	const { mutate: createAuthOauth2LinkedLogin, isLoading: isCreating } =
		trpc.authOauth2LinkedLogins.createAuthOauth2LinkedLogin.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateAuthOauth2LinkedLogin, isLoading: isUpdating } =
		trpc.authOauth2LinkedLogins.updateAuthOauth2LinkedLogin.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteAuthOauth2LinkedLogin, isLoading: isDeleting } =
		trpc.authOauth2LinkedLogins.deleteAuthOauth2LinkedLogin.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewAuthOauth2LinkedLoginParams) => {
		if (editing) {
			updateAuthOauth2LinkedLogin({ ...values, id: authOauth2LinkedLogin.id })
		} else {
			createAuthOauth2LinkedLogin(values)
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
					name='confirmToken'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Token</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='confirmTokenExpires'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Token Expires</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='issuerId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Issuer Id</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='userModifiedId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>User Modified Id</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='userName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>User Name</FormLabel>
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
							deleteAuthOauth2LinkedLogin({ id: authOauth2LinkedLogin.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default AuthOauth2LinkedLoginForm
