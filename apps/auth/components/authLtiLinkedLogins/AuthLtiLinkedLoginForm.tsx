'use client'

import {
	AuthLtiLinkedLogin,
	NewAuthLtiLinkedLoginParams,
	insertAuthLtiLinkedLoginParams
} from '@/lib/db/schema/authLtiLinkedLogins'
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

const AuthLtiLinkedLoginForm = ({
	authLtiLinkedLogin,
	closeModal
}: {
	authLtiLinkedLogin?: AuthLtiLinkedLogin
	closeModal?: () => void
}) => {
	const editing = !!authLtiLinkedLogin?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAuthLtiLinkedLoginParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAuthLtiLinkedLoginParams),
		defaultValues: authLtiLinkedLogin ?? {
			issuer: '',
			issuer256: '',
			sub: '',
			sub256: ''
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

		await utils.authLtiLinkedLogins.getAuthLtiLinkedLogins.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Auth Lti Linked Login ${action}d!`)
	}

	const { mutate: createAuthLtiLinkedLogin, isLoading: isCreating } =
		trpc.authLtiLinkedLogins.createAuthLtiLinkedLogin.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateAuthLtiLinkedLogin, isLoading: isUpdating } =
		trpc.authLtiLinkedLogins.updateAuthLtiLinkedLogin.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteAuthLtiLinkedLogin, isLoading: isDeleting } =
		trpc.authLtiLinkedLogins.deleteAuthLtiLinkedLogin.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewAuthLtiLinkedLoginParams) => {
		if (editing) {
			updateAuthLtiLinkedLogin({ ...values, id: authLtiLinkedLogin.id })
		} else {
			createAuthLtiLinkedLogin(values)
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
					name='issuer'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Issuer</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='issuer256'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Issuer 256</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='sub'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sub</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='sub256'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sub 256</FormLabel>
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
							deleteAuthLtiLinkedLogin({ id: authLtiLinkedLogin.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default AuthLtiLinkedLoginForm
