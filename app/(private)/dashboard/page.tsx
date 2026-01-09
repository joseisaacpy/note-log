import { auth } from "@/lib/auth";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
  const session = await auth();

  const lastNotes = await prisma.diaryEntry.findMany({
    where: { userId: session!.user!.id },
    orderBy: { date: "desc" },
    take: 5,
  });

  const today = new Date().toLocaleDateString("pt-BR");

  return (
    <section className="section">
      <header>
        <h1 className="text-2xl font-bold">
          Olá, {session?.user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-muted-foreground">
          Hoje é {today}. Que tal escrever algo?
        </p>
      </header>

      <div>
        <Link
          href="/notes/new"
          className="inline-block rounded-md bg-black px-4 py-2 text-white"
        >
          Nova entrada
        </Link>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Últimas anotações</h2>

        {lastNotes.length === 0 ? (
          <p className="text-muted-foreground">Você ainda não escreveu nada.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {lastNotes.map((note) => (
              <li key={note.id} className="rounded-md border p-4">
                <Link key={note.id} href={`/notes/${note.id}`}>
                  <p className="font-medium">{note.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(note.date).toLocaleDateString("pt-BR")}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
