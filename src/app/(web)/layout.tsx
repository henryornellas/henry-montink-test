import { Header } from "@/layouts";
import type { PropsWithChildren } from "react";

type WebLayoutProps = PropsWithChildren;

export default function WebLayout({ children }: WebLayoutProps) {
  return (
    <div className="h-dvh">
      <Header />

      {children}
    </div>
  );
}
