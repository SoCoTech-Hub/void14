'use client'

import {
	AdminPresetItA,
	NewAdminPresetItAParams,
	insertAdminPresetItAParams
} from '@/lib/db/schema/adminPresetItAs'
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

const AdminPresetItAForm = ({
	adminPresetItA,
	closeModal
}: {
	adminPresetItA?: AdminPresetItA
	closeModal?: () => void
}) => {
	const editing = !!adminPresetItA?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAdminPresetItAParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAdminPresetItAParams),
		defaultValues: adminPresetItA ?? {
			itemId: '',
			name: '',
			value: ''
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

		await utils.adminPresetItAs.getAdminPresetItAs.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Admin Preset It A ${action}d!`)
	}

	const { mutate: createAdminPresetItA, isLoading: isCreating } =
		trpc.adminPresetItAs.createAdminPresetItA.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateAdminPresetItA, isLoading: isUpdating } =
		trpc.adminPresetItAs.updateAdminPresetItA.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteAdminPresetItA, isLoading: isDeleting } =
		trpc.adminPresetItAs.deleteAdminPresetItA.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewAdminPresetItAParams) => {
		if (editing) {
			updateAdminPresetItA({ ...values, id: adminPresetItA.id })
		} else {
			createAdminPresetItA(values)
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
					name='itemId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Item Id</FormLabel>
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
					name='value'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Value</FormLabel>
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
						onClick={() => deleteAdminPresetItA({ id: adminPresetItA.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default AdminPresetItAForm
