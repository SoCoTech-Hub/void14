'use client'

import {
	BackupCourse,
	NewBackupCourseParams,
	insertBackupCourseParams
} from '@/lib/db/schema/backupCourses'
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
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const BackupCourseForm = ({
	backupCourse,
	closeModal
}: {
	backupCourse?: BackupCourse
	closeModal?: () => void
}) => {
	const editing = !!backupCourse?.id

	const router = useRouter()
	const utils = trpc.useContext()

	const form = useForm<z.infer<typeof insertBackupCourseParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertBackupCourseParams),
		defaultValues: backupCourse ?? {
			courseId: '',
			lastStatus: '',
			lastStartTime: '',
			lastEndTime: '',
			nextStartTime: ''
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

		await utils.backupCourses.getBackupCourses.invalidate()
		router.refresh()
		if (closeModal) closeModal()
		toast.success(`Backup Course ${action}d!`)
	}

	const { mutate: createBackupCourse, isLoading: isCreating } =
		trpc.backupCourses.createBackupCourse.useMutation({
			onSuccess: (res) => onSuccess('create'),
			onError: (err) => onError('create', { error: err.message })
		})

	const { mutate: updateBackupCourse, isLoading: isUpdating } =
		trpc.backupCourses.updateBackupCourse.useMutation({
			onSuccess: (res) => onSuccess('update'),
			onError: (err) => onError('update', { error: err.message })
		})

	const { mutate: deleteBackupCourse, isLoading: isDeleting } =
		trpc.backupCourses.deleteBackupCourse.useMutation({
			onSuccess: (res) => onSuccess('delete'),
			onError: (err) => onError('delete', { error: err.message })
		})

	const handleSubmit = (values: NewBackupCourseParams) => {
		if (editing) {
			updateBackupCourse({ ...values, id: backupCourse.id })
		} else {
			createBackupCourse(values)
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
					name='lastStatus'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Status</FormLabel>
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
					name='lastStartTime'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Start Time</FormLabel>
							<br />
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={cn(
												'w-[240px] pl-3 text-left font-normal',
												!field.value && 'text-muted-foreground'
											)}
										>
											{field.value ? (
												format(new Date(field.value), 'PPP')
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent
									className='w-auto p-0'
									align='start'
								>
									<Calendar
										mode='single'
										selected={new Date(field.value)}
										onSelect={field.onChange}
										disabled={(date) =>
											date > new Date() || date < new Date('1900-01-01')
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='lastEndTime'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last End Time</FormLabel>
							<br />
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={cn(
												'w-[240px] pl-3 text-left font-normal',
												!field.value && 'text-muted-foreground'
											)}
										>
											{field.value ? (
												format(new Date(field.value), 'PPP')
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent
									className='w-auto p-0'
									align='start'
								>
									<Calendar
										mode='single'
										selected={new Date(field.value)}
										onSelect={field.onChange}
										disabled={(date) =>
											date > new Date() || date < new Date('1900-01-01')
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='nextStartTime'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Next Start Time</FormLabel>
							<br />
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={cn(
												'w-[240px] pl-3 text-left font-normal',
												!field.value && 'text-muted-foreground'
											)}
										>
											{field.value ? (
												format(new Date(field.value), 'PPP')
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent
									className='w-auto p-0'
									align='start'
								>
									<Calendar
										mode='single'
										selected={new Date(field.value)}
										onSelect={field.onChange}
										disabled={(date) =>
											date > new Date() || date < new Date('1900-01-01')
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>

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
						onClick={() => deleteBackupCourse({ id: backupCourse.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	)
}

export default BackupCourseForm
