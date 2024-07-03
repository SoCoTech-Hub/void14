'use client'

import {
	BadgeBackpackOauth2,
	NewBadgeBackpackOauth2Params,
	insertBadgeBackpackOauth2Params
} from '@/lib/db/schema/badgeBackpackOauth2s'
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

const BadgeBackpackOauth2Form = ({
	badgeBackpackOauth2,
	closeModal
}: {
	badgeBackpackOauth2?: BadgeBackpackOauth2
	closeModal?: () => void
}) => {
	const editing = !!badgeBackpackOauth2?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertBadgeBackpackOauth2Params>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertBadgeBackpackOauth2Params),
		defaultValues: badgeBackpackOauth2
			? {
					expires: badgeBackpackOauth2.expires || 0,
					externalBackpackId: badgeBackpackOauth2.externalBackpackId || '',
					issuerId: badgeBackpackOauth2.issuerId || '',
					refreshToken: badgeBackpackOauth2.refreshToken || '',
					scope: badgeBackpackOauth2.scope || '',
					token: badgeBackpackOauth2.token || ''
				}
			: {
					expires: 0,
					externalBackpackId: '',
					issuerId: '',
					refreshToken: '',
					scope: '',
					token: ''
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

		await utils.badgeBackpackOauth2s.getBadgeBackpackOauth2s.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Badge Backpack Oauth2 ${action}d!`)
	}
	const onError = async (
		action: 'create' | 'update' | 'delete',
		data?: { error?: string }
	) => {
		if (data?.error) {
			toast.error(data.error)
			return
		}
	}
	const { mutate: createBadgeBackpackOauth2, isLoading: isCreating } =
		trpc.badgeBackpackOauth2s.createBadgeBackpackOauth2.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateBadgeBackpackOauth2, isLoading: isUpdating } =
		trpc.badgeBackpackOauth2s.updateBadgeBackpackOauth2.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteBadgeBackpackOauth2, isLoading: isDeleting } =
		trpc.badgeBackpackOauth2s.deleteBadgeBackpackOauth2.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewBadgeBackpackOauth2Params) => {
		if (editing) {
			updateBadgeBackpackOauth2({ ...values, id: badgeBackpackOauth2.id })
		} else {
			createBadgeBackpackOauth2(values)
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
					name='externalBackpackId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>External Backpack Id</FormLabel>
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
					name='issuerId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Issuer Id</FormLabel>
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
					name='refreshToken'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Refresh Token</FormLabel>
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
					name='scope'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Scope</FormLabel>
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
					name='token'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Token</FormLabel>
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
							deleteBadgeBackpackOauth2({ id: badgeBackpackOauth2.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default BadgeBackpackOauth2Form
