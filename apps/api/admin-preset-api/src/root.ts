import { adminPresetAppPlugsRouter } from './routers/adminPresetAppPlugs';
import { adminPresetItAsRouter } from './routers/adminPresetItAs';
import { adminPresetItsRouter } from './routers/adminPresetIts';
import { adminPresetPlugsRouter } from './routers/adminPresetPlugs';
import { adminPresetsRouter } from './routers/adminPresets';
import { adminpresetsAppItAsRouter } from './routers/adminpresetsAppItAs';
import { adminpresetsAppItsRouter } from './routers/adminpresetsAppIts';
import { adminPresetsAppsRouter } from './routers/adminPresetsApps';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  adminPresetAppPlugs: adminPresetAppPlugsRouter,
  adminPresetItAs: adminPresetItAsRouter,
  adminPresetIts: adminPresetItsRouter,
  adminPresetPlugs: adminPresetPlugsRouter,
  adminPresets: adminPresetsRouter,
  adminpresetsAppItAs: adminpresetsAppItAsRouter,
  adminpresetsAppIts: adminpresetsAppItsRouter,
  adminPresetsApps: adminPresetsAppsRouter,
});

export type AppRouter = typeof appRouter;
