'use client'

import {
	District,
	NewDistrictParams,
	insertDistrictParams
} from '@/lib/db/schema/districts'
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

const DistrictForm = ({
	district,
	closeModal
}: {
	district?: District
	closeModal?: () => void
}) => {
	const { data: provinces } = trpc.provinces.getProvinces.useQuery()
	const editing = !!district?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertDistrictParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertDistrictParams),
		defaultValues: district ?? {
			name: '',
			provinceId: ''
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

		await utils.districts.getDistricts.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`District ${action}d!`)
	}

	const { mutate: createDistrict, isLoading: isCreating } =
		trpc.districts.createDistrict.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateDistrict, isLoading: isUpdating } =
		trpc.districts.updateDistrict.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteDistrict, isLoading: isDeleting } =
		trpc.districts.deleteDistrict.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewDistrictParams) => {
		if (editing) {
			updateDistrict({ ...values, id: district.id })
		} else {
			createDistrict(values)
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
					name='provinceId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Province Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a province' />
									</SelectTrigger>
									<SelectContent>
										{provinces?.provinces.map((province) => (
											<SelectItem
												key={province.id}
												value={province.id.toString()}
											>
												{province.name}{' '}
												{/* TODO: Replace with a field from the province model */}
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
						onClick={() => deleteDistrict({ id: district.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default DistrictForm
