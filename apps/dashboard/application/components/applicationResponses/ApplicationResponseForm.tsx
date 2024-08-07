'use client'

import {
	ApplicationResponse,
	NewApplicationResponseParams,
	insertApplicationResponseParams
} from '@soco/application-db/schema/applicationResponses'
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

const ApplicationResponseForm = ({
	applicationResponse,
	closeModal
}: {
	applicationResponse?: ApplicationResponse
	closeModal?: () => void
}) => {
	const { data: jobApplications } =
		trpc.jobApplications.getJobApplications.useQuery()
	const editing = !!applicationResponse?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertApplicationResponseParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertApplicationResponseParams),
		defaultValues: applicationResponse ?? {
			jobApplicationId: ''
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

		await utils.applicationResponses.getApplicationResponses.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Application Response ${action}d!`)
	}

	const { mutate: createApplicationResponse, isLoading: isCreating } =
		trpc.applicationResponses.createApplicationResponse.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateApplicationResponse, isLoading: isUpdating } =
		trpc.applicationResponses.updateApplicationResponse.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteApplicationResponse, isLoading: isDeleting } =
		trpc.applicationResponses.deleteApplicationResponse.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewApplicationResponseParams) => {
		if (editing) {
			updateApplicationResponse({ ...values, id: applicationResponse.id })
		} else {
			createApplicationResponse(values)
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
					name='jobApplicationId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Job Application Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a job application' />
									</SelectTrigger>
									<SelectContent>
										{jobApplications?.jobApplications.map((jobApplication) => (
											<SelectItem
												key={jobApplication.id}
												value={jobApplication.id.toString()}
											>
												{jobApplication.name}{' '}
												{/* TODO: Replace with a field from the jobApplication model */}
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
							deleteApplicationResponse({ id: applicationResponse.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default ApplicationResponseForm
