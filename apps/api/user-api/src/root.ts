import { createTRPCRouter } from "./trpc";

import { userDevicesRouter } from './routers/userDevices';
import { userEnrolmentsRouter } from './routers/userEnrolments';
import { userInfoCategoriesRouter } from './routers/userInfoCategories';
import { userInfoDatasRouter } from './routers/userInfoDatas';
import { userInfoFieldsRouter } from './routers/userInfoFields';
import { userLastAccessesRouter } from './routers/userLastAccesses';
import { userPasswordHistoriesRouter } from './routers/userPasswordHistories';
import { userPasswordResetsRouter } from './routers/userPasswordResets';
import { userPreferencesRouter } from './routers/userPreferences';
import { userPrivateKeysRouter } from './routers/userPrivateKeys';
import { usersRouter } from './routers/users';

export const appRouter = createTRPCRouter({
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
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
