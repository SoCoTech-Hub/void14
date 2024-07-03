'use client'

import {
	RoleAllowOverride,
	NewRoleAllowOverrideParams,
	insertRoleAllowOverrideParams
} from '@/lib/db/schema/roleAllowOverrides'
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

const RoleAllowOverrideForm = ({
	roleAllowOverride,
	closeModal
}: {
	roleAllowOverride?: RoleAllowOverride
	closeModal?: () => void
}) => {
	const { data: roles } = trpc.roles.getRoles.useQuery()
	const editing = !!roleAllowOverride?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertRoleAllowOverrideParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertRoleAllowOverrideParams),
		defaultValues: roleAllowOverride ?? {
			roleId: '',
			allowOverrideId: ''
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

		await utils.roleAllowOverrides.getRoleAllowOverrides.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Role Allow Override ${action}d!`)
	}

	const { mutate: createRoleAllowOverride, isLoading: isCreating } =
		trpc.roleAllowOverrides.createRoleAllowOverride.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onSuccess('create', { error: err.message })
		})

	const { mutate: updateRoleAllowOverride, isLoading: isUpdating } =
		trpc.roleAllowOverrides.updateRoleAllowOverride.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onSuccess('update', { error: err.message })
		})

	const { mutate: deleteRoleAllowOverride, isLoading: isDeleting } =
		trpc.roleAllowOverrides.deleteRoleAllowOverride.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onSuccess('delete', { error: err.message })
		})

	const handleSubmit = (values: NewRoleAllowOverrideParams) => {
		if (editing) {
			updateRoleAllowOverride({ ...values, id: roleAllowOverride.id })
		} else {
			createRoleAllowOverride(values)
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
					name='allowOverrideId'
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
						onClick={() =>
							deleteRoleAllowOverride({ id: roleAllowOverride.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default RoleAllowOverrideForm
