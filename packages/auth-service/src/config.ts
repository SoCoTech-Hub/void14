import type {
  DefaultSession,
  NextAuthConfig,
  Session as NextAuthSession,
} from "next-auth";
import { skipCSRFCheck } from "@auth/core";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Discord from "next-auth/providers/discord";

import { db } from "@soco/auth-db/client";
import { Account, Session, User } from "@soco/auth-db/schema";

import { env } from "../env";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const adapter = DrizzleAdapter(db, {
  usersTable: User,
  accountsTable: Account,
  sessionsTable: Session,
});

export const isSecureContext = env.NODE_ENV !== "development";

export const authConfig = {
  adapter,
  // In development, we need to skip checks to allow Expo to work
  ...(!isSecureContext
    ? {
        skipCSRFCheck: skipCSRFCheck,
        trustHost: true,
      }
    : {}),
  secret: env.AUTH_SECRET,
  providers: [Discord],
  callbacks: {
    session: (opts) => {
      if (!("user" in opts))
        throw new Error("unreachable with session strategy");

      return {
        ...opts.session,
        user: {
          ...opts.session.user,
          id: opts.user.id,
        },
      };
    },
  },
} satisfies NextAuthConfig;

export const validateToken = async (
  token: string,
): Promise<NextAuthSession | null> => {
  const sessionToken = token.slice("Bearer ".length);
  const session = await adapter.getSessionAndUser?.(sessionToken);
  return session
    ? {
        user: {
          ...session.user,
        },
        expires: session.session.expires.toISOString(),
      }
    : null;
};

export const invalidateSessionToken = async (token: string) => {
  await adapter.deleteSession?.(token);
};

// TODO: Need to fix the auth section below
export interface AuthSession {
  Session: {
    user: {
      id: string;
      name?: string;
      email?: string;
      username?: string;
    };
  } | null;
}
export const getUserAuth = async (): Promise<AuthSession> => {
  const { session, user } = await validateRequest();
  if (!session) return { Session: null };
  return {
    Session: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    },
  };
};

export const checkAuth = async () => {
  const { session } = await validateRequest();
  if (!session) redirect("/sign-in");
};

export const genericError = { error: "Error, please try again." };

export const setAuthCookie = (cookie: Cookie) => {
  // cookies().set(cookie.name, cookie.value, cookie.attributes); // <- suggested approach from the docs, but does not work with `next build` locally
  cookies().set(cookie);
};

const getErrorMessage = (errors: any): string => {
  if (errors.email) return "Invalid Email";
  if (errors.password) return `Invalid Password - ${errors.password[0]}`;
  return ""; // return a default error message or an empty string
};

export const validateAuthFormData = (
  formData: FormData,
):
  | { data: UsernameAndPassword; error: null }
  | { data: null; error: string } => {
  const email = formData.get("email");
  const password = formData.get("password");
  const result = authenticationSchema.safeParse({ email, password });

  if (!result.success) {
    return {
      data: null,
      error: getErrorMessage(result.error.flatten().fieldErrors),
    };
  }

  return { data: result.data, error: null };
};
function validateRequest():
  | { session: any; user: any }
  | PromiseLike<{ session: any; user: any }> {
  throw new Error("Function not implemented.");
}

function redirect(arg0: string) {
  throw new Error("Function not implemented.");
}
