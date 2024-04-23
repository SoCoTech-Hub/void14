'use client'

import {
	AnalyticsUsedFile,
	NewAnalyticsUsedFileParams,
	insertAnalyticsUsedFileParams
} from '@/lib/db/schema/analyticsUsedFiles'
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

const AnalyticsUsedFileForm = ({
	analyticsUsedFile,
	closeModal
}: {
	analyticsUsedFile?: AnalyticsUsedFile
	closeModal?: () => void
}) => {
	const editing = !!analyticsUsedFile?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAnalyticsUsedFileParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAnalyticsUsedFileParams),
		defaultValues: analyticsUsedFile ?? {
			action: '',
			fileId: '',
			modelId: ''
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

		await utils.analyticsUsedFiles.getAnalyticsUsedFiles.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Analytics Used File ${action}d!`)
	}

	const { mutate: createAnalyticsUsedFile, isLoading: isCreating } =
		trpc.analyticsUsedFiles.createAnalyticsUsedFile.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateAnalyticsUsedFile, isLoading: isUpdating } =
		trpc.analyticsUsedFiles.updateAnalyticsUsedFile.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteAnalyticsUsedFile, isLoading: isDeleting } =
		trpc.analyticsUsedFiles.deleteAnalyticsUsedFile.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewAnalyticsUsedFileParams) => {
		if (editing) {
			updateAnalyticsUsedFile({ ...values, id: analyticsUsedFile.id })
		} else {
			createAnalyticsUsedFile(values)
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
					name='action'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Action</FormLabel>
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
					name='fileId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>File Id</FormLabel>
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
					name='modelId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Model Id</FormLabel>
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
							deleteAnalyticsUsedFile({ id: analyticsUsedFile.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default AnalyticsUsedFileForm
