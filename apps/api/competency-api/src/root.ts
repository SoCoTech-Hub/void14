import { competenciesRouter } from "./routers/competencies";
import { competencyCourseCompsRouter } from "./routers/competencyCourseComps";
import { competencyCourseCompSettingsRouter } from "./routers/competencyCourseCompSettings";
import { competencyEvidencesRouter } from "./routers/competencyEvidences";
import { competencyFrameworksRouter } from "./routers/competencyFrameworks";
import { competencyModuleCompsRouter } from "./routers/competencyModuleComps";
import { competencyPlanCompsRouter } from "./routers/competencyPlanComps";
import { competencyPlansRouter } from "./routers/competencyPlans";
import { competencyRelatedCompsRouter } from "./routers/competencyRelatedComps";
import { competencyTemplateCohortsRouter } from "./routers/competencyTemplateCohorts";
import { competencyTemplateCompsRouter } from "./routers/competencyTemplateComps";
import { competencyTemplatesRouter } from "./routers/competencyTemplates";
import { competencyUserCompCoursesRouter } from "./routers/competencyUserCompCourses";
import { competencyUserCompPlansRouter } from "./routers/competencyUserCompPlans";
import { competencyUserCompsRouter } from "./routers/competencyUserComps";
import { competencyUserEvidenceCompsRouter } from "./routers/competencyUserEvidenceComps";
import { competencyUserEvidencesRouter } from "./routers/competencyUserEvidences";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  competencies: competenciesRouter,
  competencyCourseComps: competencyCourseCompsRouter,
  competencyCourseCompSettings: competencyCourseCompSettingsRouter,
  competencyEvidences: competencyEvidencesRouter,
  competencyFrameworks: competencyFrameworksRouter,
  competencyModuleComps: competencyModuleCompsRouter,
  competencyPlanComps: competencyPlanCompsRouter,
  competencyPlans: competencyPlansRouter,
  competencyRelatedComps: competencyRelatedCompsRouter,
  competencyTemplateCohorts: competencyTemplateCohortsRouter,
  competencyTemplateComps: competencyTemplateCompsRouter,
  competencyTemplates: competencyTemplatesRouter,
  competencyUserCompCourses: competencyUserCompCoursesRouter,
  competencyUserCompPlans: competencyUserCompPlansRouter,
  competencyUserComps: competencyUserCompsRouter,
  competencyUserEvidenceComps: competencyUserEvidenceCompsRouter,
  competencyUserEvidences: competencyUserEvidencesRouter,
});

export type AppRouter = typeof appRouter;
