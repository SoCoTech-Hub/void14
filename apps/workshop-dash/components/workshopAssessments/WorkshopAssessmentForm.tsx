'use client'

import {
	WorkshopAssessment,
	NewWorkshopAssessmentParams,
	insertWorkshopAssessmentParams
} from '@/lib/db/schema/workshopAssessments'
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

const WorkshopAssessmentForm = ({
	workshopAssessment,
	closeModal
}: {
	workshopAssessment?: WorkshopAssessment
	closeModal?: () => void
}) => {
	const editing = !!workshopAssessment?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertWorkshopAssessmentParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertWorkshopAssessmentParams),
		defaultValues: workshopAssessment ?? {
			feedbackAuthor: '',
			feedbackAuthorAttachment: 0,
			feedbackAuthorFormat: 0,
			feedbackReviewer: '',
			feedbackReviewerFormat: 0,
			grade: 0.0,
			gradingGrade: 0.0,
			gradingGradeOver: 0.0,
			gradingGradeOverBy: '',
			reviewerId: '',
			submissionId: '',
			weight: 0
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

		await utils.workshopAssessments.getWorkshopAssessments.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Workshop Assessment ${action}d!`)
	}

	const { mutate: createWorkshopAssessment, isLoading: isCreating } =
		trpc.workshopAssessments.createWorkshopAssessment.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateWorkshopAssessment, isLoading: isUpdating } =
		trpc.workshopAssessments.updateWorkshopAssessment.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteWorkshopAssessment, isLoading: isDeleting } =
		trpc.workshopAssessments.deleteWorkshopAssessment.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewWorkshopAssessmentParams) => {
		if (editing) {
			updateWorkshopAssessment({ ...values, id: workshopAssessment.id })
		} else {
			createWorkshopAssessment(values)
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
					name='feedbackAuthor'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Feedback Author</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='feedbackAuthorAttachment'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Feedback Author Attachment</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='feedbackAuthorFormat'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Feedback Author Format</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='feedbackReviewer'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Feedback Reviewer</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='feedbackReviewerFormat'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Feedback Reviewer Format</FormLabel>
							<FormControl>
								<Input {...field} />
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
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='gradingGrade'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Grading Grade</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='gradingGradeOver'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Grading Grade Over</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='gradingGradeOverBy'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Grading Grade Over By</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='reviewerId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Reviewer Id</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='submissionId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Submission Id</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='weight'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Weight</FormLabel>
							<FormControl>
								<Input {...field} />
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
							deleteWorkshopAssessment({ id: workshopAssessment.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default WorkshopAssessmentForm
