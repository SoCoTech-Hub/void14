'use client'

import {
	RoleAllowSwitch,
	NewRoleAllowSwitchParams,
	insertRoleAllowSwitchParams
} from '@soco/role-db/schema/roleAllowSwitches'
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

const RoleAllowSwitchForm = ({
	roleAllowSwitch,
	closeModal
}: {
	roleAllowSwitch?: RoleAllowSwitch
	closeModal?: () => void
}) => {
	const { data: roles } = trpc.roles.getRoles.useQuery()
	const editing = !!roleAllowSwitch?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertRoleAllowSwitchParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertRoleAllowSwitchParams),
		defaultValues: roleAllowSwitch ?? {
			roleId: '',
			allowSwitchId: ''
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

		await utils.roleAllowSwitches.getRoleAllowSwitches.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Role Allow Switch ${action}d!`)
	}

	const { mutate: createRoleAllowSwitch, isLoading: isCreating } =
		trpc.roleAllowSwitches.createRoleAllowSwitch.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateRoleAllowSwitch, isLoading: isUpdating } =
		trpc.roleAllowSwitches.updateRoleAllowSwitch.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteRoleAllowSwitch, isLoading: isDeleting } =
		trpc.roleAllowSwitches.deleteRoleAllowSwitch.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewRoleAllowSwitchParams) => {
		if (editing) {
			updateRoleAllowSwitch({ ...values, id: roleAllowSwitch.id })
		} else {
			createRoleAllowSwitch(values)
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
				<FormField
					control={form.control}
					name='allowSwitchId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Allow Switch Role Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a role to switch' />
									</SelectTrigger>
									<SelectContent>
										{roles?.roles.map((role) => (
											<SelectItem
												key={role.id}
												value={role.id.toString()}
											>
												{role.name}
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
						onClick={() => deleteRoleAllowSwitch({ id: roleAllowSwitch.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default RoleAllowSwitchForm
