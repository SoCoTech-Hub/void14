'use client'
import { ReactNode } from 'react'
import { trpc } from '@/lib/trpc/client'
import CourseCategoryModal from './CourseCategoryModal'
import { CompleteCourseCategory } from '@/lib/db/schema/courseCategories'

type ListProps<T> = {
	items: T[]
	renderItem: (item: T) => ReactNode
	emptyState?: ReactNode
}

function List<T>({ items, renderItem, emptyState }: ListProps<T>) {
	if (items.length === 0) {
		return emptyState || <EmptyState />
	}

	return (
		<ul role='list'>
			{items.map((item, index) => (
				<li
					key={index}
					className='flex justify-between my-2'
				>
					{renderItem(item)}
				</li>
			))}
		</ul>
	)
}

const EmptyState = () => {
	return (
		<div className='text-center'>
			<h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
				No items found
			</h3>
			<p className='mt-1 text-sm text-muted-foreground'>
				Get started by creating a new item.
			</p>
			<div className='mt-6'>
				<CourseCategoryModal emptyState={true} />
			</div>
		</div>
	)
}

export default function CourseCategoryList({
	courseCategories
}: {
	courseCategories: CompleteCourseCategory[]
}) {
	const { data: c } = trpc.courseCategories.getCourseCategories.useQuery(
		undefined,
		{
			initialData: { courseCategories },
			refetchOnMount: false
		}
	)

	return (
		<List
			items={c.courseCategories}
			renderItem={(courseCategory) => (
				<CourseCategoryItem courseCategory={courseCategory} />
			)}
			emptyState={
				<div className='text-center'>
					<h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
						No course categories
					</h3>
					<p className='mt-1 text-sm text-muted-foreground'>
						Get started by creating a new course category.
					</p>
					<div className='mt-6'>
						<CourseCategoryModal emptyState={true} />
					</div>
				</div>
			}
		/>
	)
}

const CourseCategoryItem = ({
	courseCategory
}: {
	courseCategory: CompleteCourseCategory
}) => {
	return (
		<>
			<div className='w-full'>
				<div>{courseCategory.courseCount}</div>
			</div>
			<CourseCategoryModal courseCategory={courseCategory} />
		</>
	)
}
