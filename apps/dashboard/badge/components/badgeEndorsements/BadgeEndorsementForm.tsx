'use client'

import {
	BadgeEndorsement,
	NewBadgeEndorsementParams,
	insertBadgeEndorsementParams
} from '@soco/badge-db/schema/badgeEndorsements'
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@soco/utils'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const BadgeEndorsementForm = ({
	badgeEndorsement,
	closeModal
}: {
	badgeEndorsement?: BadgeEndorsement
	closeModal?: () => void
}) => {
	const { data: badges } = trpc.badges.getBadges.useQuery()
	const editing = !!badgeEndorsement?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertBadgeEndorsementParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertBadgeEndorsementParams),
		defaultValues: {
			badgeId: badgeEndorsement?.badgeId || '',
			claimComment: badgeEndorsement?.claimComment || '',
			claimId: badgeEndorsement?.claimId || '',
			dateIssued: badgeEndorsement?.dateIssued
				? format(new Date(badgeEndorsement.dateIssued), 'yyyy-MM-dd')
				: '',
			issuerEmail: badgeEndorsement?.issuerEmail || '',
			issuerName: badgeEndorsement?.issuerName || '',
			issuerUrl: badgeEndorsement?.issuerUrl || ''
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

		await utils.badgeEndorsements.getBadgeEndorsements.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Badge Endorsement ${action}d!`)
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
	const { mutate: createBadgeEndorsement, isLoading: isCreating } =
		trpc.badgeEndorsements.createBadgeEndorsement.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateBadgeEndorsement, isLoading: isUpdating } =
		trpc.badgeEndorsements.updateBadgeEndorsement.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteBadgeEndorsement, isLoading: isDeleting } =
		trpc.badgeEndorsements.deleteBadgeEndorsement.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewBadgeEndorsementParams) => {
		if (editing) {
			updateBadgeEndorsement({ ...values, id: badgeEndorsement.id })
		} else {
			createBadgeEndorsement(values)
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
					name='claimComment'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Claim Comment</FormLabel>
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
					name='claimId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Claim Id</FormLabel>
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
					name='dateIssued'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Date Issued</FormLabel>
							<br />
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={cn(
												'w-[240px] pl-3 text-left font-normal',
												!field.value && 'text-muted-foreground'
											)}
										>
											{field.value ? (
												format(new Date(field.value), 'PPP')
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent
									className='w-auto p-0'
									align='start'
								>
									<Calendar
										mode='single'
										selected={new Date(field.value)}
										onSelect={field.onChange}
										disabled={(date) =>
											date > new Date() || date < new Date('1900-01-01')
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='issuerEmail'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Issuer Email</FormLabel>
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
					name='issuerName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Issuer Name</FormLabel>
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
					name='issuerUrl'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Issuer Url</FormLabel>
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
						onClick={() => deleteBadgeEndorsement({ id: badgeEndorsement.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default BadgeEndorsementForm
