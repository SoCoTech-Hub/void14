'use client'

import {
	AdminpresetsAppItA,
	NewAdminpresetsAppItAParams,
	insertAdminpresetsAppItAParams
} from '@/lib/db/schema/adminpresetsAppItAs'
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

const AdminpresetsAppItAForm = ({
	adminpresetsAppItA,
	closeModal
}: {
	adminpresetsAppItA?: AdminpresetsAppItA
	closeModal?: () => void
}) => {
	const { data: adminPresetsApps } =
		trpc.adminPresetsApps.getAdminPresetsApps.useQuery()
	const editing = !!adminpresetsAppItA?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAdminpresetsAppItAParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAdminpresetsAppItAParams),
		defaultValues: adminpresetsAppItA ?? {
			name: '',
			adminPresetsAppId: '',
			configLogId: ''
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

		await utils.adminpresetsAppItAs.getAdminpresetsAppItAs.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Adminpresets App It A ${action}d!`)
	}

	const { mutate: createAdminpresetsAppItA, isLoading: isCreating } =
		trpc.adminpresetsAppItAs.createAdminpresetsAppItA.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateAdminpresetsAppItA, isLoading: isUpdating } =
		trpc.adminpresetsAppItAs.updateAdminpresetsAppItA.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteAdminpresetsAppItA, isLoading: isDeleting } =
		trpc.adminpresetsAppItAs.deleteAdminpresetsAppItA.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewAdminpresetsAppItAParams) => {
		if (editing) {
			updateAdminpresetsAppItA({ ...values, id: adminpresetsAppItA.id })
		} else {
			createAdminpresetsAppItA(values)
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
							deleteAdminpresetsAppItA({ id: adminpresetsAppItA.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default AdminpresetsAppItAForm
