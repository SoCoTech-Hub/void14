'use client'

import {
	BadgeCriteriaParam,
	NewBadgeCriteriaParamParams,
	insertBadgeCriteriaParamParams
} from '@soco/badge-db/schema/badgeCriteriaParams'
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

const BadgeCriteriaParamForm = ({
	badgeCriteriaParam,
	closeModal
}: {
	badgeCriteriaParam?: BadgeCriteriaParam
	closeModal?: () => void
}) => {
	const { data: badgeCriterias } =
		trpc.badgeCriterias.getBadgeCriterias.useQuery()
	const editing = !!badgeCriteriaParam?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertBadgeCriteriaParamParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertBadgeCriteriaParamParams),
		defaultValues: badgeCriteriaParam ?? {
			badgeCriteriaId: '',
			name: '',
			value: ''
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

		await utils.badgeCriteriaParams.getBadgeCriteriaParams.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Badge Criteria Param ${action}d!`)
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
	const { mutate: createBadgeCriteriaParam, isLoading: isCreating } =
		trpc.badgeCriteriaParams.createBadgeCriteriaParam.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateBadgeCriteriaParam, isLoading: isUpdating } =
		trpc.badgeCriteriaParams.updateBadgeCriteriaParam.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteBadgeCriteriaParam, isLoading: isDeleting } =
		trpc.badgeCriteriaParams.deleteBadgeCriteriaParam.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewBadgeCriteriaParamParams) => {
		if (editing) {
			updateBadgeCriteriaParam({ ...values, id: badgeCriteriaParam.id })
		} else {
			createBadgeCriteriaParam(values)
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
												{badgeCriteria.criteriaType}
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
					name='value'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Value</FormLabel>
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
							deleteBadgeCriteriaParam({ id: badgeCriteriaParam.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default BadgeCriteriaParamForm
