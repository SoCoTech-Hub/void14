'use client'

import {
	type BlogComment,
	type NewBlogCommentParams,
	insertBlogCommentParams
} from '@/lib/db/schema/blogComments'
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
import type { z } from 'zod'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const BlogCommentForm = ({
	blogComment,
	closeModal
}: {
	blogComment?: BlogComment
	closeModal?: () => void
}) => {
	const { data: blogs } = trpc.blogs.getBlogs.useQuery()
	const editing = !!blogComment?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertBlogCommentParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertBlogCommentParams),
		defaultValues: blogComment ?? {
			blogId: '',
			comment: '',
			parentId: 0
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

		await utils.blogComments.getBlogComments.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Blog Comment ${action}d!`)
	}

	const { mutate: createBlogComment, isLoading: isCreating } =
		trpc.blogComments.createBlogComment.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateBlogComment, isLoading: isUpdating } =
		trpc.blogComments.updateBlogComment.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteBlogComment, isLoading: isDeleting } =
		trpc.blogComments.deleteBlogComment.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewBlogCommentParams) => {
		if (editing) {
			updateBlogComment({ ...values, id: blogComment.id })
		} else {
			createBlogComment(values)
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
					name='blogId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Blog Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a blog' />
									</SelectTrigger>
									<SelectContent>
										{blogs?.blogs.map((blog) => (
											<SelectItem
												key={blog.id}
												value={blog.id.toString()}
											>
												{blog.name}{' '}
												{/* TODO: Replace with a field from the blog model */}
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
					name='comment'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Comment</FormLabel>
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
					name='parentId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Parent Id</FormLabel>
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
						onClick={() => deleteBlogComment({ id: blogComment.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default BlogCommentForm
