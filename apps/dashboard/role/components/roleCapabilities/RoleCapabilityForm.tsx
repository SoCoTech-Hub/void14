'use client'

import {
	RoleCapability,
	NewRoleCapabilityParams,
	insertRoleCapabilityParams
} from '@soco/role-db/schema/roleCapabilities'
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

const RoleCapabilityForm = ({
	roleCapability,
	closeModal
}: {
	roleCapability?: RoleCapability
	closeModal?: () => void
}) => {
	const { data: roles } = trpc.roles.getRoles.useQuery()
	const editing = !!roleCapability?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertRoleCapabilityParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertRoleCapabilityParams),
		defaultValues: roleCapability ?? {
			capability: '',
			contextId: '',
			permission: '',
			roleId: ''
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

		await utils.roleCapabilities.getRoleCapabilities.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Role Capability ${action}d!`)
	}

	const { mutate: createRoleCapability, isLoading: isCreating } =
		trpc.roleCapabilities.createRoleCapability.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateRoleCapability, isLoading: isUpdating } =
		trpc.roleCapabilities.updateRoleCapability.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteRoleCapability, isLoading: isDeleting } =
		trpc.roleCapabilities.deleteRoleCapability.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewRoleCapabilityParams) => {
		if (editing) {
			updateRoleCapability({ ...values, id: roleCapability.id })
		} else {
			createRoleCapability(values)
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
					name='capability'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Capability</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='contextId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Context Id</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='permission'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Permission</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='roleId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Role Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a role' />
									</SelectTrigger>
									<SelectContent>
										{roles?.roles.map((role) => (
											<SelectItem
												key={role.id}
												value={role.id.toString()}
											>
												{role.id}{' '}
												{/* TODO: Replace with a field from the role model */}
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
						onClick={() => deleteRoleCapability({ id: roleCapability.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default RoleCapabilityForm
