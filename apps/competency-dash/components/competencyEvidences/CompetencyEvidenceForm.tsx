'use client'

import {
	CompetencyEvidence,
	NewCompetencyEvidenceParams,
	insertCompetencyEvidenceParams
} from '@/lib/db/schema/competencyEvidences'
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
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const CompetencyEvidenceForm = ({
	competencyEvidence,
	closeModal
}: {
	competencyEvidence?: CompetencyEvidence
	closeModal?: () => void
}) => {
	const editing = !!competencyEvidence?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertCompetencyEvidenceParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertCompetencyEvidenceParams),
		defaultValues: competencyEvidence ?? {
			action: 0,
			actionUserId: '',
			contextId: '',
			desca: '',
			descComponent: '',
			descIdentifier: '',
			grade: 0,
			note: '',
			url: ''
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

		await utils.competencyEvidences.getCompetencyEvidences.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Competency Evidence ${action}d!`)
	}

	const { mutate: createCompetencyEvidence, isLoading: isCreating } =
		trpc.competencyEvidences.createCompetencyEvidence.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateCompetencyEvidence, isLoading: isUpdating } =
		trpc.competencyEvidences.updateCompetencyEvidence.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteCompetencyEvidence, isLoading: isDeleting } =
		trpc.competencyEvidences.deleteCompetencyEvidence.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewCompetencyEvidenceParams) => {
		if (editing) {
			updateCompetencyEvidence({ ...values, id: competencyEvidence.id })
		} else {
			createCompetencyEvidence(values)
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
					name='action'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Action</FormLabel>
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
					name='actionUserId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Action User Id</FormLabel>
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
					name='contextId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Context Id</FormLabel>
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
					name='desca'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Desca</FormLabel>
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
					name='descComponent'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Desc Component</FormLabel>
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
					name='descIdentifier'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Desc Identifier</FormLabel>
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
					name='grade'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Grade</FormLabel>
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
					name='note'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Note</FormLabel>
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
					name='url'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Url</FormLabel>
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
							deleteCompetencyEvidence({ id: competencyEvidence.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default CompetencyEvidenceForm
