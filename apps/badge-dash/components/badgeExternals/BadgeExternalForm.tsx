'use client'

import {
	BadgeExternal,
	NewBadgeExternalParams,
	insertBadgeExternalParams
} from '@/lib/db/schema/badgeExternals'
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

const BadgeExternalForm = ({
	badgeExternal,
	closeModal
}: {
	badgeExternal?: BadgeExternal
	closeModal?: () => void
}) => {
	const { data: badgeBackpacks } =
		trpc.badgeBackpacks.getBadgeBackpacks.useQuery()
	const editing = !!badgeExternal?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertBadgeExternalParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertBadgeExternalParams),
		defaultValues: badgeExternal ?? {
			assertion: '',
			badgeBackpackId: '',
			collectionId: '',
			entityId: ''
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

		await utils.badgeExternals.getBadgeExternals.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Badge External ${action}d!`)
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
	const { mutate: createBadgeExternal, isLoading: isCreating } =
		trpc.badgeExternals.createBadgeExternal.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateBadgeExternal, isLoading: isUpdating } =
		trpc.badgeExternals.updateBadgeExternal.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteBadgeExternal, isLoading: isDeleting } =
		trpc.badgeExternals.deleteBadgeExternal.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewBadgeExternalParams) => {
		if (editing) {
			updateBadgeExternal({ ...values, id: badgeExternal.id })
		} else {
			createBadgeExternal(values)
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
					name='assertion'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Assertion</FormLabel>
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
					name='badgeBackpackId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Badge Backpack Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a badge backpack' />
									</SelectTrigger>
									<SelectContent>
										{badgeBackpacks?.badgeBackpacks.map((badgeBackpack) => (
											<SelectItem
												key={badgeBackpack.id}
												value={badgeBackpack.id.toString()}
											>
												{badgeBackpack.id}{' '}
												{/* TODO: Replace with a field from the badgeBackpack model */}
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
					name='collectionId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Collection Id</FormLabel>
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
					name='entityId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Entity Id</FormLabel>
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
						onClick={() => deleteBadgeExternal({ id: badgeExternal.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default BadgeExternalForm
