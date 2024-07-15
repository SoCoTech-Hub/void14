'use client'

import {
	BadgeCriteria,
	NewBadgeCriteriaParams,
	insertBadgeCriteriaParams
} from '@soco/badge-db/schema/badgeCriterias'
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const BadgeCriteriaForm = ({
	badgeCriteria,
	closeModal
}: {
	badgeCriteria?: BadgeCriteria
	closeModal?: () => void
}) => {
	const { data: badges } = trpc.badges.getBadges.useQuery()
	const editing = !!badgeCriteria?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertBadgeCriteriaParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertBadgeCriteriaParams),
		defaultValues: {
			badgeId: badgeCriteria?.badgeId || '',
			criteriaType: badgeCriteria?.criteriaType || '',
			description: badgeCriteria?.description || '',
			descriptionFormat: badgeCriteria?.descriptionFormat || 0,
			method: badgeCriteria?.method || false
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

		await utils.badgeCriterias.getBadgeCriterias.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Badge Criteria ${action}d!`)
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
	const { mutate: createBadgeCriteria, isLoading: isCreating } =
		trpc.badgeCriterias.createBadgeCriteria.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateBadgeCriteria, isLoading: isUpdating } =
		trpc.badgeCriterias.updateBadgeCriteria.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteBadgeCriteria, isLoading: isDeleting } =
		trpc.badgeCriterias.deleteBadgeCriteria.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewBadgeCriteriaParams) => {
		if (editing) {
			updateBadgeCriteria({ ...values, id: badgeCriteria.id })
		} else {
			createBadgeCriteria(values)
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
												{badge.id}{' '}
												{/* TODO: Replace with a field from the badge model */}
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
					name='criteriaType'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Criteria Type</FormLabel>
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
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
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
					name='descriptionFormat'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description Format</FormLabel>
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
					name='method'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Method</FormLabel>
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
						onClick={() => deleteBadgeCriteria({ id: badgeCriteria.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default BadgeCriteriaForm
