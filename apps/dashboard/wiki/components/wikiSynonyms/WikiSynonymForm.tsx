'use client'

import {
	WikiSynonym,
	NewWikiSynonymParams,
	insertWikiSynonymParams
} from '@/lib/db/schema/wikiSynonyms'
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

const WikiSynonymForm = ({
	wikiSynonym,
	closeModal
}: {
	wikiSynonym?: WikiSynonym
	closeModal?: () => void
}) => {
	const { data: wikiPages } = trpc.wikiPages.getWikiPages.useQuery()
	const { data: wikiSubwikis } = trpc.wikiSubwikis.getWikiSubwikis.useQuery()
	const editing = !!wikiSynonym?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertWikiSynonymParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertWikiSynonymParams),
		defaultValues: wikiSynonym ?? {
			wikiPageId: '',
			pageSynonym: '',
			wikiSubwikiId: ''
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

		await utils.wikiSynonyms.getWikiSynonyms.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Wiki Synonym ${action}d!`)
	}

	const { mutate: createWikiSynonym, isLoading: isCreating } =
		trpc.wikiSynonyms.createWikiSynonym.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateWikiSynonym, isLoading: isUpdating } =
		trpc.wikiSynonyms.updateWikiSynonym.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteWikiSynonym, isLoading: isDeleting } =
		trpc.wikiSynonyms.deleteWikiSynonym.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewWikiSynonymParams) => {
		if (editing) {
			updateWikiSynonym({ ...values, id: wikiSynonym.id })
		} else {
			createWikiSynonym(values)
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
					name='pageSynonym'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Page Synonym</FormLabel>
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
					name='wikiSubwikiId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Wiki Subwiki Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a wiki subwiki' />
									</SelectTrigger>
									<SelectContent>
										{wikiSubwikis?.wikiSubwikis.map((wikiSubwiki) => (
											<SelectItem
												key={wikiSubwiki.wikiSubwiki.id}
												value={wikiSubwiki.wikiSubwiki.id.toString()}
											>
												{wikiSubwiki.wikiSubwiki.id}{' '}
												{/* TODO: Replace with a field from the wikiSubwiki model */}
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
						onClick={() => deleteWikiSynonym({ id: wikiSynonym.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default WikiSynonymForm
