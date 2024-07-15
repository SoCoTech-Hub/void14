'use client'

import {
	WikiLink,
	NewWikiLinkParams,
	insertWikiLinkParams
} from '@soco/wiki-db/schema/wikiLinks'
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

const WikiLinkForm = ({
	wikiLink,
	closeModal
}: {
	wikiLink?: WikiLink
	closeModal?: () => void
}) => {
	const { data: fromPage } = trpc.wikiPages.getWikiPages.useQuery()
	const { data: subWiki } = trpc.wikiPages.getWikiPages.useQuery()
	const { data: toMissingPage } = trpc.wikiPages.getWikiPages.useQuery()
	const { data: toPage } = trpc.wikiPages.getWikiPages.useQuery()
	const editing = !!wikiLink?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertWikiLinkParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertWikiLinkParams),
		defaultValues: wikiLink ?? {
			fromPage: '',
			subWiki: '',
			toMissingPage: '',
			toPage: ''
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

		await utils.wikiLinks.getWikiLinks.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Wiki Link ${action}d!`)
	}

	const { mutate: createWikiLink, isLoading: isCreating } =
		trpc.wikiLinks.createWikiLink.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateWikiLink, isLoading: isUpdating } =
		trpc.wikiLinks.updateWikiLink.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteWikiLink, isLoading: isDeleting } =
		trpc.wikiLinks.deleteWikiLink.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewWikiLinkParams) => {
		if (editing) {
			updateWikiLink({ ...values, id: wikiLink.id })
		} else {
			createWikiLink(values)
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
						onClick={() => deleteWikiLink({ id: wikiLink.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default WikiLinkForm
