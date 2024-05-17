'use client'

import {
	BadgeAlignment,
	NewBadgeAlignmentParams,
	insertBadgeAlignmentParams
} from '@/lib/db/schema/badgeAlignments'
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

const BadgeAlignmentForm = ({
	badgeAlignment,
	closeModal
}: {
	badgeAlignment?: BadgeAlignment
	closeModal?: () => void
}) => {
	const { data: badges } = trpc.badges.getBadges.useQuery()
	const editing = !!badgeAlignment?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertBadgeAlignmentParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertBadgeAlignmentParams),
		defaultValues: badgeAlignment ?? {
			badgeId: '',
			targetCode: '',
			targetDescription: '',
			targetFramework: '',
			targetName: '',
			targetUrl: ''
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

		await utils.badgeAlignments.getBadgeAlignments.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Badge Alignment ${action}d!`)
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

	const { mutate: createBadgeAlignment, isLoading: isCreating } =
		trpc.badgeAlignments.createBadgeAlignment.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateBadgeAlignment, isLoading: isUpdating } =
		trpc.badgeAlignments.updateBadgeAlignment.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteBadgeAlignment, isLoading: isDeleting } =
		trpc.badgeAlignments.deleteBadgeAlignment.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewBadgeAlignmentParams) => {
		if (editing) {
			updateBadgeAlignment({ ...values, id: badgeAlignment.id })
		} else {
			createBadgeAlignment(values)
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
					name='badgeId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Badge Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a badge' />
									</SelectTrigger>
									<SelectContent>
										{badges?.badges.map((badge) => (
											<SelectItem
												key={badge.id}
												value={badge.id.toString()}
											>
												{badge.name}
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
					name='targetCode'
					render={({ field, fieldState: { error } }) => (
						<FormItem>
							<FormLabel>Target Code</FormLabel>
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
					name='targetDescription'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Target Description</FormLabel>
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
					name='targetFramework'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Target Framework</FormLabel>
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
					name='targetName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Target Name</FormLabel>
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
					name='targetUrl'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Target Url</FormLabel>
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
						onClick={() => deleteBadgeAlignment({ id: badgeAlignment.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default BadgeAlignmentForm
