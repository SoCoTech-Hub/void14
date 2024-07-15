'use client'

import {
	AssignFeedbackEditpdfRot,
	NewAssignFeedbackEditpdfRotParams,
	insertAssignFeedbackEditpdfRotParams
} from '@soco/assignment-db/schema/assignFeedbackEditpdfRots'
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

const AssignFeedbackEditpdfRotForm = ({
	assignFeedbackEditpdfRot,
	closeModal
}: {
	assignFeedbackEditpdfRot?: AssignFeedbackEditpdfRot
	closeModal?: () => void
}) => {
	const editing = !!assignFeedbackEditpdfRot?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAssignFeedbackEditpdfRotParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAssignFeedbackEditpdfRotParams),
		defaultValues: assignFeedbackEditpdfRot ?? {
			degree: 0,
			gradeId: '',
			isRotated: false,
			pageNo: 0,
			pathNameHash: ''
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

		await utils.assignFeedbackEditpdfRots.getAssignFeedbackEditpdfRots.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Assign Feedback Editpdf Rot ${action}d!`)
	}

	const { mutate: createAssignFeedbackEditpdfRot, isLoading: isCreating } =
		trpc.assignFeedbackEditpdfRots.createAssignFeedbackEditpdfRot.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateAssignFeedbackEditpdfRot, isLoading: isUpdating } =
		trpc.assignFeedbackEditpdfRots.updateAssignFeedbackEditpdfRot.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteAssignFeedbackEditpdfRot, isLoading: isDeleting } =
		trpc.assignFeedbackEditpdfRots.deleteAssignFeedbackEditpdfRot.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewAssignFeedbackEditpdfRotParams) => {
		if (editing) {
			updateAssignFeedbackEditpdfRot({
				...values,
				id: assignFeedbackEditpdfRot.id
			})
		} else {
			createAssignFeedbackEditpdfRot(values)
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
					name='degree'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Degree</FormLabel>
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
					name='isRotated'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Is Rotated</FormLabel>
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
					name='pathNameHash'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Path Name Hash</FormLabel>
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
							deleteAssignFeedbackEditpdfRot({
								id: assignFeedbackEditpdfRot.id
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

export default AssignFeedbackEditpdfRotForm
