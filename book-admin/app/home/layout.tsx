import * as React from "react";

export interface IMainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: IMainLayoutProps) {
  return <div>{children}</div>;
}
