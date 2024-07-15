'use client'

import {
	BigBlueButtonBnLog,
	NewBigBlueButtonBnLogParams,
	insertBigBlueButtonBnLogParams
} from '@soco/big-blue-button-db/schema/bigBlueButtonBnLogs'
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

const BigBlueButtonBnLogForm = ({
	bigBlueButtonBnLog,
	closeModal
}: {
	bigBlueButtonBnLog?: BigBlueButtonBnLog
	closeModal?: () => void
}) => {
	const { data: bigBlueButtonBns } =
		trpc.bigBlueButtonBns.getBigBlueButtonBns.useQuery()
	const editing = !!bigBlueButtonBnLog?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertBigBlueButtonBnLogParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertBigBlueButtonBnLogParams),
		defaultValues: bigBlueButtonBnLog ?? {
			bigBlueButtonBnId: '',
			courseId: '',
			log: '',
			meetingId: '',
			meta: ''
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

		await utils.bigBlueButtonBnLogs.getBigBlueButtonBnLogs.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Big Blue Button Bn Log ${action}d!`)
	}
	const onError = async (
		action: 'create' | 'update' | 'delete',
		data?: { error?: string }
	) => {
		if (data?.error) {
			toast.error(data.error)
			return
		}
	}

	const { mutate: createBigBlueButtonBnLog, isLoading: isCreating } =
		trpc.bigBlueButtonBnLogs.createBigBlueButtonBnLog.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateBigBlueButtonBnLog, isLoading: isUpdating } =
		trpc.bigBlueButtonBnLogs.updateBigBlueButtonBnLog.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteBigBlueButtonBnLog, isLoading: isDeleting } =
		trpc.bigBlueButtonBnLogs.deleteBigBlueButtonBnLog.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewBigBlueButtonBnLogParams) => {
		if (editing) {
			updateBigBlueButtonBnLog({ ...values, id: bigBlueButtonBnLog.id })
		} else {
			createBigBlueButtonBnLog(values)
		}
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className={'space-y-6'}
			>
				<FormField
					control={form.control}
					name='bigBlueButtonBnId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Big Blue Button Bn Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a big blue button bn' />
									</SelectTrigger>
									<SelectContent>
										{bigBlueButtonBns?.bigBlueButtonBns.map(
											(bigBlueButtonBn) => (
												<SelectItem
													key={bigBlueButtonBn.id}
													value={bigBlueButtonBn.id.toString()}
												>
													{bigBlueButtonBn.name}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='courseId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Course Id</FormLabel>
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
					name='log'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Log</FormLabel>
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
					name='meetingId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Meeting Id</FormLabel>
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
					name='meta'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Meta</FormLabel>
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
					name='delete'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Delete</FormLabel>
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
						onClick={() =>
							deleteBigBlueButtonBnLog({ id: bigBlueButtonBnLog.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default BigBlueButtonBnLogForm
