'use client'

import {
	WikiVersion,
	NewWikiVersionParams,
	insertWikiVersionParams
} from '@soco/wiki-db/schema/wikiVersions'
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

const WikiVersionForm = ({
	wikiVersion,
	closeModal
}: {
	wikiVersion?: WikiVersion
	closeModal?: () => void
}) => {
	const { data: wikiPages } = trpc.wikiPages.getWikiPages.useQuery()
	const editing = !!wikiVersion?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertWikiVersionParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertWikiVersionParams),
		defaultValues: wikiVersion ?? {
			content: '',
			contentFormat: 0,
			wikiPageId: '',
			version: 0
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

		await utils.wikiVersions.getWikiVersions.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Wiki Version ${action}d!`)
	}

	const { mutate: createWikiVersion, isLoading: isCreating } =
		trpc.wikiVersions.createWikiVersion.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateWikiVersion, isLoading: isUpdating } =
		trpc.wikiVersions.updateWikiVersion.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteWikiVersion, isLoading: isDeleting } =
		trpc.wikiVersions.deleteWikiVersion.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewWikiVersionParams) => {
		if (editing) {
			updateWikiVersion({ ...values, id: wikiVersion.id })
		} else {
			createWikiVersion(values)
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
					name='content'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Content</FormLabel>
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
					name='contentFormat'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Content Format</FormLabel>
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
					name='wikiPageId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Wiki Page Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a wiki page' />
									</SelectTrigger>
									<SelectContent>
										{wikiPages?.wikiPages.map((wikiPage) => (
											<SelectItem
												key={wikiPage.id}
												value={wikiPage.id.toString()}
											>
												{wikiPage.id}{' '}
												{/* TODO: Replace with a field from the wikiPage model */}
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
					name='version'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Version</FormLabel>
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
						onClick={() => deleteWikiVersion({ id: wikiVersion.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default WikiVersionForm
