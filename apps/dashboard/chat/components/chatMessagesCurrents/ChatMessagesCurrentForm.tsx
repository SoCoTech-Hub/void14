'use client'

import {
	ChatMessagesCurrent,
	NewChatMessagesCurrentParams,
	insertChatMessagesCurrentParams
} from '@soco/chat-db/schema/chatMessagesCurrents'
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const ChatMessagesCurrentForm = ({
	chatMessagesCurrent,
	closeModal
}: {
	chatMessagesCurrent?: ChatMessagesCurrent
	closeModal?: () => void
}) => {
	const { data: chats } = trpc.chats.getChats.useQuery()
	const editing = !!chatMessagesCurrent?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertChatMessagesCurrentParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertChatMessagesCurrentParams),
		defaultValues: {
			chatId: chatMessagesCurrent?.chatId || '',
			groupId: chatMessagesCurrent?.groupId || '',
			isSystem: chatMessagesCurrent?.isSystem || false,
			message: chatMessagesCurrent?.message || ''
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

		await utils.chatMessagesCurrents.getChatMessagesCurrents.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Chat Messages Current ${action}d!`)
	}
	const onError = async (
		action: 'create' | 'update' | 'delete',
		data?: { error?: string }
	) => {
		if (data?.error) {
			toast.error(data.error)
			return
		}
	}

	const { mutate: createChatMessagesCurrent, isLoading: isCreating } =
		trpc.chatMessagesCurrents.createChatMessagesCurrent.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateChatMessagesCurrent, isLoading: isUpdating } =
		trpc.chatMessagesCurrents.updateChatMessagesCurrent.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteChatMessagesCurrent, isLoading: isDeleting } =
		trpc.chatMessagesCurrents.deleteChatMessagesCurrent.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewChatMessagesCurrentParams) => {
		if (editing) {
			updateChatMessagesCurrent({ ...values, id: chatMessagesCurrent.id })
		} else {
			createChatMessagesCurrent(values)
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
					name='chatId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Chat Id</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value)}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a chat' />
									</SelectTrigger>
									<SelectContent>
										{chats?.chats.map((chat) => (
											<SelectItem
												key={chat.id}
												value={chat.id.toString()}
											>
												{chat.id}{' '}
												{/* TODO: Replace with a field from the chat model */}
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
					name='groupId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Group Id</FormLabel>
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
					name='isSystem'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Is System</FormLabel>
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
					name='message'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Message</FormLabel>
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
							deleteChatMessagesCurrent({ id: chatMessagesCurrent.id })
						}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default ChatMessagesCurrentForm
