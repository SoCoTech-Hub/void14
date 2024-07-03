'use client'

import {
	Quize,
	NewQuizeParams,
	insertQuizeParams
} from '@/lib/db/schema/quizes'
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

const QuizeForm = ({
	quize,
	closeModal
}: {
	quize?: Quize
	closeModal?: () => void
}) => {
	const editing = !!quize?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertQuizeParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertQuizeParams),
		defaultValues: quize ?? {
			allowOfflineAttempts: false,
			attemptOnLast: false,
			attempts: 0,
			browserSecurity: '',
			canRedoQuestions: false,
			completionAttemptsExhausted: false,
			completionMinAttempts: 0,
			courseId: '',
			decimalPoints: 0,
			delay1: 0,
			delay2: 0,
			gracePeriod: 0,
			grade: 0.0,
			gradeMethod: 0,
			intro: '',
			introFormat: 0,
			name: '',
			navMethod: '',
			overDueHandling: '',
			password: '',
			preferredBehaviour: '',
			questionDecimalPoints: 0,
			questionsPerPage: 0,
			reviewAttempt: 0,
			reviewCorrectness: 0,
			showBlocks: false,
			reviewGeneralFeedback: 0,
			reviewMarks: 0,
			reviewOverallFeedback: 0,
			reviewRightAnswer: 0,
			reviewSpecificFeedback: 0,
			showUserPicture: false,
			shuffleAnswers: false,
			subNet: '',
			sumGrades: 0.0,
			timeClose: 0,
			timeLimit: 0,
			timeOpen: 0
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

		await utils.quizes.getQuizes.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Quize ${action}d!`)
	}

	const { mutate: createQuize, isLoading: isCreating } =
		trpc.quizes.createQuize.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onSuccess('create', { error: err.message })
		})

	const { mutate: updateQuize, isLoading: isUpdating } =
		trpc.quizes.updateQuize.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onSuccess('update', { error: err.message })
		})

	const { mutate: deleteQuize, isLoading: isDeleting } =
		trpc.quizes.deleteQuize.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onSuccess('delete', { error: err.message })
		})

	const handleSubmit = (values: NewQuizeParams) => {
		if (editing) {
			updateQuize({ ...values, id: quize.id })
		} else {
			createQuize(values)
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
					name='allowOfflineAttempts'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Allow Offline Attempts</FormLabel>
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
					name='attemptOnLast'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Attempt On Last</FormLabel>
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
					name='attempts'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Attempts</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='browserSecurity'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Browser Security</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='canRedoQuestions'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Can Redo Questions</FormLabel>
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
					name='completionAttemptsExhausted'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Completion Attempts Exhausted</FormLabel>
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
					name='completionMinAttempts'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Completion Min Attempts</FormLabel>
							<FormControl>
								<Input {...field} />
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
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='decimalPoints'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Decimal Points</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='delay1'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Delay 1</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='delay2'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Delay 2</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='gracePeriod'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Grace Period</FormLabel>
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
					name='gradeMethod'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Grade Method</FormLabel>
							<FormControl>
								<Input {...field} />
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
								<Input {...field} />
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
								<Input {...field} />
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
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='navMethod'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nav Method</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='overDueHandling'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Over Due Handling</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='preferredBehaviour'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Preferred Behaviour</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='questionDecimalPoints'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Question Decimal Points</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='questionsPerPage'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Questions Per Page</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='reviewAttempt'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Review Attempt</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='reviewCorrectness'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Review Correctness</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='showBlocks'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Show Blocks</FormLabel>
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
					name='reviewGeneralFeedback'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Review General Feedback</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='reviewMarks'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Review Marks</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='reviewOverallFeedback'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Review Overall Feedback</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='reviewRightAnswer'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Review Right Answer</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='reviewSpecificFeedback'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Review Specific Feedback</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='showUserPicture'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Show User Picture</FormLabel>
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
					name='shuffleAnswers'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Shuffle Answers</FormLabel>
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
					name='subNet'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sub Net</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='sumGrades'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sum Grades</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='timeClose'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Time Close</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='timeLimit'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Time Limit</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='timeOpen'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Time Open</FormLabel>
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
						onClick={() => deleteQuize({ id: quize.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default QuizeForm
