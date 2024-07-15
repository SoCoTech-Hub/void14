'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import {
	CourseCategory,
	insertCourseCategoryParams,
	NewCourseCategoryParams
} from '@soco/course-db/schema/courseCategories'

type GenericFormProps<T> = {
	defaultValues: T
	schema: z.ZodType<T>
	onSubmit: (values: T) => void
	closeModal?: () => void
	children: React.ReactNode
	isSubmitting: boolean
	editing?: boolean
	onDelete?: () => void
}

function GenericForm<T>({
	defaultValues,
	schema,
	onSubmit,
	closeModal,
	children,
	isSubmitting,
	editing = false,
	onDelete
}: GenericFormProps<T>) {
	const form = useForm<T>({
		resolver: zodResolver(schema),
		defaultValues
	})

	return (
		<Form>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'
			>
				{children}
				<div className='flex space-x-4'>
					<Button
						type='submit'
						className='mr-1'
						disabled={isSubmitting}
					>
						{editing
							? `Sav${isSubmitting ? 'ing...' : 'e'}`
							: `Creat${isSubmitting ? 'ing...' : 'e'}`}
					</Button>
					{editing && onDelete && (
						<Button
							type='button'
							variant='destructive'
							onClick={onDelete}
						>
							Delet{isSubmitting ? 'ing...' : 'e'}
						</Button>
					)}
				</div>
			</form>
		</Form>
	)
}

const CourseCategoryForm = ({
	courseCategory,
	closeModal
}: {
	courseCategory?: CourseCategory
	closeModal?: () => void
}) => {
	const editing = !!courseCategory?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const defaultValues: NewCourseCategoryParams = {
		courseCount: courseCategory?.courseCount || 0,
		depth: courseCategory?.depth || 0,
		description: courseCategory?.description || '',
		descriptionFormat: courseCategory?.descriptionFormat || 0,
		idNumber: courseCategory?.idNumber || '',
		name: courseCategory?.name || '',
		parent: courseCategory?.parent || 0,
		path: courseCategory?.path || '',
		sortOrder: courseCategory?.sortOrder || 0,
		theme: courseCategory?.theme || '',
		visible: courseCategory?.visible || false,
		visibleOld: courseCategory?.visibleOld || false
	}

	const onSuccess = async (
		action: 'create' | 'update' | 'delete',
		data?: { error?: string }
	) => {
		if (data?.error) {
			toast.error(data.error)
			return
		}

		await utils.courseCategories.getCourseCategories.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Course Category ${action}d!`)
	}

	const { mutate: createCourseCategory, isLoading: isCreating } =
		trpc.courseCategories.createCourseCategory.useMutation({
			onSuccess: () => onSuccess('create'),
			onError: (err: { message: any }) =>
				onSuccess('create', { error: err.message })
		})

	const { mutate: updateCourseCategory, isLoading: isUpdating } =
		trpc.courseCategories.updateCourseCategory.useMutation({
			onSuccess: () => onSuccess('update'),
			onError: (err: { message: any }) =>
				onSuccess('update', { error: err.message })
		})

	const { mutate: deleteCourseCategory, isLoading: isDeleting } =
		trpc.courseCategories.deleteCourseCategory.useMutation({
			onSuccess: () => onSuccess('delete'),
			onError: (err: { message: any }) =>
				onSuccess('delete', { error: err.message })
		})

	const handleSubmit = (values: NewCourseCategoryParams) => {
		if (editing) {
			updateCourseCategory({ ...values, id: courseCategory.id })
		} else {
			createCourseCategory(values)
		}
	}

	return (
		<GenericForm<NewCourseCategoryParams>
			defaultValues={defaultValues}
			schema={insertCourseCategoryParams}
			onSubmit={handleSubmit}
			closeModal={closeModal}
			isSubmitting={isCreating || isUpdating}
			editing={editing}
			onDelete={() =>
				editing ? deleteCourseCategory({ id: courseCategory.id }) : {}
			}
		>
			<FormField
				control={form.control}
				name='courseCount'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Course Count</FormLabel>
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
				name='depth'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Depth</FormLabel>
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
				name='description'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Description</FormLabel>
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
				name='descriptionFormat'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Description Format</FormLabel>
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
				name='idNumber'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Id Number</FormLabel>
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
			<FormField
				control={form.control}
				name='parent'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Parent</FormLabel>
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
				name='path'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Path</FormLabel>
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
				name='sortOrder'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Sort Order</FormLabel>
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
				name='theme'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Theme</FormLabel>
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
				name='visible'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Visible</FormLabel>
						<FormControl>
							<Checkbox
								{...field}
								checked={!!field.value}
								onCheckedChange={field.onChange}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name='visibleOld'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Visible Old</FormLabel>
						<FormControl>
							<Checkbox
								{...field}
								checked={!!field.value}
								onCheckedChange={field.onChange}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</GenericForm>
	)
}

export default CourseCategoryForm
