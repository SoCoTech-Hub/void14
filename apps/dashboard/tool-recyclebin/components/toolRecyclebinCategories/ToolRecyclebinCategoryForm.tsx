'use client'

import {
	ToolRecyclebinCategory,
	NewToolRecyclebinCategoryParams,
	insertToolRecyclebinCategoryParams
} from '@soco/tool-recyclebin-db/schema/toolRecyclebinCategories'
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
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const ToolRecyclebinCategoryForm = ({
	toolRecyclebinCategory,
	closeModal
}: {
	toolRecyclebinCategory?: ToolRecyclebinCategory
	closeModal?: () => void
}) => {
	const editing = !!toolRecyclebinCategory?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertToolRecyclebinCategoryParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertToolRecyclebinCategoryParams),
		defaultValues: toolRecyclebinCategory ?? {
			categoryId: '',
			fullName: '',
			shortName: ''
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

		await utils.toolRecyclebinCategories.getToolRecyclebinCategories.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Tool Recyclebin Category ${action}d!`)
	}

	const { mutate: createToolRecyclebinCategory, isLoading: isCreating } =
		trpc.toolRecyclebinCategories.createToolRecyclebinCategory.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateToolRecyclebinCategory, isLoading: isUpdating } =
		trpc.toolRecyclebinCategories.updateToolRecyclebinCategory.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteToolRecyclebinCategory, isLoading: isDeleting } =
		trpc.toolRecyclebinCategories.deleteToolRecyclebinCategory.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewToolRecyclebinCategoryParams) => {
		if (editing) {
			updateToolRecyclebinCategory({ ...values, id: toolRecyclebinCategory.id })
		} else {
			createToolRecyclebinCategory(values)
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
					name='categoryId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category Id</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='fullName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='shortName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Short Name</FormLabel>
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
							deleteToolRecyclebinCategory({ id: toolRecyclebinCategory.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default ToolRecyclebinCategoryForm
