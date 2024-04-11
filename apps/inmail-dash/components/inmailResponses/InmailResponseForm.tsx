'use client'

import {
	InmailResponse,
	NewInmailResponseParams,
	insertInmailResponseParams
} from '@/lib/db/schema/inmailResponses'
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

const InmailResponseForm = ({
	inmailResponse,
	closeModal
}: {
	inmailResponse?: InmailResponse
	closeModal?: () => void
}) => {
	const { data: inmails } = trpc.inmails.getInmails.useQuery()
	const editing = !!inmailResponse?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertInmailResponseParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertInmailResponseParams),
		defaultValues: inmailResponse ?? {
			read: false,
			starred: false,
			important: false,
			deleted: false,
			label: '',
			inmailId: ''
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

		await utils.inmailResponses.getInmailResponses.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Inmail Response ${action}d!`)
	}

	const { mutate: createInmailResponse, isLoading: isCreating } =
		trpc.inmailResponses.createInmailResponse.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateInmailResponse, isLoading: isUpdating } =
		trpc.inmailResponses.updateInmailResponse.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteInmailResponse, isLoading: isDeleting } =
		trpc.inmailResponses.deleteInmailResponse.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewInmailResponseParams) => {
		if (editing) {
			updateInmailResponse({ ...values, id: inmailResponse.id })
		} else {
			createInmailResponse(values)
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
					name='read'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Read</FormLabel>
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
					name='starred'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Starred</FormLabel>
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
					name='important'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Important</FormLabel>
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
					name='deleted'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Deleted</FormLabel>
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
					name='label'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Label</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='inmailId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Inmail Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a inmail' />
									</SelectTrigger>
									<SelectContent>
										{inmails?.inmails.map((inmail) => (
											<SelectItem
												key={inmail.id}
												value={inmail.id.toString()}
											>
												{inmail.subject}{' '}
												{/* TODO: Replace with a field from the inmail model */}
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
						onClick={() => deleteInmailResponse({ id: inmailResponse.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default InmailResponseForm
