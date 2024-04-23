'use client'

import {
	SocialIcon,
	NewSocialIconParams,
	insertSocialIconParams
} from '@/lib/db/schema/socialIcons'
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

const SocialIconForm = ({
	socialIcon,
	closeModal
}: {
	socialIcon?: SocialIcon
	closeModal?: () => void
}) => {
	const editing = !!socialIcon?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertSocialIconParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertSocialIconParams),
		defaultValues: socialIcon ?? {
			emoji: ''
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

		await utils.socialIcons.getSocialIcons.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Social Icon ${action}d!`)
	}

	const { mutate: createSocialIcon, isLoading: isCreating } =
		trpc.socialIcons.createSocialIcon.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateSocialIcon, isLoading: isUpdating } =
		trpc.socialIcons.updateSocialIcon.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteSocialIcon, isLoading: isDeleting } =
		trpc.socialIcons.deleteSocialIcon.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewSocialIconParams) => {
		if (editing) {
			updateSocialIcon({ ...values, id: socialIcon.id })
		} else {
			createSocialIcon(values)
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
					name='emoji'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Emoji</FormLabel>
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
						onClick={() => deleteSocialIcon({ id: socialIcon.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default SocialIconForm
