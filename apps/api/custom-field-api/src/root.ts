import { createTRPCRouter } from "./trpc";

import { customFieldCategoriesRouter } from './routers/customFieldCategories';
import { customFieldDatasRouter } from './routers/customFieldDatas';
import { customFieldFieldsRouter } from './routers/customFieldFields';

export const appRouter = createTRPCRouter({
  customFieldCategories: customFieldCategoriesRouter,
  customFieldDatas: customFieldDatasRouter,
  customFieldFields: customFieldFieldsRouter,
});

export type AppRouter = typeof appRouter;
