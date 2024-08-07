'use client'

import {
	RoleAllowView,
	NewRoleAllowViewParams,
	insertRoleAllowViewParams
} from '@soco/role-db/schema/roleAllowViews'
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

const RoleAllowViewForm = ({
	roleAllowView,
	closeModal
}: {
	roleAllowView?: RoleAllowView
	closeModal?: () => void
}) => {
	const { data: roles } = trpc.roles.getRoles.useQuery()
	const editing = !!roleAllowView?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertRoleAllowViewParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertRoleAllowViewParams),
		defaultValues: roleAllowView ?? {
			roleId: '',
			roleAllowViewId: ''
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

		await utils.roleAllowViews.getRoleAllowViews.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Role Allow View ${action}d!`)
	}

	const { mutate: createRoleAllowView, isLoading: isCreating } =
		trpc.roleAllowViews.createRoleAllowView.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateRoleAllowView, isLoading: isUpdating } =
		trpc.roleAllowViews.updateRoleAllowView.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteRoleAllowView, isLoading: isDeleting } =
		trpc.roleAllowViews.deleteRoleAllowView.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewRoleAllowViewParams) => {
		if (editing) {
			updateRoleAllowView({ ...values, id: roleAllowView.id })
		} else {
			createRoleAllowView(values)
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
					name='roleAllowViewId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Role Allow View</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a role allowed to view' />
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
						onClick={() => deleteRoleAllowView({ id: roleAllowView.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default RoleAllowViewForm
