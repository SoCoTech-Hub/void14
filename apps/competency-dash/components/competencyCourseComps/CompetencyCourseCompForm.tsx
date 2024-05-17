'use client'

import {
	CompetencyCourseComp,
	NewCompetencyCourseCompParams,
	insertCompetencyCourseCompParams
} from '@/lib/db/schema/competencyCourseComps'
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

const CompetencyCourseCompForm = ({
	competencyCourseComp,
	closeModal
}: {
	competencyCourseComp?: CompetencyCourseComp
	closeModal?: () => void
}) => {
	const { data: competencies } = trpc.competencies.getCompetencies.useQuery()
	const editing = !!competencyCourseComp?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertCompetencyCourseCompParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertCompetencyCourseCompParams),
		defaultValues: competencyCourseComp ?? {
			competencyId: '',
			courseId: '',
			ruleOutcome: '',
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

		await utils.competencyCourseComps.getCompetencyCourseComps.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Competency Course Comp ${action}d!`)
	}

	const { mutate: createCompetencyCourseComp, isLoading: isCreating } =
		trpc.competencyCourseComps.createCompetencyCourseComp.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateCompetencyCourseComp, isLoading: isUpdating } =
		trpc.competencyCourseComps.updateCompetencyCourseComp.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteCompetencyCourseComp, isLoading: isDeleting } =
		trpc.competencyCourseComps.deleteCompetencyCourseComp.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewCompetencyCourseCompParams) => {
		if (editing) {
			updateCompetencyCourseComp({ ...values, id: competencyCourseComp.id })
		} else {
			createCompetencyCourseComp(values)
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
					name='courseId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Course Id</FormLabel>
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
					name='ruleOutcome'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rule Outcome</FormLabel>
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
							deleteCompetencyCourseComp({ id: competencyCourseComp.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default CompetencyCourseCompForm
