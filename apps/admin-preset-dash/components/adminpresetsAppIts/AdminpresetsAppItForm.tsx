'use client'

import {
	AdminpresetsAppIt,
	NewAdminpresetsAppItParams,
	insertAdminpresetsAppItParams
} from '@/lib/db/schema/adminpresetsAppIts'
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

const AdminpresetsAppItForm = ({
	adminpresetsAppIt,
	closeModal
}: {
	adminpresetsAppIt?: AdminpresetsAppIt
	closeModal?: () => void
}) => {
	const { data: adminPresetsApps } =
		trpc.adminPresetsApps.getAdminPresetsApps.useQuery()
	const editing = !!adminpresetsAppIt?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAdminpresetsAppItParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAdminpresetsAppItParams),
		defaultValues: adminpresetsAppIt ?? {
			adminPresetsAppId: '',
			configLogId: ''
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

		await utils.adminpresetsAppIts.getAdminpresetsAppIts.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Adminpresets App It ${action}d!`)
	}

	const { mutate: createAdminpresetsAppIt, isLoading: isCreating } =
		trpc.adminpresetsAppIts.createAdminpresetsAppIt.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateAdminpresetsAppIt, isLoading: isUpdating } =
		trpc.adminpresetsAppIts.updateAdminpresetsAppIt.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteAdminpresetsAppIt, isLoading: isDeleting } =
		trpc.adminpresetsAppIts.deleteAdminpresetsAppIt.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewAdminpresetsAppItParams) => {
		if (editing) {
			updateAdminpresetsAppIt({ ...values, id: adminpresetsAppIt.id })
		} else {
			createAdminpresetsAppIt(values)
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
					name='adminPresetsAppId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Admin Presets App Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a admin presets app' />
									</SelectTrigger>
									<SelectContent>
										{adminPresetsApps?.adminPresetsApps.map(
											(adminPresetsApp) => (
												<SelectItem
													key={adminPresetsApp.adminPresetsApp.id}
													value={adminPresetsApp.adminPresetsApp.id.toString()}
												>
													{adminPresetsApp.adminPresetsApp.id}{' '}
													{/* TODO: Replace with a field from the adminPresetsApp model */}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='configLogId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Config Log Id</FormLabel>
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
							deleteAdminpresetsAppIt({ id: adminpresetsAppIt.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default AdminpresetsAppItForm
