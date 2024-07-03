'use client'

import {
	Workshop,
	NewWorkshopParams,
	insertWorkshopParams
} from '@/lib/db/schema/workshops'
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
import { Checkbox } from '@/components/ui/checkbox'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const WorkshopForm = ({
	workshop,
	closeModal
}: {
	workshop?: Workshop
	closeModal?: () => void
}) => {
	const editing = !!workshop?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertWorkshopParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertWorkshopParams),
		defaultValues: workshop ?? {
			assessmentStart: 0,
			conclusion: '',
			conclusionFormat: 0,
			courseId: '',
			evaluation: '',
			examplesModen: 0,
			grade: 0.0,
			gradeDecimals: 0,
			gradingGrade: 0.0,
			instructAuthors: '',
			instructAuthorsFormat: 0,
			instructReviewers: '',
			instructReviewersFormat: 0,
			intro: '',
			introFormat: 0,
			lateSubmissions: false,
			maxBytes: 0,
			name: '',
			nattAchments: 0,
			overallFeedbackFiles: 0,
			overallFeedbackFileTypes: '',
			overallFeedbackMaxBytes: 0,
			overallFeedbackMode: 0,
			phase: 0,
			phaseSwitchAssessment: false,
			strategy: '',
			submissionend: 0,
			submissionFileTypes: '',
			submissionStart: 0,
			submissionTypeFile: false,
			submissionTypeText: false,
			useExamples: false,
			usePeerAssessment: 0,
			useSelfAssessment: 0
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

		await utils.workshops.getWorkshops.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Workshop ${action}d!`)
	}

	const { mutate: createWorkshop, isLoading: isCreating } =
		trpc.workshops.createWorkshop.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateWorkshop, isLoading: isUpdating } =
		trpc.workshops.updateWorkshop.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteWorkshop, isLoading: isDeleting } =
		trpc.workshops.deleteWorkshop.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewWorkshopParams) => {
		if (editing) {
			updateWorkshop({ ...values, id: workshop.id })
		} else {
			createWorkshop(values)
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
					name='assessmentStart'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Assessment Start</FormLabel>
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
					name='conclusion'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Conclusion</FormLabel>
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
					name='conclusionFormat'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Conclusion Format</FormLabel>
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
					name='evaluation'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Evaluation</FormLabel>
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
					name='examplesModen'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Examples Moden</FormLabel>
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
					name='gradeDecimals'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Grade Decimals</FormLabel>
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
					name='gradingGrade'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Grading Grade</FormLabel>
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
					name='instructAuthors'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Instruct Authors</FormLabel>
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
					name='instructAuthorsFormat'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Instruct Authors Format</FormLabel>
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
					name='instructReviewers'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Instruct Reviewers</FormLabel>
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
					name='instructReviewersFormat'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Instruct Reviewers Format</FormLabel>
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
					name='intro'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Intro</FormLabel>
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
					name='introFormat'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Intro Format</FormLabel>
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
					name='lateSubmissions'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Late Submissions</FormLabel>
							<br />
							<FormControl>
								<Checkbox
									{...field}
									checked={!!field.value}
									onCheckedChange={field.onChange}
									value={''}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='maxBytes'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Max Bytes</FormLabel>
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
					name='nattAchments'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Natt Achments</FormLabel>
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
					name='overallFeedbackFiles'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Overall Feedback Files</FormLabel>
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
					name='overallFeedbackFileTypes'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Overall Feedback File Types</FormLabel>
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
					name='overallFeedbackMaxBytes'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Overall Feedback Max Bytes</FormLabel>
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
					name='overallFeedbackMode'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Overall Feedback Mode</FormLabel>
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
					name='phase'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phase</FormLabel>
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
					name='phaseSwitchAssessment'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phase Switch Assessment</FormLabel>
							<br />
							<FormControl>
								<Checkbox
									{...field}
									checked={!!field.value}
									onCheckedChange={field.onChange}
									value={''}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='strategy'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Strategy</FormLabel>
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
					name='submissionend'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Submissionend</FormLabel>
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
					name='submissionFileTypes'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Submission File Types</FormLabel>
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
					name='submissionStart'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Submission Start</FormLabel>
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
					name='submissionTypeFile'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Submission Type File</FormLabel>
							<br />
							<FormControl>
								<Checkbox
									{...field}
									checked={!!field.value}
									onCheckedChange={field.onChange}
									value={''}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='submissionTypeText'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Submission Type Text</FormLabel>
							<br />
							<FormControl>
								<Checkbox
									{...field}
									checked={!!field.value}
									onCheckedChange={field.onChange}
									value={''}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='useExamples'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Use Examples</FormLabel>
							<br />
							<FormControl>
								<Checkbox
									{...field}
									checked={!!field.value}
									onCheckedChange={field.onChange}
									value={''}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='usePeerAssessment'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Use Peer Assessment</FormLabel>
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
					name='useSelfAssessment'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Use Self Assessment</FormLabel>
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
						onClick={() => deleteWorkshop({ id: workshop.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default WorkshopForm
