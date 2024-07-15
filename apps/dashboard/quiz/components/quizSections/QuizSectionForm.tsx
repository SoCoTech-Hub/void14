'use client'

import {
	QuizSection,
	NewQuizSectionParams,
	insertQuizSectionParams
} from '@soco/quiz-db/schema/quizSections'
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

const QuizSectionForm = ({
	quizSection,
	closeModal
}: {
	quizSection?: QuizSection
	closeModal?: () => void
}) => {
	const { data: quizes } = trpc.quizes.getQuizes.useQuery()
	const editing = !!quizSection?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertQuizSectionParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertQuizSectionParams),
		defaultValues: quizSection ?? {
			firstSlot: 0,
			heading: '',
			quizId: '',
			shuffleQuestions: false
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

		await utils.quizSections.getQuizSections.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Quiz Section ${action}d!`)
	}

	const { mutate: createQuizSection, isLoading: isCreating } =
		trpc.quizSections.createQuizSection.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateQuizSection, isLoading: isUpdating } =
		trpc.quizSections.updateQuizSection.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteQuizSection, isLoading: isDeleting } =
		trpc.quizSections.deleteQuizSection.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewQuizSectionParams) => {
		if (editing) {
			updateQuizSection({ ...values, id: quizSection.id })
		} else {
			createQuizSection(values)
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
					name='firstSlot'
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Slot</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='heading'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Heading</FormLabel>
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
					name='shuffleQuestions'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Shuffle Questions</FormLabel>
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
						onClick={() => deleteQuizSection({ id: quizSection.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default QuizSectionForm
