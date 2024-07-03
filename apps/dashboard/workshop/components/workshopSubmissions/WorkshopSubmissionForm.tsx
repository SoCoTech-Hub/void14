'use client'

import {
	WorkshopSubmission,
	NewWorkshopSubmissionParams,
	insertWorkshopSubmissionParams
} from '@/lib/db/schema/workshopSubmissions'
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const WorkshopSubmissionForm = ({
	workshopSubmission,
	closeModal
}: {
	workshopSubmission?: WorkshopSubmission
	closeModal?: () => void
}) => {
	const { data: workshops } = trpc.workshops.getWorkshops.useQuery()
	const editing = !!workshopSubmission?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertWorkshopSubmissionParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertWorkshopSubmissionParams),
		defaultValues: workshopSubmission ?? {
			attachment: 0,
			content: '',
			contentFormat: 0,
			contentTrust: 0,
			example: 0,
			feedbackAuthor: '',
			feedbackAuthor0: '',
			feedbackAuthorFormat: 0,
			grade: 0.0,
			gradeOver: 0.0,
			gradeOverBy: '',
			late: 0,
			published: false,
			title: '',
			workshopId: ''
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

		await utils.workshopSubmissions.getWorkshopSubmissions.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Workshop Submission ${action}d!`)
	}

	const { mutate: createWorkshopSubmission, isLoading: isCreating } =
		trpc.workshopSubmissions.createWorkshopSubmission.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateWorkshopSubmission, isLoading: isUpdating } =
		trpc.workshopSubmissions.updateWorkshopSubmission.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteWorkshopSubmission, isLoading: isDeleting } =
		trpc.workshopSubmissions.deleteWorkshopSubmission.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewWorkshopSubmissionParams) => {
		if (editing) {
			updateWorkshopSubmission({ ...values, id: workshopSubmission.id })
		} else {
			createWorkshopSubmission(values)
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
					name='attachment'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Attachment</FormLabel>
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
					name='content'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Content</FormLabel>
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
					name='contentFormat'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Content Format</FormLabel>
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
					name='contentTrust'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Content Trust</FormLabel>
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
					name='example'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Example</FormLabel>
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
					name='feedbackAuthor'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Feedback Author</FormLabel>
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
					name='feedbackAuthor0'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Feedback Author0</FormLabel>
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
					name='feedbackAuthorFormat'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Feedback Author Format</FormLabel>
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
					name='gradeOver'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Grade Over</FormLabel>
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
					name='gradeOverBy'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Grade Over By</FormLabel>
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
					name='late'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Late</FormLabel>
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
					name='published'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Published</FormLabel>
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
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
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
					name='workshopId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Workshop Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a workshop' />
									</SelectTrigger>
									<SelectContent>
										{workshops?.workshops.map((workshop) => (
											<SelectItem
												key={workshop.id}
												value={workshop.id.toString()}
											>
												{workshop.id}{' '}
												{/* TODO: Replace with a field from the workshop model */}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
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
							deleteWorkshopSubmission({ id: workshopSubmission.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default WorkshopSubmissionForm
