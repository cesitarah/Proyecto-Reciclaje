import type { ReactNode } from "react";
import Header from "../components/Header";

export default function PrincipalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {children}
      </main>
    </div>
  );
}