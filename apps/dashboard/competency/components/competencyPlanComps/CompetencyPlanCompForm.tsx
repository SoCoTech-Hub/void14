'use client'

import {
	CompetencyPlanComp,
	NewCompetencyPlanCompParams,
	insertCompetencyPlanCompParams
} from '@soco/competency-db/schema/competencyPlanComps'
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

const CompetencyPlanCompForm = ({
	competencyPlanComp,
	closeModal
}: {
	competencyPlanComp?: CompetencyPlanComp
	closeModal?: () => void
}) => {
	const { data: competencies } = trpc.competencies.getCompetencies.useQuery()
	const { data: competencyPlans } =
		trpc.competencyPlans.getCompetencyPlans.useQuery()
	const editing = !!competencyPlanComp?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertCompetencyPlanCompParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertCompetencyPlanCompParams),
		defaultValues: competencyPlanComp ?? {
			competencyId: '',
			competencyPlanId: '',
			sortOrder: 0
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

		await utils.competencyPlanComps.getCompetencyPlanComps.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Competency Plan Comp ${action}d!`)
	}

	const { mutate: createCompetencyPlanComp, isLoading: isCreating } =
		trpc.competencyPlanComps.createCompetencyPlanComp.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateCompetencyPlanComp, isLoading: isUpdating } =
		trpc.competencyPlanComps.updateCompetencyPlanComp.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteCompetencyPlanComp, isLoading: isDeleting } =
		trpc.competencyPlanComps.deleteCompetencyPlanComp.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewCompetencyPlanCompParams) => {
		if (editing) {
			updateCompetencyPlanComp({ ...values, id: competencyPlanComp.id })
		} else {
			createCompetencyPlanComp(values)
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
					name='competencyId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Competency Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a competency' />
									</SelectTrigger>
									<SelectContent>
										{competencies?.competencies.map((competency) => (
											<SelectItem
												key={competency.competency.id}
												value={competency.competency.id.toString()}
											>
												{competency.competency.id}{' '}
												{/* TODO: Replace with a field from the competency model */}
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
					name='competencyPlanId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Competency Plan Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a competency plan' />
									</SelectTrigger>
									<SelectContent>
										{competencyPlans?.competencyPlans.map((competencyPlan) => (
											<SelectItem
												key={competencyPlan.id}
												value={competencyPlan.id.toString()}
											>
												{competencyPlan.id}{' '}
												{/* TODO: Replace with a field from the competencyPlan model */}
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
					name='sortOrder'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sort Order</FormLabel>
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
							deleteCompetencyPlanComp({ id: competencyPlanComp.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default CompetencyPlanCompForm
