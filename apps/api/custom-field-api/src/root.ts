import { customFieldCategoriesRouter } from "./routers/customFieldCategories";
import { customFieldDatasRouter } from "./routers/customFieldDatas";
import { customFieldFieldsRouter } from "./routers/customFieldFields";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  customFieldCategories: customFieldCategoriesRouter,
  customFieldDatas: customFieldDatasRouter,
  customFieldFields: customFieldFieldsRouter,
});

export type AppRouter = typeof appRouter;
