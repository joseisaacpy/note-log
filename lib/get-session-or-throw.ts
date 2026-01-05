import { auth } from "@/lib/auth";
type SessionWithUserId = {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export default async function getSessionOrThrow(): Promise<SessionWithUserId> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  return session as SessionWithUserId;
}
