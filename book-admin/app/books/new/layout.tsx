import * as React from "react";
import { MainPage, PageBreadcrumb } from "../components/components";

export interface IBookNewLayoutProps {
  children: React.ReactNode;
}

export default function BookNewLayout({ children }: IBookNewLayoutProps) {
  return (
    <MainPage>
      <PageBreadcrumb />
      {children}
    </MainPage>
  );
}
