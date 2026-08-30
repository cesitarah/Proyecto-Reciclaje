import type { ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function PrincipalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-nv-page">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
