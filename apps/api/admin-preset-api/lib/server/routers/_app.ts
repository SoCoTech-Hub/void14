import { router } from "../server/trpc";
import { adminPresetAppPlugsRouter } from "./adminPresetAppPlugs";
import { adminPresetItAsRouter } from "./adminPresetItAs";
import { adminPresetItsRouter } from "./adminPresetIts";
import { adminPresetPlugsRouter } from "./adminPresetPlugs";
import { adminPresetsRouter } from "./adminPresets";
import { adminpresetsAppItAsRouter } from "./adminpresetsAppItAs";
import { adminpresetsAppItsRouter } from "./adminpresetsAppIts";
import { adminPresetsAppsRouter } from "./adminPresetsApps";
import { computersRouter } from "./computers";

export const appRouter = router({
  computers: computersRouter,
  adminPresets: adminPresetsRouter,
  adminPresetsApps: adminPresetsAppsRouter,
  adminpresetsAppIts: adminpresetsAppItsRouter,
  adminpresetsAppItAs: adminpresetsAppItAsRouter,
  adminPresetAppPlugs: adminPresetAppPlugsRouter,
  adminPresetIts: adminPresetItsRouter,
  adminPresetItAs: adminPresetItAsRouter,
  adminPresetPlugs: adminPresetPlugsRouter,
});

export type AppRouter = typeof appRouter;
