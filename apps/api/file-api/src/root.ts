import { createTRPCRouter } from "./trpc";

import { fileConversionsRouter } from './routers/fileConversions';
import { filesRouter } from './routers/files';
import { filesReferencesRouter } from './routers/filesReferences';
import { foldersRouter } from './routers/folders';
import { infectedFilesRouter } from './routers/infectedFiles';

export const appRouter = createTRPCRouter({
  fileConversions: fileConversionsRouter,
  files: filesRouter,
  filesReferences: filesReferencesRouter,
  folders: foldersRouter,
  infectedFiles: infectedFilesRouter,
});

export type AppRouter = typeof appRouter;
