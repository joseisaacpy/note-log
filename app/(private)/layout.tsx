import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = auth();

  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <>
      <main className="flex-1">{children}</main>
    </>
  );
}
