'use client'

import {
	SocialShare,
	NewSocialShareParams,
	insertSocialShareParams
} from '@soco/social-db/schema/socialShares'
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

const SocialShareForm = ({
	socialShare,
	closeModal
}: {
	socialShare?: SocialShare
	closeModal?: () => void
}) => {
	const { data: socialLinks } = trpc.socialLinks.getSocialLinks.useQuery()
	const editing = !!socialShare?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertSocialShareParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertSocialShareParams),
		defaultValues: socialShare ?? {
			fieldId: '',
			tableName: '',
			socialLinkId: ''
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

		await utils.socialShares.getSocialShares.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Social Share ${action}d!`)
	}

	const { mutate: createSocialShare, isLoading: isCreating } =
		trpc.socialShares.createSocialShare.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateSocialShare, isLoading: isUpdating } =
		trpc.socialShares.updateSocialShare.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteSocialShare, isLoading: isDeleting } =
		trpc.socialShares.deleteSocialShare.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewSocialShareParams) => {
		if (editing) {
			updateSocialShare({ ...values, id: socialShare.id })
		} else {
			createSocialShare(values)
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
					name='fieldId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Field Id</FormLabel>
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
					name='tableName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Table Name</FormLabel>
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
					name='socialLinkId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Social Link Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a social link' />
									</SelectTrigger>
									<SelectContent>
										{socialLinks?.socialLinks.map((socialLink) => (
											<SelectItem
												key={socialLink.id}
												value={socialLink.id.toString()}
											>
												{socialLink.name}{' '}
												{/* TODO: Replace with a field from the socialLink model */}
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
						onClick={() => deleteSocialShare({ id: socialShare.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default SocialShareForm
