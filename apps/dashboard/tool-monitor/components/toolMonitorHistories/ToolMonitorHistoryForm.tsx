'use client'

import {
	ToolMonitorHistory,
	NewToolMonitorHistoryParams,
	insertToolMonitorHistoryParams
} from '@soco/tool-monitor-db/schema/toolMonitorHistories'
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

const ToolMonitorHistoryForm = ({
	toolMonitorHistory,
	closeModal
}: {
	toolMonitorHistory?: ToolMonitorHistory
	closeModal?: () => void
}) => {
	const editing = !!toolMonitorHistory?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertToolMonitorHistoryParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertToolMonitorHistoryParams),
		defaultValues: toolMonitorHistory ?? {
			sid: ''
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

		await utils.toolMonitorHistories.getToolMonitorHistories.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Tool Monitor History ${action}d!`)
	}

	const { mutate: createToolMonitorHistory, isLoading: isCreating } =
		trpc.toolMonitorHistories.createToolMonitorHistory.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateToolMonitorHistory, isLoading: isUpdating } =
		trpc.toolMonitorHistories.updateToolMonitorHistory.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteToolMonitorHistory, isLoading: isDeleting } =
		trpc.toolMonitorHistories.deleteToolMonitorHistory.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewToolMonitorHistoryParams) => {
		if (editing) {
			updateToolMonitorHistory({ ...values, id: toolMonitorHistory.id })
		} else {
			createToolMonitorHistory(values)
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
					name='sid'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sid</FormLabel>
							<FormControl>
								<Input {...field} />
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
							deleteToolMonitorHistory({ id: toolMonitorHistory.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default ToolMonitorHistoryForm
