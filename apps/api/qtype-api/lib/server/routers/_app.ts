import { router } from "../server/trpc";
import { qtypeDdimageortextDragsRouter } from "./qtypeDdimageortextDrags";
import { qtypeDdimageortextDropsRouter } from "./qtypeDdimageortextDrops";
import { qtypeDdimageortextsRouter } from "./qtypeDdimageortexts";
import { qtypeDdmarkerDragsRouter } from "./qtypeDdmarkerDrags";
import { qtypeDdmarkerDropsRouter } from "./qtypeDdmarkerDrops";
import { qtypeDdmarkersRouter } from "./qtypeDdmarkers";
import { qtypeEssayOptionsRouter } from "./qtypeEssayOptions";
import { qtypeMatchOptionsRouter } from "./qtypeMatchOptions";
import { qtypeMatchSubquestionsRouter } from "./qtypeMatchSubquestions";
import { qtypeMultichoiceOptionsRouter } from "./qtypeMultichoiceOptions";
import { qtypeRandomsamatchOptionsRouter } from "./qtypeRandomsamatchOptions";
import { qtypeShortanswerOptionsRouter } from "./qtypeShortanswerOptions";

export const appRouter = router({
  qtypeDdimageortexts: qtypeDdimageortextsRouter,
  qtypeDdmarkerDrags: qtypeDdmarkerDragsRouter,
  qtypeDdmarkerDrops: qtypeDdmarkerDropsRouter,
  qtypeEssayOptions: qtypeEssayOptionsRouter,
  qtypeMatchOptions: qtypeMatchOptionsRouter,
  qtypeMatchSubquestions: qtypeMatchSubquestionsRouter,
  qtypeMultichoiceOptions: qtypeMultichoiceOptionsRouter,
  qtypeRandomsamatchOptions: qtypeRandomsamatchOptionsRouter,
  qtypeShortanswerOptions: qtypeShortanswerOptionsRouter,
  qtypeDdmarkers: qtypeDdmarkersRouter,
  qtypeDdimageortextDrops: qtypeDdimageortextDropsRouter,
  qtypeDdimageortextDrags: qtypeDdimageortextDragsRouter,
});

export type AppRouter = typeof appRouter;
