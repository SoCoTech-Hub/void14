'use client'

import {
	CompetencyRelatedComp,
	NewCompetencyRelatedCompParams,
	insertCompetencyRelatedCompParams
} from '@soco/competency-db/schema/competencyRelatedComps'
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

const CompetencyRelatedCompForm = ({
	competencyRelatedComp,
	closeModal
}: {
	competencyRelatedComp?: CompetencyRelatedComp
	closeModal?: () => void
}) => {
	const { data: competencies } = trpc.competencies.getCompetencies.useQuery()
	const editing = !!competencyRelatedComp?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertCompetencyRelatedCompParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertCompetencyRelatedCompParams),
		defaultValues: competencyRelatedComp ?? {
			competencyId: '',
			relatedCompetencyId: ''
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

		await utils.competencyRelatedComps.getCompetencyRelatedComps.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Competency Related Comp ${action}d!`)
	}

	const { mutate: createCompetencyRelatedComp, isLoading: isCreating } =
		trpc.competencyRelatedComps.createCompetencyRelatedComp.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateCompetencyRelatedComp, isLoading: isUpdating } =
		trpc.competencyRelatedComps.updateCompetencyRelatedComp.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteCompetencyRelatedComp, isLoading: isDeleting } =
		trpc.competencyRelatedComps.deleteCompetencyRelatedComp.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewCompetencyRelatedCompParams) => {
		if (editing) {
			updateCompetencyRelatedComp({ ...values, id: competencyRelatedComp.id })
		} else {
			createCompetencyRelatedComp(values)
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
					name='relatedCompetencyId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Related Competency Id</FormLabel>
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
							deleteCompetencyRelatedComp({ id: competencyRelatedComp.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default CompetencyRelatedCompForm
