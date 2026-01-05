import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-2xl font-bold">Entrar</h1>
        <Link
          href="/api/auth/signin"
          className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-white"
        >
          <Image
            src="/assets/images/github.svg"
            alt="Ícone do GitHub"
            width={30}
            height={30}
          />
          Entrar com GitHub
        </Link>
      </div>
    </section>
  );
}
