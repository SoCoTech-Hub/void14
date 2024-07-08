import { createTRPCRouter } from "./trpc";

import { dataContentsRouter } from './routers/dataContents';
import { dataRecordsRouter } from './routers/dataRecords';
import { datasRouter } from './routers/datas';
import { fieldsRouter } from './routers/fields';

export const appRouter = createTRPCRouter({
  dataContents: dataContentsRouter,
  dataRecords: dataRecordsRouter,
  datas: datasRouter,
  fields: fieldsRouter,
});

export type AppRouter = typeof appRouter;
