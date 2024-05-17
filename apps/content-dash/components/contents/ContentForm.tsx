'use client'

import {
	Content,
	NewContentParams,
	insertContentParams
} from '@/lib/db/schema/contents'
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

const ContentForm = ({
	content,
	closeModal
}: {
	content?: Content
	closeModal?: () => void
}) => {
	const editing = !!content?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertContentParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertContentParams),
		defaultValues: content ?? {
			visibility: false,
			configData: '',
			contentType: '',
			contextId: '',
			instanceId: '',
			name: ''
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

		await utils.contents.getContents.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Content ${action}d!`)
	}

	const { mutate: createContent, isLoading: isCreating } =
		trpc.contents.createContent.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateContent, isLoading: isUpdating } =
		trpc.contents.updateContent.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteContent, isLoading: isDeleting } =
		trpc.contents.deleteContent.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewContentParams) => {
		if (editing) {
			updateContent({ ...values, id: content.id })
		} else {
			createContent(values)
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
					name='visibility'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Visibility</FormLabel>
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
					name='configData'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Config Data</FormLabel>
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
					name='contentType'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Content Type</FormLabel>
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
				<FormField
					control={form.control}
					name='instanceId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Instance Id</FormLabel>
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
						onClick={() => deleteContent({ id: content.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default ContentForm
