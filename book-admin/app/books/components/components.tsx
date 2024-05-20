import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Text } from "@/components/ui/text";
import { ReactNode } from "react";

const Pageheader = ({ title }: { title: string }) => {
  return (
    <header className="flex items-center mb-4">
      <Text variant="normal" size="sm">
        {title}
      </Text>
    </header>
  );
};

const PageBreadcrumb = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/home">Trang chủ</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/books">Tủ sách</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Nhập sách</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const MainPage = ({ children }: { children: ReactNode }) => {
  return <div className="p-4">{children}</div>;
};

export { MainPage, PageBreadcrumb, Pageheader };
