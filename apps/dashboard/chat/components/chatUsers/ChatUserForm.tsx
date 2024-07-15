'use client'

import {
	ChatUser,
	NewChatUserParams,
	insertChatUserParams
} from '@soco/chat-db/schema/chatUsers'
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

const ChatUserForm = ({
	chatUser,
	closeModal
}: {
	chatUser?: ChatUser
	closeModal?: () => void
}) => {
	const { data: chats } = trpc.chats.getChats.useQuery()
	const editing = !!chatUser?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertChatUserParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertChatUserParams),
		defaultValues: chatUser ?? {
			chatId: '',
			courseId: '',
			firstPing: 0,
			groupId: '',
			ip: '',
			lang: '',
			lastMessagePing: 0,
			lastPing: 0,
			sid: '',
			version: ''
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

		await utils.chatUsers.getChatUsers.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Chat User ${action}d!`)
	}

	const { mutate: createChatUser, isLoading: isCreating } =
		trpc.chatUsers.createChatUser.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateChatUser, isLoading: isUpdating } =
		trpc.chatUsers.updateChatUser.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteChatUser, isLoading: isDeleting } =
		trpc.chatUsers.deleteChatUser.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewChatUserParams) => {
		if (editing) {
			updateChatUser({ ...values, id: chatUser.id })
		} else {
			createChatUser(values)
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
					name='firstPing'
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Ping</FormLabel>
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
					name='ip'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ip</FormLabel>
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
					name='lang'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Lang</FormLabel>
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
					name='lastMessagePing'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Message Ping</FormLabel>
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
					name='lastPing'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Ping</FormLabel>
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
					name='sid'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sid</FormLabel>
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
						onClick={() => deleteChatUser({ id: chatUser.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default ChatUserForm
