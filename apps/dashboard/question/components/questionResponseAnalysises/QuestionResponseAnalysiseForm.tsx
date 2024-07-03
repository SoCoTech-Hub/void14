'use client'

import {
	QuestionResponseAnalysise,
	NewQuestionResponseAnalysiseParams,
	insertQuestionResponseAnalysiseParams
} from '@/lib/db/schema/questionResponseAnalysises'
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

const QuestionResponseAnalysiseForm = ({
	questionResponseAnalysise,
	closeModal
}: {
	questionResponseAnalysise?: QuestionResponseAnalysise
	closeModal?: () => void
}) => {
	const { data: questions } = trpc.questions.getQuestions.useQuery()
	const editing = !!questionResponseAnalysise?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertQuestionResponseAnalysiseParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertQuestionResponseAnalysiseParams),
		defaultValues: questionResponseAnalysise ?? {
			aId: '',
			credit: 0.0,
			hashCode: '',
			questionId: '',
			response: '',
			subqId: '',
			variant: '',
			whichTries: ''
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

		await utils.questionResponseAnalysises.getQuestionResponseAnalysises.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Question Response Analysise ${action}d!`)
	}

	const { mutate: createQuestionResponseAnalysise, isLoading: isCreating } =
		trpc.questionResponseAnalysises.createQuestionResponseAnalysise.useMutation(
			{
				onSuccess: (res) => onSuccess('create'),
				onError: (err) => onError('create', { error: err.message })
			}
		)

	const { mutate: updateQuestionResponseAnalysise, isLoading: isUpdating } =
		trpc.questionResponseAnalysises.updateQuestionResponseAnalysise.useMutation(
			{
				onSuccess: (res) => onSuccess('update'),
				onError: (err) => onError('update', { error: err.message })
			}
		)

	const { mutate: deleteQuestionResponseAnalysise, isLoading: isDeleting } =
		trpc.questionResponseAnalysises.deleteQuestionResponseAnalysise.useMutation(
			{
				onSuccess: (res) => onSuccess('delete'),
				onError: (err) => onError('delete', { error: err.message })
			}
		)

	const handleSubmit = (values: NewQuestionResponseAnalysiseParams) => {
		if (editing) {
			updateQuestionResponseAnalysise({
				...values,
				id: questionResponseAnalysise.id
			})
		} else {
			createQuestionResponseAnalysise(values)
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
					name='aId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>A Id</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='credit'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Credit</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='hashCode'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Hash Code</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='questionId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Question Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a question' />
									</SelectTrigger>
									<SelectContent>
										{questions?.questions.map((question) => (
											<SelectItem
												key={question.id}
												value={question.id.toString()}
											>
												{question.id}{' '}
												{/* TODO: Replace with a field from the question model */}
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
					name='response'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Response</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='subqId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Subq Id</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='variant'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Variant</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='whichTries'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Which Tries</FormLabel>
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
							deleteQuestionResponseAnalysise({
								id: questionResponseAnalysise.id
							})
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default QuestionResponseAnalysiseForm
