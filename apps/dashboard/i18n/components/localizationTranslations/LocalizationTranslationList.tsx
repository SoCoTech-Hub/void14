'use client'
import { CompleteLocalizationTranslation } from '@/lib/db/schema/localizationTranslations'
import { trpc } from '@/lib/trpc/client'
import LocalizationTranslationModal from './LocalizationTranslationModal'

export default function LocalizationTranslationList({
	localizationTranslations
}: {
	localizationTranslations: CompleteLocalizationTranslation[]
}) {
	const { data: l } =
		trpc.localizationTranslations.getLocalizationTranslations.useQuery(
			undefined,
			{
				initialData: { localizationTranslations },
				refetchOnMount: false
			}
		)

	if (l.localizationTranslations.length === 0) {
		return <EmptyState />
	}

	return (
		<ul>
			{l.localizationTranslations.map((localizationTranslation) => (
				<LocalizationTranslation
					localizationTranslation={localizationTranslation}
					key={localizationTranslation.id}
				/>
			))}
		</ul>
	)
}

const LocalizationTranslation = ({
	localizationTranslation
}: {
	localizationTranslation: CompleteLocalizationTranslation
}) => {
	return (
		<li className='flex justify-between my-2'>
			<div className='w-full'>
				<div>{localizationTranslation.localizationFieldId}</div>
				<div>{localizationTranslation.localizationLanguageId}</div>
				<div>{localizationTranslation.value}</div>
			</div>
			<LocalizationTranslationModal
				localizationTranslation={localizationTranslation}
			/>
		</li>
	)
}

const EmptyState = () => {
	return (
		<div className='text-center'>
			<h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
				No localization translations
			</h3>
			<p className='mt-1 text-sm text-muted-foreground'>
				Get started by creating a new localization translation.
			</p>
			<div className='mt-6'>
				<LocalizationTranslationModal emptyState={true} />
			</div>
		</div>
	)
}
