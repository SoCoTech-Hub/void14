import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { usersRouter } from "./users";
import { userDevicesRouter } from "./userDevices";
import { userEnrolmentsRouter } from "./userEnrolments";
import { userInfoCategoriesRouter } from "./userInfoCategories";

export const appRouter = router({
  computers: computersRouter,
  users: usersRouter,
  userDevices: userDevicesRouter,
  userEnrolments: userEnrolmentsRouter,
  userInfoCategories: userInfoCategoriesRouter,
});

export type AppRouter = typeof appRouter;
