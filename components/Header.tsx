import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Header() {
  const session = await auth();

  return (
    <header>
      <nav className="flex items-center justify-between p-4">
        <h1>NoteLog</h1>

        {session?.user ? (
          <div className="flex items-center gap-4">
            <p>{session.user.name}</p>
            <Image
              src={session.user.image ?? "/assets/images/no-picture.svg"}
              alt="Imagem de perfil"
              width={30}
              height={30}
              className="rounded-full"
            />
            <Link href="/api/auth/signout">Sair</Link>
          </div>
        ) : (
          <Link href="/api/auth/signin">Entrar</Link>
        )}
      </nav>
    </header>
  );
}
