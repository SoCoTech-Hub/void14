import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { usersRouter } from "./users";
import { userDevicesRouter } from "./userDevices";
import { userEnrolmentsRouter } from "./userEnrolments";
import { userInfoCategoriesRouter } from "./userInfoCategories";
import { userInfoDatasRouter } from "./userInfoDatas";
import { userInfoFieldsRouter } from "./userInfoFields";
import { userLastAccessesRouter } from "./userLastAccesses";
import { userPasswordHistoriesRouter } from "./userPasswordHistories";
import { userPasswordResetsRouter } from "./userPasswordResets";
import { userPreferencesRouter } from "./userPreferences";
import { userPrivateKeysRouter } from "./userPrivateKeys";

export const appRouter = router({
  computers: computersRouter,
  users: usersRouter,
  userDevices: userDevicesRouter,
  userEnrolments: userEnrolmentsRouter,
  userInfoCategories: userInfoCategoriesRouter,
  userInfoDatas: userInfoDatasRouter,
  userInfoFields: userInfoFieldsRouter,
  userLastAccesses: userLastAccessesRouter,
  userPasswordHistories: userPasswordHistoriesRouter,
  userPasswordResets: userPasswordResetsRouter,
  userPreferences: userPreferencesRouter,
  userPrivateKeys: userPrivateKeysRouter,
});

export type AppRouter = typeof appRouter;
