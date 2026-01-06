import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    notFound();
  }

  const note = await prisma.diaryEntry.findFirst({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  });

  if (!note) {
    notFound();
  }

  return (
    <section className="section">
      <h1 className="text-2xl font-bold">{note.title}</h1>
      <p>{note.content}</p>
      <p>{new Date(note.date).toLocaleDateString("pt-BR")}</p>

      <Link href="/dashboard">
        <Button>Voltar</Button>
      </Link>
    </section>
  );
}
