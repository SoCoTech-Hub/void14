'use client'

import {
	BadgeBackpack,
	NewBadgeBackpackParams,
	insertBadgeBackpackParams
} from '@/lib/db/schema/badgeBackpacks'
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
import { Checkbox } from '@/components/ui/checkbox'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const BadgeBackpackForm = ({
	badgeBackpack,
	closeModal
}: {
	badgeBackpack?: BadgeBackpack
	closeModal?: () => void
}) => {
	const editing = !!badgeBackpack?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertBadgeBackpackParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertBadgeBackpackParams),
		defaultValues: badgeBackpack
			? {
					autoSync: false,
					backpackUid: '',
					email: '',
					externalBackpackId: '',
					password: ''
				}
			: {
					autoSync: false,
					backpackUid: '',
					email: '',
					externalBackpackId: '',
					password: ''
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

		await utils.badgeBackpacks.getBadgeBackpacks.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Badge Backpack ${action}d!`)
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

	const { mutate: createBadgeBackpack, isLoading: isCreating } =
		trpc.badgeBackpacks.createBadgeBackpack.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateBadgeBackpack, isLoading: isUpdating } =
		trpc.badgeBackpacks.updateBadgeBackpack.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteBadgeBackpack, isLoading: isDeleting } =
		trpc.badgeBackpacks.deleteBadgeBackpack.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewBadgeBackpackParams) => {
		if (editing) {
			updateBadgeBackpack({ ...values, id: badgeBackpack.id })
		} else {
			createBadgeBackpack(values)
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
					name='autoSync'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Auto Sync</FormLabel>
							<br />
							<FormControl>
								<Checkbox
									{...field}
									checked={!!field.value}
									onCheckedChange={field.onChange}
									value={''}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='backpackUid'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Backpack Uid</FormLabel>
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
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
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
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
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
						onClick={() => deleteBadgeBackpack({ id: badgeBackpack.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default BadgeBackpackForm
