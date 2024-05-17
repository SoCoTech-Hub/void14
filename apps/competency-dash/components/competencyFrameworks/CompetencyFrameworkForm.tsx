'use client'

import {
	CompetencyFramework,
	NewCompetencyFrameworkParams,
	insertCompetencyFrameworkParams
} from '@/lib/db/schema/competencyFrameworks'
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
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const CompetencyFrameworkForm = ({
	competencyFramework,
	closeModal
}: {
	competencyFramework?: CompetencyFramework
	closeModal?: () => void
}) => {
	const editing = !!competencyFramework?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertCompetencyFrameworkParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertCompetencyFrameworkParams),
		defaultValues: competencyFramework ?? {
			visible: false,
			contextId: '',
			description: '',
			descriptionFormat: '',
			idNumber: '',
			scaleConfiguration: '',
			scaleId: '',
			shortname: '',
			taxonomies: ''
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

		await utils.competencyFrameworks.getCompetencyFrameworks.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Competency Framework ${action}d!`)
	}

	const { mutate: createCompetencyFramework, isLoading: isCreating } =
		trpc.competencyFrameworks.createCompetencyFramework.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateCompetencyFramework, isLoading: isUpdating } =
		trpc.competencyFrameworks.updateCompetencyFramework.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteCompetencyFramework, isLoading: isDeleting } =
		trpc.competencyFrameworks.deleteCompetencyFramework.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewCompetencyFrameworkParams) => {
		if (editing) {
			updateCompetencyFramework({ ...values, id: competencyFramework.id })
		} else {
			createCompetencyFramework(values)
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
					name='visible'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Visible</FormLabel>
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
					name='contextId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Context Id</FormLabel>
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
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
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
					name='descriptionFormat'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description Format</FormLabel>
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
					name='idNumber'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Id Number</FormLabel>
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
					name='scaleConfiguration'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Scale Configuration</FormLabel>
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
					name='scaleId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Scale Id</FormLabel>
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
					name='shortname'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Shortname</FormLabel>
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
					name='taxonomies'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Taxonomies</FormLabel>
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
							deleteCompetencyFramework({ id: competencyFramework.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default CompetencyFrameworkForm
