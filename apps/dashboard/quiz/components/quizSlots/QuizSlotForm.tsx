'use client'

import {
	QuizSlot,
	NewQuizSlotParams,
	insertQuizSlotParams
} from '@soco/quiz-db/schema/quizSlots'
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

const QuizSlotForm = ({
	quizSlot,
	closeModal
}: {
	quizSlot?: QuizSlot
	closeModal?: () => void
}) => {
	const { data: quizes } = trpc.quizes.getQuizes.useQuery()
	const editing = !!quizSlot?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertQuizSlotParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertQuizSlotParams),
		defaultValues: quizSlot ?? {
			maxMark: 0.0,
			page: 0,
			quizId: '',
			requirePrevious: false,
			slot: 0
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

		await utils.quizSlots.getQuizSlots.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Quiz Slot ${action}d!`)
	}

	const { mutate: createQuizSlot, isLoading: isCreating } =
		trpc.quizSlots.createQuizSlot.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateQuizSlot, isLoading: isUpdating } =
		trpc.quizSlots.updateQuizSlot.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteQuizSlot, isLoading: isDeleting } =
		trpc.quizSlots.deleteQuizSlot.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewQuizSlotParams) => {
		if (editing) {
			updateQuizSlot({ ...values, id: quizSlot.id })
		} else {
			createQuizSlot(values)
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
					name='maxMark'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Max Mark</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='page'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Page</FormLabel>
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
					name='requirePrevious'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Require Previous</FormLabel>
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
					name='slot'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Slot</FormLabel>
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
						onClick={() => deleteQuizSlot({ id: quizSlot.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default QuizSlotForm
