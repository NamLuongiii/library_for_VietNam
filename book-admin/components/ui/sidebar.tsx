import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes } from "react";
import { Text } from "./text";
import { Button, ButtonProps } from "./button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ children, ...prop }: HtmlHTMLAttributes<HTMLDivElement>) => {
  return <div {...prop}>{children}</div>;
};

const SidebarItem = ({
  children,
  className,
  herf,
  ...props
}: ButtonProps & { herf: string }) => {
  const pathname = usePathname();
  const isActive = pathname == herf;
  return (
    <Link href={herf}>
      <Button variant="link" className={cn(className)} {...props}>
        <Text
          variant={isActive ? "emphased" : "light"}
          size="sm"
          className={cn(isActive ? "underline" : "")}
        >
          {children}
        </Text>
      </Button>
    </Link>
  );
};

export { Sidebar, SidebarItem };
