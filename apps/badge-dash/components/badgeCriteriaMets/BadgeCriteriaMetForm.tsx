'use client'

import {
	BadgeCriteriaMet,
	NewBadgeCriteriaMetParams,
	insertBadgeCriteriaMetParams
} from '@/lib/db/schema/badgeCriteriaMets'
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

const BadgeCriteriaMetForm = ({
	badgeCriteriaMet,
	closeModal
}: {
	badgeCriteriaMet?: BadgeCriteriaMet
	closeModal?: () => void
}) => {
	const { data: badgeCriterias } =
		trpc.badgeCriterias.getBadgeCriterias.useQuery()
	const editing = !!badgeCriteriaMet?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertBadgeCriteriaMetParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertBadgeCriteriaMetParams),
		defaultValues: {
			badgeCriteriaId: badgeCriteriaMet?.badgeCriteriaId || '',
			dateMet: badgeCriteriaMet?.dateMet || 0,
			issuedId: badgeCriteriaMet?.issuedId || ''
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

		await utils.badgeCriteriaMets.getBadgeCriteriaMets.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Badge Criteria Met ${action}d!`)
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

	const { mutate: createBadgeCriteriaMet, isLoading: isCreating } =
		trpc.badgeCriteriaMets.createBadgeCriteriaMet.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateBadgeCriteriaMet, isLoading: isUpdating } =
		trpc.badgeCriteriaMets.updateBadgeCriteriaMet.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteBadgeCriteriaMet, isLoading: isDeleting } =
		trpc.badgeCriteriaMets.deleteBadgeCriteriaMet.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewBadgeCriteriaMetParams) => {
		if (editing) {
			updateBadgeCriteriaMet({ ...values, id: badgeCriteriaMet.id })
		} else {
			createBadgeCriteriaMet(values)
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
					name='badgeCriteriaId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Badge Criteria Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a badge criteria' />
									</SelectTrigger>
									<SelectContent>
										{badgeCriterias?.badgeCriterias.map((badgeCriteria) => (
											<SelectItem
												key={badgeCriteria.id}
												value={badgeCriteria.id.toString()}
											>
												{badgeCriteria.id}{' '}
												{/* TODO: Replace with a field from the badgeCriteria model */}
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
					name='dateMet'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Date Met</FormLabel>
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
					name='issuedId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Issued Id</FormLabel>
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
						onClick={() => deleteBadgeCriteriaMet({ id: badgeCriteriaMet.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default BadgeCriteriaMetForm
