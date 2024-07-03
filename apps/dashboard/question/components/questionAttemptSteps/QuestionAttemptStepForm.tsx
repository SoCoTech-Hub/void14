'use client'

import {
	QuestionAttemptStep,
	NewQuestionAttemptStepParams,
	insertQuestionAttemptStepParams
} from '@/lib/db/schema/questionAttemptSteps'
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

const QuestionAttemptStepForm = ({
	questionAttemptStep,
	closeModal
}: {
	questionAttemptStep?: QuestionAttemptStep
	closeModal?: () => void
}) => {
	const { data: questionAttempts } =
		trpc.questionAttempts.getQuestionAttempts.useQuery()
	const editing = !!questionAttemptStep?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertQuestionAttemptStepParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertQuestionAttemptStepParams),
		defaultValues: questionAttemptStep ?? {
			fraction: 0.0,
			questionAttemptId: '',
			sequenceNumber: 0,
			state: ''
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

		await utils.questionAttemptSteps.getQuestionAttemptSteps.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Question Attempt Step ${action}d!`)
	}

	const { mutate: createQuestionAttemptStep, isLoading: isCreating } =
		trpc.questionAttemptSteps.createQuestionAttemptStep.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateQuestionAttemptStep, isLoading: isUpdating } =
		trpc.questionAttemptSteps.updateQuestionAttemptStep.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteQuestionAttemptStep, isLoading: isDeleting } =
		trpc.questionAttemptSteps.deleteQuestionAttemptStep.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewQuestionAttemptStepParams) => {
		if (editing) {
			updateQuestionAttemptStep({ ...values, id: questionAttemptStep.id })
		} else {
			createQuestionAttemptStep(values)
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
					name='fraction'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Fraction</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='questionAttemptId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Question Attempt Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a question attempt' />
									</SelectTrigger>
									<SelectContent>
										{questionAttempts?.questionAttempts.map(
											(questionAttempt) => (
												<SelectItem
													key={questionAttempt.questionAttempt.id}
													value={questionAttempt.questionAttempt.id.toString()}
												>
													{questionAttempt.questionAttempt.id}{' '}
													{/* TODO: Replace with a field from the questionAttempt model */}
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
					name='sequenceNumber'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sequence Number</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='state'
					render={({ field }) => (
						<FormItem>
							<FormLabel>State</FormLabel>
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
							deleteQuestionAttemptStep({ id: questionAttemptStep.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default QuestionAttemptStepForm
