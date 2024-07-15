'use client'

import {
	RoleAllowAssign,
	NewRoleAllowAssignParams,
	insertRoleAllowAssignParams
} from '@soco/role-db/schema/roleAllowAssigns'
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

const RoleAllowAssignForm = ({
	roleAllowAssign,
	closeModal
}: {
	roleAllowAssign?: RoleAllowAssign
	closeModal?: () => void
}) => {
	const { data: roles } = trpc.roles.getRoles.useQuery()
	const { data: roles } = trpc.roles.getRoles.useQuery()
	const editing = !!roleAllowAssign?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertRoleAllowAssignParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertRoleAllowAssignParams),
		defaultValues: roleAllowAssign ?? {
			roleId: '',
			allowRoleId: ''
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

		await utils.roleAllowAssigns.getRoleAllowAssigns.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Role Allow Assign ${action}d!`)
	}

	const { mutate: createRoleAllowAssign, isLoading: isCreating } =
		trpc.roleAllowAssigns.createRoleAllowAssign.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onSuccess('create', { error: err.message })
		})

	const { mutate: updateRoleAllowAssign, isLoading: isUpdating } =
		trpc.roleAllowAssigns.updateRoleAllowAssign.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onSuccess('update', { error: err.message })
		})

	const { mutate: deleteRoleAllowAssign, isLoading: isDeleting } =
		trpc.roleAllowAssigns.deleteRoleAllowAssign.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onSuccess('delete', { error: err.message })
		})

	const handleSubmit = (values: NewRoleAllowAssignParams) => {
		if (editing) {
			updateRoleAllowAssign({ ...values, id: roleAllowAssign.id })
		} else {
			createRoleAllowAssign(values)
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
					name='allowRoleId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Allow Role Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a role to allow' />
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
						onClick={() => deleteRoleAllowAssign({ id: roleAllowAssign.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default RoleAllowAssignForm
