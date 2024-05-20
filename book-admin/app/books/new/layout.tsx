import * as React from "react";
import { MainPage, PageBreadcrumb, Pageheader } from "../components/components";

export interface IBookNewLayoutProps {
  children: React.ReactNode;
}

export default function BookNewLayout({ children }: IBookNewLayoutProps) {
  return (
    <MainPage>
      <PageBreadcrumb />
      <Pageheader title="Nhập sách mới" />
      {children}
    </MainPage>
  );
}
