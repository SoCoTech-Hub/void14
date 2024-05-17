'use client'

import {
	CompetencyCourseCompSetting,
	NewCompetencyCourseCompSettingParams,
	insertCompetencyCourseCompSettingParams
} from '@/lib/db/schema/competencyCourseCompSettings'
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

const CompetencyCourseCompSettingForm = ({
	competencyCourseCompSetting,
	closeModal
}: {
	competencyCourseCompSetting?: CompetencyCourseCompSetting
	closeModal?: () => void
}) => {
	const editing = !!competencyCourseCompSetting?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertCompetencyCourseCompSettingParams>>(
		{
			// latest Zod release has introduced a TS error with zodResolver
			// open issue: https://github.com/colinhacks/zod/issues/2663
			// errors locally but not in production
			resolver: zodResolver(insertCompetencyCourseCompSettingParams),
			defaultValues: competencyCourseCompSetting ?? {
				courseId: '',
				pushRatingsToUserPlans: 0
			}
		}
	)

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

		await utils.competencyCourseCompSettings.getCompetencyCourseCompSettings.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Competency Course Comp Setting ${action}d!`)
	}

	const { mutate: createCompetencyCourseCompSetting, isLoading: isCreating } =
		trpc.competencyCourseCompSettings.createCompetencyCourseCompSetting.useMutation(
			{
				onSuccess: (res) => onSuccess('create'),
				onError: (err) => onError('create', { error: err.message })
			}
		)

	const { mutate: updateCompetencyCourseCompSetting, isLoading: isUpdating } =
		trpc.competencyCourseCompSettings.updateCompetencyCourseCompSetting.useMutation(
			{
				onSuccess: (res) => onSuccess('update'),
				onError: (err) => onError('update', { error: err.message })
			}
		)

	const { mutate: deleteCompetencyCourseCompSetting, isLoading: isDeleting } =
		trpc.competencyCourseCompSettings.deleteCompetencyCourseCompSetting.useMutation(
			{
				onSuccess: (res) => onSuccess('delete'),
				onError: (err) => onError('delete', { error: err.message })
			}
		)

	const handleSubmit = (values: NewCompetencyCourseCompSettingParams) => {
		if (editing) {
			updateCompetencyCourseCompSetting({
				...values,
				id: competencyCourseCompSetting.id
			})
		} else {
			createCompetencyCourseCompSetting(values)
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
					name='pushRatingsToUserPlans'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Push Ratings To User Plans</FormLabel>
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
							deleteCompetencyCourseCompSetting({
								id: competencyCourseCompSetting.id
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

export default CompetencyCourseCompSettingForm
