import { computersRouter } from './computers'
import { router } from '../server/trpc'
import { faqsRouter } from './faqs'
import { faqCategoriesRouter } from './faqCategories'
import { faqFaqsCategoriesRouter } from './faqFaqsCategories'
import { competencyFrameworkRouter } from "./competencyFramework";
import { competencyFrameworksRouter } from "./competencyFrameworks";
import { competenciesRouter } from "./competencies";
import { competencyCourseCompsRouter } from "./competencyCourseComps";
import { competencyCourseCompSettingsRouter } from "./competencyCourseCompSettings";
import { competencyEvidencesRouter } from "./competencyEvidences";
import { competencyModuleCompsRouter } from "./competencyModuleComps";
import { competencyPlansRouter } from "./competencyPlans";
import { competencyPlanCompsRouter } from "./competencyPlanComps";
import { competencyRelatedCompsRouter } from "./competencyRelatedComps";
import { competencyTemplatesRouter } from "./competencyTemplates";
import { competencyTemplateCohortsRouter } from "./competencyTemplateCohorts";
import { competencyTemplateCompsRouter } from "./competencyTemplateComps";
import { competencyUserCompsRouter } from "./competencyUserComps";
import { competencyUserCompCoursesRouter } from "./competencyUserCompCourses";
import { competencyUserCompPlansRouter } from "./competencyUserCompPlans";
import { competencyUserEvidencesRouter } from "./competencyUserEvidences";
import { competencyUserEvidenceCompsRouter } from "./competencyUserEvidenceComps";

export const appRouter = router({
	computers: computersRouter,
	faqs: faqsRouter,
	faqCategories: faqCategoriesRouter,
	faqFaqsCategories: faqFaqsCategoriesRouter
})

export type AppRouter = typeof appRouter
  competencyFramework: competencyFrameworkRouter,
  competencyFrameworks: competencyFrameworksRouter,
  competencies: competenciesRouter,
  competencyCourseComps: competencyCourseCompsRouter,
  competencyCourseCompSettings: competencyCourseCompSettingsRouter,
  competencyEvidences: competencyEvidencesRouter,
  competencyModuleComps: competencyModuleCompsRouter,
  competencyPlans: competencyPlansRouter,
  competencyPlanComps: competencyPlanCompsRouter,
  competencyRelatedComps: competencyRelatedCompsRouter,
  competencyTemplates: competencyTemplatesRouter,
  competencyTemplateCohorts: competencyTemplateCohortsRouter,
  competencyTemplateComps: competencyTemplateCompsRouter,
  competencyUserComps: competencyUserCompsRouter,
  competencyUserCompCourses: competencyUserCompCoursesRouter,
  competencyUserCompPlans: competencyUserCompPlansRouter,
  competencyUserEvidences: competencyUserEvidencesRouter,
  competencyUserEvidenceComps: competencyUserEvidenceCompsRouter,
