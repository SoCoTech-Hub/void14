'use client'

import {
	BadgeExternalBackpack,
	NewBadgeExternalBackpackParams,
	insertBadgeExternalBackpackParams
} from '@soco/badge-db/schema/badgeExternalBackpacks'
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

const BadgeExternalBackpackForm = ({
	badgeExternalBackpack,
	closeModal
}: {
	badgeExternalBackpack?: BadgeExternalBackpack
	closeModal?: () => void
}) => {
	const editing = !!badgeExternalBackpack?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertBadgeExternalBackpackParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertBadgeExternalBackpackParams),
		defaultValues: {
			apiVersion: badgeExternalBackpack?.apiVersion || '',
			backpackApiUrl: badgeExternalBackpack?.backpackApiUrl || '',
			backpackWebUrl: badgeExternalBackpack?.backpackWebUrl || '',
			oauth2IssuerId: badgeExternalBackpack?.oauth2IssuerId || '',
			sortOrder: badgeExternalBackpack?.sortOrder ?? 0
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

		await utils.badgeExternalBackpacks.getBadgeExternalBackpacks.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Badge External Backpack ${action}d!`)
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
	const { mutate: createBadgeExternalBackpack, isLoading: isCreating } =
		trpc.badgeExternalBackpacks.createBadgeExternalBackpack.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateBadgeExternalBackpack, isLoading: isUpdating } =
		trpc.badgeExternalBackpacks.updateBadgeExternalBackpack.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteBadgeExternalBackpack, isLoading: isDeleting } =
		trpc.badgeExternalBackpacks.deleteBadgeExternalBackpack.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewBadgeExternalBackpackParams) => {
		if (editing) {
			updateBadgeExternalBackpack({ ...values, id: badgeExternalBackpack.id })
		} else {
			createBadgeExternalBackpack(values)
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
					name='apiVersion'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Api Version</FormLabel>
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
					name='backpackApiUrl'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Backpack Api Url</FormLabel>
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
					name='backpackWebUrl'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Backpack Web Url</FormLabel>
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
					name='oauth2IssuerId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Oauth2 Issuer Id</FormLabel>
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
					name='sortOrder'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sort Order</FormLabel>
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
							deleteBadgeExternalBackpack({ id: badgeExternalBackpack.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default BadgeExternalBackpackForm
