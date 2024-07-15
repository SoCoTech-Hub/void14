'use client'

import {
	QuizAttempt,
	NewQuizAttemptParams,
	insertQuizAttemptParams
} from '@soco/quiz-db/schema/quizAttempts'
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const QuizAttemptForm = ({
	quizAttempt,
	closeModal
}: {
	quizAttempt?: QuizAttempt
	closeModal?: () => void
}) => {
	const { data: quizes } = trpc.quizes.getQuizes.useQuery()
	const editing = !!quizAttempt?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertQuizAttemptParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertQuizAttemptParams),
		defaultValues: quizAttempt ?? {
			attempt: 0,
			currentPage: 0,
			gradedNotificationSentTime: 0,
			layout: '',
			preview: false,
			quizId: '',
			state: '',
			sumGrades: 0.0,
			timeCheckState: 0,
			timeFinish: 0,
			timeModifiedOffline: 0,
			timeStart: 0,
			uniqueId: ''
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

		await utils.quizAttempts.getQuizAttempts.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Quiz Attempt ${action}d!`)
	}

	const { mutate: createQuizAttempt, isLoading: isCreating } =
		trpc.quizAttempts.createQuizAttempt.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateQuizAttempt, isLoading: isUpdating } =
		trpc.quizAttempts.updateQuizAttempt.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteQuizAttempt, isLoading: isDeleting } =
		trpc.quizAttempts.deleteQuizAttempt.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewQuizAttemptParams) => {
		if (editing) {
			updateQuizAttempt({ ...values, id: quizAttempt.id })
		} else {
			createQuizAttempt(values)
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
					name='attempt'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Attempt</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='currentPage'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Current Page</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='gradedNotificationSentTime'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Graded Notification Sent Time</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='layout'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Layout</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='preview'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Preview</FormLabel>
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
					name='timeCheckState'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Time Check State</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='timeFinish'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Time Finish</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='timeModifiedOffline'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Time Modified Offline</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='timeStart'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Time Start</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='uniqueId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Unique Id</FormLabel>
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
						onClick={() => deleteQuizAttempt({ id: quizAttempt.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default QuizAttemptForm
