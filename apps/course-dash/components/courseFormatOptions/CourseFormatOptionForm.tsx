'use client'

import {
	CourseFormatOption,
	NewCourseFormatOptionParams,
	insertCourseFormatOptionParams
} from '@/lib/db/schema/courseFormatOptions'
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

const CourseFormatOptionForm = ({
	courseFormatOption,
	closeModal
}: {
	courseFormatOption?: CourseFormatOption
	closeModal?: () => void
}) => {
	const { data: courses } = trpc.courses.getCourses.useQuery()
	const editing = !!courseFormatOption?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertCourseFormatOptionParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertCourseFormatOptionParams),
		defaultValues: courseFormatOption ?? {
			courseId: '',
			sectionId: '',
			value: '',
			format: '',
			name: ''
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

		await utils.courseFormatOptions.getCourseFormatOptions.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Course Format Option ${action}d!`)
	}

	const { mutate: createCourseFormatOption, isLoading: isCreating } =
		trpc.courseFormatOptions.createCourseFormatOption.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateCourseFormatOption, isLoading: isUpdating } =
		trpc.courseFormatOptions.updateCourseFormatOption.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteCourseFormatOption, isLoading: isDeleting } =
		trpc.courseFormatOptions.deleteCourseFormatOption.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewCourseFormatOptionParams) => {
		if (editing) {
			updateCourseFormatOption({ ...values, id: courseFormatOption.id })
		} else {
			createCourseFormatOption(values)
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
					name='courseId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Course Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a course' />
									</SelectTrigger>
									<SelectContent>
										{courses?.courses.map((course) => (
											<SelectItem
												key={course.course.id}
												value={course.course.id.toString()}
											>
												{course.course.id}{' '}
												{/* TODO: Replace with a field from the course model */}
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
					name='sectionId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Section Id</FormLabel>
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
					name='value'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Value</FormLabel>
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
					name='format'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Format</FormLabel>
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
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
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
						onClick={() =>
							deleteCourseFormatOption({ id: courseFormatOption.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default CourseFormatOptionForm
