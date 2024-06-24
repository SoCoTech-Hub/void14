import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { adminPresetsRouter } from "./adminPresets";
import { adminPresetsAppsRouter } from "./adminPresetsApps";
import { adminpresetsAppItsRouter } from "./adminpresetsAppIts";
import { adminpresetsAppItAsRouter } from "./adminpresetsAppItAs";
import { adminPresetAppPlugsRouter } from "./adminPresetAppPlugs";
import { adminPresetItsRouter } from "./adminPresetIts";
import { adminPresetItAsRouter } from "./adminPresetItAs";
import { adminPresetPlugsRouter } from "./adminPresetPlugs";

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
