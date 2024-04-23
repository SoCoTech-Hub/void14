'use client'

import {
	AssignmentUpgrade,
	NewAssignmentUpgradeParams,
	insertAssignmentUpgradeParams
} from '@/lib/db/schema/assignmentUpgrades'
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

const AssignmentUpgradeForm = ({
	assignmentUpgrade,
	closeModal
}: {
	assignmentUpgrade?: AssignmentUpgrade
	closeModal?: () => void
}) => {
	const editing = !!assignmentUpgrade?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAssignmentUpgradeParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAssignmentUpgradeParams),
		defaultValues: assignmentUpgrade ?? {
			newCmId: '',
			oldCmId: '',
			newInstance: '',
			oldInstance: ''
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

		await utils.assignmentUpgrades.getAssignmentUpgrades.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Assignment Upgrade ${action}d!`)
	}

	const { mutate: createAssignmentUpgrade, isLoading: isCreating } =
		trpc.assignmentUpgrades.createAssignmentUpgrade.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateAssignmentUpgrade, isLoading: isUpdating } =
		trpc.assignmentUpgrades.updateAssignmentUpgrade.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteAssignmentUpgrade, isLoading: isDeleting } =
		trpc.assignmentUpgrades.deleteAssignmentUpgrade.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewAssignmentUpgradeParams) => {
		if (editing) {
			updateAssignmentUpgrade({ ...values, id: assignmentUpgrade.id })
		} else {
			createAssignmentUpgrade(values)
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
					name='newCmId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>New Cm Id</FormLabel>
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
					name='oldCmId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Old Cm Id</FormLabel>
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
					name='newInstance'
					render={({ field }) => (
						<FormItem>
							<FormLabel>New Instance</FormLabel>
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
					name='oldInstance'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Old Instance</FormLabel>
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
							deleteAssignmentUpgrade({ id: assignmentUpgrade.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default AssignmentUpgradeForm
