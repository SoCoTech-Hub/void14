'use client'
import { CompleteChatMessage } from '@/lib/db/schema/chatMessages'
import { trpc } from '@/lib/trpc/client'
import ChatMessageModal from './ChatMessageModal'

export default function ChatMessageList({
	chatMessages
}: {
	chatMessages: CompleteChatMessage[]
}) {
	const { data: c } = trpc.chatMessages.getChatMessages.useQuery(undefined, {
		initialData: { chatMessages },
		refetchOnMount: false
	})

	if (c.chatMessages.length === 0) {
		return <EmptyState />
	}

	return (
		<ul>
			{c.chatMessages.map((chatMessage) => (
				<ChatMessage
					chatMessage={chatMessage}
					key={chatMessage.id}
				/>
			))}
		</ul>
	)
}

const ChatMessage = ({ chatMessage }: { chatMessage: CompleteChatMessage }) => {
	return (
		<li className='flex justify-between my-2'>
			<div className='w-full'>
				<div>{chatMessage.chatId}</div>
			</div>
			<ChatMessageModal chatMessage={chatMessage} />
		</li>
	)
}

const EmptyState = () => {
	return (
		<div className='text-center'>
			<h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
				No chat messages
			</h3>
			<p className='mt-1 text-sm text-muted-foreground'>
				Get started by creating a new chat message.
			</p>
			<div className='mt-6'>
				<ChatMessageModal emptyState={true} />
			</div>
		</div>
	)
}
