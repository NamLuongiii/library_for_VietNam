"use client";

import { AppSidebar } from "@/components/share/app-sidebar";
import * as React from "react";

export interface IMainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: IMainLayoutProps) {
  return (
    <div className="flex items-start">
      <AppSidebar></AppSidebar>
      {children}
    </div>
  );
}
