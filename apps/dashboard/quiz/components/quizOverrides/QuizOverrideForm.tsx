'use client'

import {
	QuizOverride,
	NewQuizOverrideParams,
	insertQuizOverrideParams
} from '@soco/quiz-db/schema/quizOverrides'
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

const QuizOverrideForm = ({
	quizOverride,
	closeModal
}: {
	quizOverride?: QuizOverride
	closeModal?: () => void
}) => {
	const { data: quizes } = trpc.quizes.getQuizes.useQuery()
	const editing = !!quizOverride?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertQuizOverrideParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertQuizOverrideParams),
		defaultValues: quizOverride ?? {
			attempts: 0,
			groupId: '',
			password: '',
			quizId: '',
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

		await utils.quizOverrides.getQuizOverrides.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Quiz Override ${action}d!`)
	}

	const { mutate: createQuizOverride, isLoading: isCreating } =
		trpc.quizOverrides.createQuizOverride.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateQuizOverride, isLoading: isUpdating } =
		trpc.quizOverrides.updateQuizOverride.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteQuizOverride, isLoading: isDeleting } =
		trpc.quizOverrides.deleteQuizOverride.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewQuizOverrideParams) => {
		if (editing) {
			updateQuizOverride({ ...values, id: quizOverride.id })
		} else {
			createQuizOverride(values)
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
					name='groupId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Group Id</FormLabel>
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
						onClick={() => deleteQuizOverride({ id: quizOverride.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default QuizOverrideForm
