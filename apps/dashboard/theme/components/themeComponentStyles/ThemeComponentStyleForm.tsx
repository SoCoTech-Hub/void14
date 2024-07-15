'use client'

import {
	ThemeComponentStyle,
	NewThemeComponentStyleParams,
	insertThemeComponentStyleParams
} from '@soco/theme-db/schema/themeComponentStyles'
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

const ThemeComponentStyleForm = ({
	themeComponentStyle,
	closeModal
}: {
	themeComponentStyle?: ThemeComponentStyle
	closeModal?: () => void
}) => {
	const { data: themes } = trpc.themes.getThemes.useQuery()
	const { data: themeComponents } =
		trpc.themeComponents.getThemeComponents.useQuery()
	const editing = !!themeComponentStyle?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertThemeComponentStyleParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertThemeComponentStyleParams),
		defaultValues: themeComponentStyle ?? {
			themeId: '',
			themeComponentId: '',
			style: ''
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

		await utils.themeComponentStyles.getThemeComponentStyles.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Theme Component Style ${action}d!`)
	}

	const { mutate: createThemeComponentStyle, isLoading: isCreating } =
		trpc.themeComponentStyles.createThemeComponentStyle.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onSuccess('create', { error: err.message })
		})

	const { mutate: updateThemeComponentStyle, isLoading: isUpdating } =
		trpc.themeComponentStyles.updateThemeComponentStyle.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onSuccess('update', { error: err.message })
		})

	const { mutate: deleteThemeComponentStyle, isLoading: isDeleting } =
		trpc.themeComponentStyles.deleteThemeComponentStyle.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onSuccess('delete', { error: err.message })
		})

	const handleSubmit = (values: NewThemeComponentStyleParams) => {
		if (editing) {
			updateThemeComponentStyle({ ...values, id: themeComponentStyle.id })
		} else {
			createThemeComponentStyle(values)
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
					name='themeId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Theme Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a theme' />
									</SelectTrigger>
									<SelectContent>
										{themes?.themes.map((theme) => (
											<SelectItem
												key={theme.id}
												value={theme.id.toString()}
											>
												{theme.name}
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
					name='themeComponentId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Theme Component</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a theme component' />
									</SelectTrigger>
									<SelectContent>
										{themeComponents?.themeComponents.map((themeComponent) => (
											<SelectItem
												key={themeComponent.id}
												value={themeComponent.id.toString()}
											>
												{themeComponent.name}{' '}
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
					name='style'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Style</FormLabel>
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
							deleteThemeComponentStyle({ id: themeComponentStyle.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default ThemeComponentStyleForm
