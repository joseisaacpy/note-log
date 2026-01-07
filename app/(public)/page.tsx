import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <section className="section min-h-[80vh] flex flex-col-reverse items-center justify-center gap-8">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold max-w-2xl text-center">
          Conheça o <span className="text-primary">NoteLog</span>, seu diário
          pessoal com autenticação!
        </h1>

        <Link href="/api/auth/signin">
          <Button size="lg">Entrar com GitHub</Button>
        </Link>
      </div>

      <Image
        src="/assets/images/logo-notelog-removebg-preview.png"
        alt="Logo do NoteLog"
        width={360}
        height={360}
        priority
      />
    </section>
  );
}
