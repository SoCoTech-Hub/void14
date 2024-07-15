'use client'

import {
	BadgeRelated,
	NewBadgeRelatedParams,
	insertBadgeRelatedParams
} from '@soco/badge-db/schema/badgeRelateds'
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

const BadgeRelatedForm = ({
	badgeRelated,
	closeModal
}: {
	badgeRelated?: BadgeRelated
	closeModal?: () => void
}) => {
	const { data: badges } = trpc.badges.getBadges.useQuery()
	const editing = !!badgeRelated?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertBadgeRelatedParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertBadgeRelatedParams),
		defaultValues: badgeRelated ?? {
			badgeId: '',
			relatedBadgeId: ''
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

		await utils.badgeRelateds.getBadgeRelateds.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Badge Related ${action}d!`)
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

	const { mutate: createBadgeRelated, isLoading: isCreating } =
		trpc.badgeRelateds.createBadgeRelated.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateBadgeRelated, isLoading: isUpdating } =
		trpc.badgeRelateds.updateBadgeRelated.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteBadgeRelated, isLoading: isDeleting } =
		trpc.badgeRelateds.deleteBadgeRelated.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewBadgeRelatedParams) => {
		if (editing) {
			updateBadgeRelated({ ...values, id: badgeRelated.id })
		} else {
			createBadgeRelated(values)
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
					name='relatedBadgeId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Related Badge Id</FormLabel>
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
						onClick={() => deleteBadgeRelated({ id: badgeRelated.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default BadgeRelatedForm
