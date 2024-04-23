'use client'

import {
	AssignFeedbackEditpdfAnnot,
	NewAssignFeedbackEditpdfAnnotParams,
	insertAssignFeedbackEditpdfAnnotParams
} from '@/lib/db/schema/assignFeedbackEditpdfAnnots'
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

const AssignFeedbackEditpdfAnnotForm = ({
	assignFeedbackEditpdfAnnot,
	closeModal
}: {
	assignFeedbackEditpdfAnnot?: AssignFeedbackEditpdfAnnot
	closeModal?: () => void
}) => {
	const editing = !!assignFeedbackEditpdfAnnot?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAssignFeedbackEditpdfAnnotParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAssignFeedbackEditpdfAnnotParams),
		defaultValues: assignFeedbackEditpdfAnnot ?? {
			color: '',
			draft: false,
			endX: 0,
			endY: 0,
			gradeId: '',
			pageNo: 0,
			path: '',
			type: '',
			x: 0,
			y: 0
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

		await utils.assignFeedbackEditpdfAnnots.getAssignFeedbackEditpdfAnnots.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Assign Feedback Editpdf Annot ${action}d!`)
	}

	const { mutate: createAssignFeedbackEditpdfAnnot, isLoading: isCreating } =
		trpc.assignFeedbackEditpdfAnnots.createAssignFeedbackEditpdfAnnot.useMutation(
			{
				onSuccess: (res) => onSuccess('create'),
				onError: (err) => onError('create', { error: err.message })
			}
		)

	const { mutate: updateAssignFeedbackEditpdfAnnot, isLoading: isUpdating } =
		trpc.assignFeedbackEditpdfAnnots.updateAssignFeedbackEditpdfAnnot.useMutation(
			{
				onSuccess: (res) => onSuccess('update'),
				onError: (err) => onError('update', { error: err.message })
			}
		)

	const { mutate: deleteAssignFeedbackEditpdfAnnot, isLoading: isDeleting } =
		trpc.assignFeedbackEditpdfAnnots.deleteAssignFeedbackEditpdfAnnot.useMutation(
			{
				onSuccess: (res) => onSuccess('delete'),
				onError: (err) => onError('delete', { error: err.message })
			}
		)

	const handleSubmit = (values: NewAssignFeedbackEditpdfAnnotParams) => {
		if (editing) {
			updateAssignFeedbackEditpdfAnnot({
				...values,
				id: assignFeedbackEditpdfAnnot.id
			})
		} else {
			createAssignFeedbackEditpdfAnnot(values)
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
					name='color'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Color</FormLabel>
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
					name='draft'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Draft</FormLabel>
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
					name='endX'
					render={({ field }) => (
						<FormItem>
							<FormLabel>End X</FormLabel>
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
					name='endY'
					render={({ field }) => (
						<FormItem>
							<FormLabel>End Y</FormLabel>
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
					name='gradeId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Grade Id</FormLabel>
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
					name='pageNo'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Page No</FormLabel>
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
					name='type'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Type</FormLabel>
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
					name='x'
					render={({ field }) => (
						<FormItem>
							<FormLabel>X</FormLabel>
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
					name='y'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Y</FormLabel>
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
							deleteAssignFeedbackEditpdfAnnot({
								id: assignFeedbackEditpdfAnnot.id
							})
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default AssignFeedbackEditpdfAnnotForm
