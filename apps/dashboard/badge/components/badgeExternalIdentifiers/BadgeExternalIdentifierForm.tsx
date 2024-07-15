'use client'

import {
	BadgeExternalIdentifier,
	NewBadgeExternalIdentifierParams,
	insertBadgeExternalIdentifierParams
} from '@soco/badge-db/schema/badgeExternalIdentifiers'
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

const BadgeExternalIdentifierForm = ({
	badgeExternalIdentifier,
	closeModal
}: {
	badgeExternalIdentifier?: BadgeExternalIdentifier
	closeModal?: () => void
}) => {
	const { data: badgeBackpacks } =
		trpc.badgeBackpacks.getBadgeBackpacks.useQuery()
	const editing = !!badgeExternalIdentifier?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertBadgeExternalIdentifierParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertBadgeExternalIdentifierParams),
		defaultValues: badgeExternalIdentifier ?? {
			externalId: '',
			internalId: '',
			badgeBackpackId: '',
			type: ''
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

		await utils.badgeExternalIdentifiers.getBadgeExternalIdentifiers.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Badge External Identifier ${action}d!`)
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

	const { mutate: createBadgeExternalIdentifier, isLoading: isCreating } =
		trpc.badgeExternalIdentifiers.createBadgeExternalIdentifier.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateBadgeExternalIdentifier, isLoading: isUpdating } =
		trpc.badgeExternalIdentifiers.updateBadgeExternalIdentifier.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteBadgeExternalIdentifier, isLoading: isDeleting } =
		trpc.badgeExternalIdentifiers.deleteBadgeExternalIdentifier.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewBadgeExternalIdentifierParams) => {
		if (editing) {
			updateBadgeExternalIdentifier({
				...values,
				id: badgeExternalIdentifier.id
			})
		} else {
			createBadgeExternalIdentifier(values)
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
					name='externalId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>External Id</FormLabel>
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
					name='internalId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Internal Id</FormLabel>
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
					name='type'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Type</FormLabel>
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
							deleteBadgeExternalIdentifier({ id: badgeExternalIdentifier.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default BadgeExternalIdentifierForm
