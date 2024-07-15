'use client'

import {
	QuizFeedback,
	NewQuizFeedbackParams,
	insertQuizFeedbackParams
} from '@soco/quiz-db/schema/quizFeedbacks'
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

const QuizFeedbackForm = ({
	quizFeedback,
	closeModal
}: {
	quizFeedback?: QuizFeedback
	closeModal?: () => void
}) => {
	const { data: quizes } = trpc.quizes.getQuizes.useQuery()
	const editing = !!quizFeedback?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertQuizFeedbackParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertQuizFeedbackParams),
		defaultValues: quizFeedback ?? {
			feedbackText: '',
			feedbackTextFormat: 0,
			maxGrade: 0.0,
			minGrade: 0.0,
			quizId: ''
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

		await utils.quizFeedbacks.getQuizFeedbacks.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Quiz Feedback ${action}d!`)
	}

	const { mutate: createQuizFeedback, isLoading: isCreating } =
		trpc.quizFeedbacks.createQuizFeedback.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateQuizFeedback, isLoading: isUpdating } =
		trpc.quizFeedbacks.updateQuizFeedback.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteQuizFeedback, isLoading: isDeleting } =
		trpc.quizFeedbacks.deleteQuizFeedback.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewQuizFeedbackParams) => {
		if (editing) {
			updateQuizFeedback({ ...values, id: quizFeedback.id })
		} else {
			createQuizFeedback(values)
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
					name='feedbackText'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Feedback Text</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='feedbackTextFormat'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Feedback Text Format</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='maxGrade'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Max Grade</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='minGrade'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Min Grade</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='quizId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Quize Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a quize' />
									</SelectTrigger>
									<SelectContent>
										{quizes?.quizes.map((quize) => (
											<SelectItem
												key={quize.id}
												value={quize.id.toString()}
											>
												{quize.id}{' '}
												{/* TODO: Replace with a field from the quize model */}
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
						onClick={() => deleteQuizFeedback({ id: quizFeedback.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default QuizFeedbackForm
