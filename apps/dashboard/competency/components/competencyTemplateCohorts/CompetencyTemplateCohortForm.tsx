'use client'

import {
	CompetencyTemplateCohort,
	NewCompetencyTemplateCohortParams,
	insertCompetencyTemplateCohortParams
} from '@soco/competency-db/schema/competencyTemplateCohorts'
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

const CompetencyTemplateCohortForm = ({
	competencyTemplateCohort,
	closeModal
}: {
	competencyTemplateCohort?: CompetencyTemplateCohort
	closeModal?: () => void
}) => {
	const { data: competencyTemplates } =
		trpc.competencyTemplates.getCompetencyTemplates.useQuery()
	const editing = !!competencyTemplateCohort?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertCompetencyTemplateCohortParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertCompetencyTemplateCohortParams),
		defaultValues: competencyTemplateCohort ?? {
			competencyTemplateId: '',
			cohortId: ''
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

		await utils.competencyTemplateCohorts.getCompetencyTemplateCohorts.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Competency Template Cohort ${action}d!`)
	}

	const { mutate: createCompetencyTemplateCohort, isLoading: isCreating } =
		trpc.competencyTemplateCohorts.createCompetencyTemplateCohort.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateCompetencyTemplateCohort, isLoading: isUpdating } =
		trpc.competencyTemplateCohorts.updateCompetencyTemplateCohort.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteCompetencyTemplateCohort, isLoading: isDeleting } =
		trpc.competencyTemplateCohorts.deleteCompetencyTemplateCohort.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewCompetencyTemplateCohortParams) => {
		if (editing) {
			updateCompetencyTemplateCohort({
				...values,
				id: competencyTemplateCohort.id
			})
		} else {
			createCompetencyTemplateCohort(values)
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
					name='competencyTemplateId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Competency Template Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a competency template' />
									</SelectTrigger>
									<SelectContent>
										{competencyTemplates?.competencyTemplates.map(
											(competencyTemplate) => (
												<SelectItem
													key={competencyTemplate.id}
													value={competencyTemplate.id.toString()}
												>
													{competencyTemplate.id}{' '}
													{/* TODO: Replace with a field from the competencyTemplate model */}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='cohortId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Cohort Id</FormLabel>
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
							deleteCompetencyTemplateCohort({
								id: competencyTemplateCohort.id
							})
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default CompetencyTemplateCohortForm
