'use client'

import {
	CourseModulesCompletion,
	NewCourseModulesCompletionParams,
	insertCourseModulesCompletionParams
} from '@soco/course-db/schema/courseModulesCompletions'
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

const CourseModulesCompletionForm = ({
	courseModulesCompletion,
	closeModal
}: {
	courseModulesCompletion?: CourseModulesCompletion
	closeModal?: () => void
}) => {
	const editing = !!courseModulesCompletion?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertCourseModulesCompletionParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertCourseModulesCompletionParams),
		defaultValues: courseModulesCompletion ?? {
			courseModuleId: '',
			completionState: '',
			viewed: false
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

		await utils.courseModulesCompletions.getCourseModulesCompletions.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Course Modules Completion ${action}d!`)
	}

	const { mutate: createCourseModulesCompletion, isLoading: isCreating } =
		trpc.courseModulesCompletions.createCourseModulesCompletion.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateCourseModulesCompletion, isLoading: isUpdating } =
		trpc.courseModulesCompletions.updateCourseModulesCompletion.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteCourseModulesCompletion, isLoading: isDeleting } =
		trpc.courseModulesCompletions.deleteCourseModulesCompletion.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewCourseModulesCompletionParams) => {
		if (editing) {
			updateCourseModulesCompletion({
				...values,
				id: courseModulesCompletion.id
			})
		} else {
			createCourseModulesCompletion(values)
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
					name='courseModuleId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Course Module Id</FormLabel>
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
					name='completionState'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Completion State</FormLabel>
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
					name='viewed'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Viewed</FormLabel>
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
						onClick={() =>
							deleteCourseModulesCompletion({ id: courseModulesCompletion.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default CourseModulesCompletionForm
