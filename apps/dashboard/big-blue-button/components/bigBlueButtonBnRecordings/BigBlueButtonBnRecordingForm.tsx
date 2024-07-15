'use client'

import {
	BigBlueButtonBnRecording,
	NewBigBlueButtonBnRecordingParams,
	insertBigBlueButtonBnRecordingParams
} from '@soco/big-blue-button-db/schema/bigBlueButtonBnRecordings'
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

const BigBlueButtonBnRecordingForm = ({
	bigBlueButtonBnRecording,
	closeModal
}: {
	bigBlueButtonBnRecording?: BigBlueButtonBnRecording
	closeModal?: () => void
}) => {
	const { data: bigBlueButtonBns } =
		trpc.bigBlueButtonBns.getBigBlueButtonBns.useQuery()
	const editing = !!bigBlueButtonBnRecording?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertBigBlueButtonBnRecordingParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertBigBlueButtonBnRecordingParams),
		defaultValues: bigBlueButtonBnRecording ?? {
			bigBlueButtonBnId: '',
			courseId: '',
			groupId: '',
			headless: false,
			imported: false,
			importedData: '',
			recordingId: '',
			status: false
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

		await utils.bigBlueButtonBnRecordings.getBigBlueButtonBnRecordings.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Big Blue Button Bn Recording ${action}d!`)
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

	const { mutate: createBigBlueButtonBnRecording, isLoading: isCreating } =
		trpc.bigBlueButtonBnRecordings.createBigBlueButtonBnRecording.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateBigBlueButtonBnRecording, isLoading: isUpdating } =
		trpc.bigBlueButtonBnRecordings.updateBigBlueButtonBnRecording.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteBigBlueButtonBnRecording, isLoading: isDeleting } =
		trpc.bigBlueButtonBnRecordings.deleteBigBlueButtonBnRecording.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewBigBlueButtonBnRecordingParams) => {
		if (editing) {
			updateBigBlueButtonBnRecording({
				...values,
				id: bigBlueButtonBnRecording.id
			})
		} else {
			createBigBlueButtonBnRecording(values)
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
													{bigBlueButtonBn.id}{' '}
													{/* TODO: Replace with a field from the bigBlueButtonBn model */}
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
					name='groupId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Group Id</FormLabel>
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
					name='headless'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Headless</FormLabel>
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
				<FormField
					control={form.control}
					name='imported'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Imported</FormLabel>
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
				<FormField
					control={form.control}
					name='importedData'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Imported Data</FormLabel>
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
					name='recordingId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Recording Id</FormLabel>
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
					name='status'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
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
							deleteBigBlueButtonBnRecording({
								id: bigBlueButtonBnRecording.id
							})
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default BigBlueButtonBnRecordingForm
