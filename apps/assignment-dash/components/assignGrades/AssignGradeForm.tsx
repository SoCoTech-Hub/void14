'use client'

import {
	AssignGrade,
	NewAssignGradeParams,
	insertAssignGradeParams
} from '@/lib/db/schema/assignGrades'
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

const AssignGradeForm = ({
	assignGrade,
	closeModal
}: {
	assignGrade?: AssignGrade
	closeModal?: () => void
}) => {
	const { data: assignments } = trpc.assignments.getAssignments.useQuery()
	const editing = !!assignGrade?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAssignGradeParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAssignGradeParams),
		defaultValues: assignGrade ?? {
			assignmentId: '',
			attemptNumber: 0,
			grade: 0.0,
			graderId: ''
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

		await utils.assignGrades.getAssignGrades.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Assign Grade ${action}d!`)
	}

	const { mutate: createAssignGrade, isLoading: isCreating } =
		trpc.assignGrades.createAssignGrade.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateAssignGrade, isLoading: isUpdating } =
		trpc.assignGrades.updateAssignGrade.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteAssignGrade, isLoading: isDeleting } =
		trpc.assignGrades.deleteAssignGrade.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewAssignGradeParams) => {
		if (editing) {
			updateAssignGrade({ ...values, id: assignGrade.id })
		} else {
			createAssignGrade(values)
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
					name='assignmentId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Assignment Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a assignment' />
									</SelectTrigger>
									<SelectContent>
										{assignments?.assignments.map((assignment) => (
											<SelectItem
												key={assignment.id}
												value={assignment.id.toString()}
											>
												{assignment.id}{' '}
												{/* TODO: Replace with a field from the assignment model */}
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
					name='attemptNumber'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Attempt Number</FormLabel>
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
					name='graderId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Grader Id</FormLabel>
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
						onClick={() => deleteAssignGrade({ id: assignGrade.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default AssignGradeForm
