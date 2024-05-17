'use client'

import {
	WorkshopFormRubric,
	NewWorkshopFormRubricParams,
	insertWorkshopFormRubricParams
} from '@/lib/db/schema/workshopFormRubrics'
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

const WorkshopFormRubricForm = ({
	workshopFormRubric,
	closeModal
}: {
	workshopFormRubric?: WorkshopFormRubric
	closeModal?: () => void
}) => {
	const { data: workshops } = trpc.workshops.getWorkshops.useQuery()
	const editing = !!workshopFormRubric?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertWorkshopFormRubricParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertWorkshopFormRubricParams),
		defaultValues: workshopFormRubric ?? {
			description: '',
			descriptionFormat: 0,
			sort: 0,
			workshopId: ''
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

		await utils.workshopFormRubrics.getWorkshopFormRubrics.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Workshop Form Rubric ${action}d!`)
	}

	const { mutate: createWorkshopFormRubric, isLoading: isCreating } =
		trpc.workshopFormRubrics.createWorkshopFormRubric.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateWorkshopFormRubric, isLoading: isUpdating } =
		trpc.workshopFormRubrics.updateWorkshopFormRubric.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteWorkshopFormRubric, isLoading: isDeleting } =
		trpc.workshopFormRubrics.deleteWorkshopFormRubric.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewWorkshopFormRubricParams) => {
		if (editing) {
			updateWorkshopFormRubric({ ...values, id: workshopFormRubric.id })
		} else {
			createWorkshopFormRubric(values)
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
					name='sort'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sort</FormLabel>
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
					name='workshopId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Workshop Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a workshop' />
									</SelectTrigger>
									<SelectContent>
										{workshops?.workshops.map((workshop) => (
											<SelectItem
												key={workshop.id}
												value={workshop.id.toString()}
											>
												{workshop.id}{' '}
												{/* TODO: Replace with a field from the workshop model */}
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
						onClick={() =>
							deleteWorkshopFormRubric({ id: workshopFormRubric.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default WorkshopFormRubricForm
