'use client'

import {
	ScormSeqMapinfo,
	NewScormSeqMapinfoParams,
	insertScormSeqMapinfoParams
} from '@/lib/db/schema/scormSeqMapinfos'
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

const ScormSeqMapinfoForm = ({
	scormSeqMapinfo,
	closeModal
}: {
	scormSeqMapinfo?: ScormSeqMapinfo
	closeModal?: () => void
}) => {
	const { data: scormSeqObjectives } =
		trpc.scormSeqObjectives.getScormSeqObjectives.useQuery()
	const { data: scormScoes } = trpc.scormScoes.getScormScoes.useQuery()
	const { data: scormSeqObjectives } =
		trpc.scormSeqObjectives.getScormSeqObjectives.useQuery()
	const editing = !!scormSeqMapinfo?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertScormSeqMapinfoParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertScormSeqMapinfoParams),
		defaultValues: scormSeqMapinfo ?? {
			scormSeqObjectiveId: '',
			readNormalizedMeasure: false,
			readSatisfiedStatus: false,
			scormScoeId: '',
			scormSeqTargetObjectiveId: '',
			writeNormalizedMeasure: false,
			writeSatisfiedStatus: false
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

		await utils.scormSeqMapinfos.getScormSeqMapinfos.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Scorm Seq Mapinfo ${action}d!`)
	}

	const { mutate: createScormSeqMapinfo, isLoading: isCreating } =
		trpc.scormSeqMapinfos.createScormSeqMapinfo.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateScormSeqMapinfo, isLoading: isUpdating } =
		trpc.scormSeqMapinfos.updateScormSeqMapinfo.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteScormSeqMapinfo, isLoading: isDeleting } =
		trpc.scormSeqMapinfos.deleteScormSeqMapinfo.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewScormSeqMapinfoParams) => {
		if (editing) {
			updateScormSeqMapinfo({ ...values, id: scormSeqMapinfo.id })
		} else {
			createScormSeqMapinfo(values)
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
					name='scormSeqObjectiveId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Scorm Seq Objective Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a scorm seq objective' />
									</SelectTrigger>
									<SelectContent>
										{scormSeqObjectives?.scormSeqObjectives.map(
											(scormSeqObjective) => (
												<SelectItem
													key={scormSeqObjective.scormSeqObjective.id}
													value={scormSeqObjective.scormSeqObjective.id.toString()}
												>
													{scormSeqObjective.scormSeqObjective.id}{' '}
													{/* TODO: Replace with a field from the scormSeqObjective model */}
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
					name='readNormalizedMeasure'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Read Normalized Measure</FormLabel>
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
					name='readSatisfiedStatus'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Read Satisfied Status</FormLabel>
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
					name='scormSeqTargetObjectiveId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Scorm Seq Target Objective Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a scorm seq Target objective' />
									</SelectTrigger>
									<SelectContent>
										{scormSeqObjectives?.scormSeqObjectives.map(
											(scormSeqObjective) => (
												<SelectItem
													key={scormSeqObjective.scormSeqObjective.id}
													value={scormSeqObjective.scormSeqObjective.id.toString()}
												>
													{scormSeqObjective.scormSeqObjective.id}{' '}
													{/* TODO: Replace with a field from the scormSeqObjective model */}
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
					name='writeNormalizedMeasure'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Write Normalized Measure</FormLabel>
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
					name='writeSatisfiedStatus'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Write Satisfied Status</FormLabel>
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
						onClick={() => deleteScormSeqMapinfo({ id: scormSeqMapinfo.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default ScormSeqMapinfoForm
