'use client'

import {
	Oauth2AccessToken,
	NewOauth2AccessTokenParams,
	insertOauth2AccessTokenParams
} from '@soco/oauth2-db/schema/oauth2AccessTokens'
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

const Oauth2AccessTokenForm = ({
	oauth2AccessToken,
	closeModal
}: {
	oauth2AccessToken?: Oauth2AccessToken
	closeModal?: () => void
}) => {
	const { data: oauth2issuers } = trpc.oauth2issuers.getOauth2issuers.useQuery()
	const editing = !!oauth2AccessToken?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertOauth2AccessTokenParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertOauth2AccessTokenParams),
		defaultValues: oauth2AccessToken ?? {
			expires: 0,
			oauth2issuerId: '',
			scope: '',
			token: ''
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

		await utils.oauth2AccessTokens.getOauth2AccessTokens.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Oauth2 Access Token ${action}d!`)
	}

	const { mutate: createOauth2AccessToken, isLoading: isCreating } =
		trpc.oauth2AccessTokens.createOauth2AccessToken.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateOauth2AccessToken, isLoading: isUpdating } =
		trpc.oauth2AccessTokens.updateOauth2AccessToken.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteOauth2AccessToken, isLoading: isDeleting } =
		trpc.oauth2AccessTokens.deleteOauth2AccessToken.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewOauth2AccessTokenParams) => {
		if (editing) {
			updateOauth2AccessToken({ ...values, id: oauth2AccessToken.id })
		} else {
			createOauth2AccessToken(values)
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
					name='expires'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Expires</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='oauth2issuerId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Oauth2issuer Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a oauth2issuer' />
									</SelectTrigger>
									<SelectContent>
										{oauth2issuers?.oauth2issuers.map((oauth2issuer) => (
											<SelectItem
												key={oauth2issuer.id}
												value={oauth2issuer.id.toString()}
											>
												{oauth2issuer.id}{' '}
												{/* TODO: Replace with a field from the oauth2issuer model */}
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
					name='scope'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Scope</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='token'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Token</FormLabel>
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
							deleteOauth2AccessToken({ id: oauth2AccessToken.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default Oauth2AccessTokenForm
