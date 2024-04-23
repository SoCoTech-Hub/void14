'use client'

import {
	AssignFeedbackEditpdfCmnt,
	NewAssignFeedbackEditpdfCmntParams,
	insertAssignFeedbackEditpdfCmntParams
} from '@/lib/db/schema/assignFeedbackEditpdfCmnts'
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

const AssignFeedbackEditpdfCmntForm = ({
	assignFeedbackEditpdfCmnt,
	closeModal
}: {
	assignFeedbackEditpdfCmnt?: AssignFeedbackEditpdfCmnt
	closeModal?: () => void
}) => {
	const editing = !!assignFeedbackEditpdfCmnt?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAssignFeedbackEditpdfCmntParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAssignFeedbackEditpdfCmntParams),
		defaultValues: assignFeedbackEditpdfCmnt ?? {
			color: '',
			draft: false,
			gradeId: '',
			pageNo: 0,
			rawText: '',
			width: 0,
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

		await utils.assignFeedbackEditpdfCmnts.getAssignFeedbackEditpdfCmnts.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Assign Feedback Editpdf Cmnt ${action}d!`)
	}

	const { mutate: createAssignFeedbackEditpdfCmnt, isLoading: isCreating } =
		trpc.assignFeedbackEditpdfCmnts.createAssignFeedbackEditpdfCmnt.useMutation(
			{
				onSuccess: (res) => onSuccess('create'),
				onError: (err) => onError('create', { error: err.message })
			}
		)

	const { mutate: updateAssignFeedbackEditpdfCmnt, isLoading: isUpdating } =
		trpc.assignFeedbackEditpdfCmnts.updateAssignFeedbackEditpdfCmnt.useMutation(
			{
				onSuccess: (res) => onSuccess('update'),
				onError: (err) => onError('update', { error: err.message })
			}
		)

	const { mutate: deleteAssignFeedbackEditpdfCmnt, isLoading: isDeleting } =
		trpc.assignFeedbackEditpdfCmnts.deleteAssignFeedbackEditpdfCmnt.useMutation(
			{
				onSuccess: (res) => onSuccess('delete'),
				onError: (err) => onError('delete', { error: err.message })
			}
		)

	const handleSubmit = (values: NewAssignFeedbackEditpdfCmntParams) => {
		if (editing) {
			updateAssignFeedbackEditpdfCmnt({
				...values,
				id: assignFeedbackEditpdfCmnt.id
			})
		} else {
			createAssignFeedbackEditpdfCmnt(values)
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
					name='rawText'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Raw Text</FormLabel>
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
					name='width'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Width</FormLabel>
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
							deleteAssignFeedbackEditpdfCmnt({
								id: assignFeedbackEditpdfCmnt.id
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

export default AssignFeedbackEditpdfCmntForm
