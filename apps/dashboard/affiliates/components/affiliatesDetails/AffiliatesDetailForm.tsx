'use client'

import {
	AffiliatesDetail,
	NewAffiliatesDetailParams,
	insertAffiliatesDetailParams
} from '@soco/affiliates-db/schema/affiliatesDetails'
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

const AffiliatesDetailForm = ({
	affiliatesDetail,
	closeModal
}: {
	affiliatesDetail?: AffiliatesDetail
	closeModal?: () => void
}) => {
	const { data: affiliates } = trpc.affiliates.getAffiliates.useQuery()
	const editing = !!affiliatesDetail?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAffiliatesDetailParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAffiliatesDetailParams),
		defaultValues: affiliatesDetail ?? {
			name: '',
			number: 0,
			code: '',
			bank: '',
			type: '',
			affiliateId: ''
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

		await utils.affiliatesDetails.getAffiliatesDetails.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Affiliates Detail ${action}d!`)
	}

	const { mutate: createAffiliatesDetail, isLoading: isCreating } =
		trpc.affiliatesDetails.createAffiliatesDetail.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateAffiliatesDetail, isLoading: isUpdating } =
		trpc.affiliatesDetails.updateAffiliatesDetail.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteAffiliatesDetail, isLoading: isDeleting } =
		trpc.affiliatesDetails.deleteAffiliatesDetail.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewAffiliatesDetailParams) => {
		if (editing) {
			updateAffiliatesDetail({ ...values, id: affiliatesDetail.id })
		} else {
			createAffiliatesDetail(values)
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
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
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
					name='number'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Number</FormLabel>
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
					name='code'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Code</FormLabel>
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
					name='bank'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bank</FormLabel>
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
				<FormField
					control={form.control}
					name='affiliateId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Affiliate Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a affiliate' />
									</SelectTrigger>
									<SelectContent>
										{affiliates?.affiliates.map((affiliate) => (
											<SelectItem
												key={affiliate.id}
												value={affiliate.id.toString()}
											>
												{affiliate.note}{' '}
												{/* TODO: Replace with a field from the affiliate model */}
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
						onClick={() => deleteAffiliatesDetail({ id: affiliatesDetail.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default AffiliatesDetailForm
