import { qtypeDdimageortextDragsRouter } from "./routers/qtypeDdimageortextDrags";
import { qtypeDdimageortextDropsRouter } from "./routers/qtypeDdimageortextDrops";
import { qtypeDdimageortextsRouter } from "./routers/qtypeDdimageortexts";
import { qtypeDdmarkerDragsRouter } from "./routers/qtypeDdmarkerDrags";
import { qtypeDdmarkerDropsRouter } from "./routers/qtypeDdmarkerDrops";
import { qtypeDdmarkersRouter } from "./routers/qtypeDdmarkers";
import { qtypeEssayOptionsRouter } from "./routers/qtypeEssayOptions";
import { qtypeMatchOptionsRouter } from "./routers/qtypeMatchOptions";
import { qtypeMatchSubquestionsRouter } from "./routers/qtypeMatchSubquestions";
import { qtypeMultichoiceOptionsRouter } from "./routers/qtypeMultichoiceOptions";
import { qtypeRandomsamatchOptionsRouter } from "./routers/qtypeRandomsamatchOptions";
import { qtypeShortanswerOptionsRouter } from "./routers/qtypeShortanswerOptions";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  qtypeDdimageortextDrags: qtypeDdimageortextDragsRouter,
  qtypeDdimageortextDrops: qtypeDdimageortextDropsRouter,
  qtypeDdimageortexts: qtypeDdimageortextsRouter,
  qtypeDdmarkerDrags: qtypeDdmarkerDragsRouter,
  qtypeDdmarkerDrops: qtypeDdmarkerDropsRouter,
  qtypeDdmarkers: qtypeDdmarkersRouter,
  qtypeEssayOptions: qtypeEssayOptionsRouter,
  qtypeMatchOptions: qtypeMatchOptionsRouter,
  qtypeMatchSubquestions: qtypeMatchSubquestionsRouter,
  qtypeMultichoiceOptions: qtypeMultichoiceOptionsRouter,
  qtypeRandomsamatchOptions: qtypeRandomsamatchOptionsRouter,
  qtypeShortanswerOptions: qtypeShortanswerOptionsRouter,
});

export type AppRouter = typeof appRouter;
