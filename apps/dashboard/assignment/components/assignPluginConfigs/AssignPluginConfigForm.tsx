'use client'

import {
	AssignPluginConfig,
	NewAssignPluginConfigParams,
	insertAssignPluginConfigParams
} from '@/lib/db/schema/assignPluginConfigs'
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

const AssignPluginConfigForm = ({
	assignPluginConfig,
	closeModal
}: {
	assignPluginConfig?: AssignPluginConfig
	closeModal?: () => void
}) => {
	const { data: assignments } = trpc.assignments.getAssignments.useQuery()
	const editing = !!assignPluginConfig?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertAssignPluginConfigParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertAssignPluginConfigParams),
		defaultValues: assignPluginConfig ?? {
			assignmentId: '',
			name: '',
			plugin: '',
			subType: '',
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

		await utils.assignPluginConfigs.getAssignPluginConfigs.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Assign Plugin Config ${action}d!`)
	}

	const { mutate: createAssignPluginConfig, isLoading: isCreating } =
		trpc.assignPluginConfigs.createAssignPluginConfig.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateAssignPluginConfig, isLoading: isUpdating } =
		trpc.assignPluginConfigs.updateAssignPluginConfig.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteAssignPluginConfig, isLoading: isDeleting } =
		trpc.assignPluginConfigs.deleteAssignPluginConfig.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewAssignPluginConfigParams) => {
		if (editing) {
			updateAssignPluginConfig({ ...values, id: assignPluginConfig.id })
		} else {
			createAssignPluginConfig(values)
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
					name='assignmentId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Assignment Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a assignment' />
									</SelectTrigger>
									<SelectContent>
										{assignments?.assignments.map((assignment) => (
											<SelectItem
												key={assignment.id}
												value={assignment.id.toString()}
											>
												{assignment.id}{' '}
												{/* TODO: Replace with a field from the assignment model */}
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
					name='subType'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sub Type</FormLabel>
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
						onClick={() =>
							deleteAssignPluginConfig({ id: assignPluginConfig.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default AssignPluginConfigForm
