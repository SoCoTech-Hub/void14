'use client'

import {
	ScormScoesTrack,
	NewScormScoesTrackParams,
	insertScormScoesTrackParams
} from '@/lib/db/schema/scormScoesTracks'
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

const ScormScoesTrackForm = ({
	scormScoesTrack,
	closeModal
}: {
	scormScoesTrack?: ScormScoesTrack
	closeModal?: () => void
}) => {
	const { data: scormScoes } = trpc.scormScoes.getScormScoes.useQuery()
	const { data: scorms } = trpc.scorms.getScorms.useQuery()
	const editing = !!scormScoesTrack?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertScormScoesTrackParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertScormScoesTrackParams),
		defaultValues: scormScoesTrack ?? {
			element: '',
			attempt: 0,
			scormScoeId: '',
			scormId: '',
			value: ''
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

		await utils.scormScoesTracks.getScormScoesTracks.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Scorm Scoes Track ${action}d!`)
	}

	const { mutate: createScormScoesTrack, isLoading: isCreating } =
		trpc.scormScoesTracks.createScormScoesTrack.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onSuccess('create', { error: err.message })
		})

	const { mutate: updateScormScoesTrack, isLoading: isUpdating } =
		trpc.scormScoesTracks.updateScormScoesTrack.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onSuccess('update', { error: err.message })
		})

	const { mutate: deleteScormScoesTrack, isLoading: isDeleting } =
		trpc.scormScoesTracks.deleteScormScoesTrack.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onSuccess('delete', { error: err.message })
		})

	const handleSubmit = (values: NewScormScoesTrackParams) => {
		if (editing) {
			updateScormScoesTrack({ ...values, id: scormScoesTrack.id })
		} else {
			createScormScoesTrack(values)
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
					name='element'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Element</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='attempt'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Attempt</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='scormScoeId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Scorm Scoe Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a scorm scoe' />
									</SelectTrigger>
									<SelectContent>
										{scormScoes?.scormScoes.map((scormScoe) => (
											<SelectItem
												key={scormScoe.scormScoe.id}
												value={scormScoe.scormScoe.id.toString()}
											>
												{scormScoe.scormScoe.id}{' '}
												{/* TODO: Replace with a field from the scormScoe model */}
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
					name='scormId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Scorm Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a scorm' />
									</SelectTrigger>
									<SelectContent>
										{scorms?.scorms.map((scorm) => (
											<SelectItem
												key={scorm.id}
												value={scorm.id.toString()}
											>
												{scorm.id}{' '}
												{/* TODO: Replace with a field from the scorm model */}
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
					name='value'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Value</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='del'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Del</FormLabel>
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
						onClick={() => deleteScormScoesTrack({ id: scormScoesTrack.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default ScormScoesTrackForm
