'use client'

import {
	ScormSeqRuleCond,
	NewScormSeqRuleCondParams,
	insertScormSeqRuleCondParams
} from '@/lib/db/schema/scormSeqRuleConds'
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

const ScormSeqRuleCondForm = ({
	scormSeqRuleCond,
	closeModal
}: {
	scormSeqRuleCond?: ScormSeqRuleCond
	closeModal?: () => void
}) => {
	const { data: scormScoes } = trpc.scormScoes.getScormScoes.useQuery()
	const editing = !!scormSeqRuleCond?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertScormSeqRuleCondParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertScormSeqRuleCondParams),
		defaultValues: scormSeqRuleCond ?? {
			action: '',
			conditionCombination: '',
			ruletype: 0,
			scormScoeId: ''
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

		await utils.scormSeqRuleConds.getScormSeqRuleConds.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Scorm Seq Rule Cond ${action}d!`)
	}

	const { mutate: createScormSeqRuleCond, isLoading: isCreating } =
		trpc.scormSeqRuleConds.createScormSeqRuleCond.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateScormSeqRuleCond, isLoading: isUpdating } =
		trpc.scormSeqRuleConds.updateScormSeqRuleCond.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteScormSeqRuleCond, isLoading: isDeleting } =
		trpc.scormSeqRuleConds.deleteScormSeqRuleCond.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewScormSeqRuleCondParams) => {
		if (editing) {
			updateScormSeqRuleCond({ ...values, id: scormSeqRuleCond.id })
		} else {
			createScormSeqRuleCond(values)
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
					name='action'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Action</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='conditionCombination'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Condition Combination</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='ruletype'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ruletype</FormLabel>
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
						onClick={() => deleteScormSeqRuleCond({ id: scormSeqRuleCond.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default ScormSeqRuleCondForm
