'use client'

import {
	LocalizationLanguage,
	NewLocalizationLanguageParams,
	insertLocalizationLanguageParams
} from '@/lib/db/schema/localizationLanguages'
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

const LocalizationLanguageForm = ({
	localizationLanguage,
	closeModal
}: {
	localizationLanguage?: LocalizationLanguage
	closeModal?: () => void
}) => {
	const editing = !!localizationLanguage?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertLocalizationLanguageParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertLocalizationLanguageParams),
		defaultValues: localizationLanguage ?? {
			name: '',
			flag: '',
			countryId: ''
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

		await utils.localizationLanguages.getLocalizationLanguages.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Localization Language ${action}d!`)
	}

	const { mutate: createLocalizationLanguage, isLoading: isCreating } =
		trpc.localizationLanguages.createLocalizationLanguage.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateLocalizationLanguage, isLoading: isUpdating } =
		trpc.localizationLanguages.updateLocalizationLanguage.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteLocalizationLanguage, isLoading: isDeleting } =
		trpc.localizationLanguages.deleteLocalizationLanguage.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewLocalizationLanguageParams) => {
		if (editing) {
			updateLocalizationLanguage({ ...values, id: localizationLanguage.id })
		} else {
			createLocalizationLanguage(values)
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
					name='flag'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Flag</FormLabel>
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
					name='countryId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Country Id</FormLabel>
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
							deleteLocalizationLanguage({ id: localizationLanguage.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default LocalizationLanguageForm
