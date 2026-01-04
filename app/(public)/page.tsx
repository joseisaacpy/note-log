import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main>
      <h1>Meu Diário</h1>
      <p>Bem-vindo, {session.user?.name}</p>
    </main>
  );
}
