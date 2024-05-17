'use client'

import {
	BlogAssociation,
	NewBlogAssociationParams,
	insertBlogAssociationParams
} from '@/lib/db/schema/blogAssociations'
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

const BlogAssociationForm = ({
	blogAssociation,
	closeModal
}: {
	blogAssociation?: BlogAssociation
	closeModal?: () => void
}) => {
	const { data: blogExternals } = trpc.blogExternals.getBlogExternals.useQuery()
	const editing = !!blogAssociation?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertBlogAssociationParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertBlogAssociationParams),
		defaultValues: blogAssociation ?? {
			blogExternalId: '',
			contextId: ''
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

		await utils.blogAssociations.getBlogAssociations.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Blog Association ${action}d!`)
	}

	const { mutate: createBlogAssociation, isLoading: isCreating } =
		trpc.blogAssociations.createBlogAssociation.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateBlogAssociation, isLoading: isUpdating } =
		trpc.blogAssociations.updateBlogAssociation.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteBlogAssociation, isLoading: isDeleting } =
		trpc.blogAssociations.deleteBlogAssociation.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewBlogAssociationParams) => {
		if (editing) {
			updateBlogAssociation({ ...values, id: blogAssociation.id })
		} else {
			createBlogAssociation(values)
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
					name='blogExternalId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Blog External Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a blog external' />
									</SelectTrigger>
									<SelectContent>
										{blogExternals?.blogExternals.map((blogExternal) => (
											<SelectItem
												key={blogExternal.id}
												value={blogExternal.id.toString()}
											>
												{blogExternal.id}{' '}
												{/* TODO: Replace with a field from the blogExternal model */}
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
					name='contextId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Context Id</FormLabel>
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
						onClick={() => deleteBlogAssociation({ id: blogAssociation.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default BlogAssociationForm
