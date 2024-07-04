import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";

export async function createTRPCContext(opts: { headers: Headers }) {
  const { session } = await getUserAuth();

  return {
    db,
    session: session,
    ...opts,
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
