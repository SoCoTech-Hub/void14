'use client'

import {
	AdminPresetPlug,
	NewAdminPresetPlugParams,
	insertAdminPresetPlugParams
} from '@/lib/db/schema/adminPresetPlugs'
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

const AdminPresetPlugForm = ({
	adminPresetPlug,
	closeModal
}: {
	adminPresetPlug?: AdminPresetPlug
	closeModal?: () => void
}) => {
	const { data: adminPresets } = trpc.adminPresets.getAdminPresets.useQuery()
	const editing = !!adminPresetPlug?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAdminPresetPlugParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAdminPresetPlugParams),
		defaultValues: adminPresetPlug ?? {
			adminPresetId: '',
			name: '',
			plugin: '',
			isEnabled: false
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

		await utils.adminPresetPlugs.getAdminPresetPlugs.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Admin Preset Plug ${action}d!`)
	}

	const { mutate: createAdminPresetPlug, isLoading: isCreating } =
		trpc.adminPresetPlugs.createAdminPresetPlug.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateAdminPresetPlug, isLoading: isUpdating } =
		trpc.adminPresetPlugs.updateAdminPresetPlug.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteAdminPresetPlug, isLoading: isDeleting } =
		trpc.adminPresetPlugs.deleteAdminPresetPlug.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewAdminPresetPlugParams) => {
		if (editing) {
			updateAdminPresetPlug({ ...values, id: adminPresetPlug.id })
		} else {
			createAdminPresetPlug(values)
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
					name='adminPresetId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Admin Preset Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a admin preset' />
									</SelectTrigger>
									<SelectContent>
										{adminPresets?.adminPresets.map((adminPreset) => (
											<SelectItem
												key={adminPreset.id}
												value={adminPreset.id.toString()}
											>
												{adminPreset.id}{' '}
												{/* TODO: Replace with a field from the adminPreset model */}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
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
					name='plugin'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Plugin</FormLabel>
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
					name='isEnabled'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Is Enabled</FormLabel>
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
						onClick={() => deleteAdminPresetPlug({ id: adminPresetPlug.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default AdminPresetPlugForm
