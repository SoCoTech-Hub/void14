'use client'

import {
	WorkshopGrade,
	NewWorkshopGradeParams,
	insertWorkshopGradeParams
} from '@/lib/db/schema/workshopGrades'
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

const WorkshopGradeForm = ({
	workshopGrade,
	closeModal
}: {
	workshopGrade?: WorkshopGrade
	closeModal?: () => void
}) => {
	const editing = !!workshopGrade?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertWorkshopGradeParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertWorkshopGradeParams),
		defaultValues: workshopGrade ?? {
			assessmentId: '',
			dimensionId: '',
			grade: 0.0,
			peerComment: '',
			peerCommentFormat: 0,
			strategy: ''
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

		await utils.workshopGrades.getWorkshopGrades.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Workshop Grade ${action}d!`)
	}

	const { mutate: createWorkshopGrade, isLoading: isCreating } =
		trpc.workshopGrades.createWorkshopGrade.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateWorkshopGrade, isLoading: isUpdating } =
		trpc.workshopGrades.updateWorkshopGrade.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteWorkshopGrade, isLoading: isDeleting } =
		trpc.workshopGrades.deleteWorkshopGrade.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewWorkshopGradeParams) => {
		if (editing) {
			updateWorkshopGrade({ ...values, id: workshopGrade.id })
		} else {
			createWorkshopGrade(values)
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
					name='assessmentId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Assessment Id</FormLabel>
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
					name='dimensionId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Dimension Id</FormLabel>
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
					name='grade'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Grade</FormLabel>
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
					name='peerComment'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Peer Comment</FormLabel>
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
					name='peerCommentFormat'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Peer Comment Format</FormLabel>
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
					name='strategy'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Strategy</FormLabel>
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
						onClick={() => deleteWorkshopGrade({ id: workshopGrade.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default WorkshopGradeForm
