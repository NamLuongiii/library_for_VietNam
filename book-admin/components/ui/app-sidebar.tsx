import { Sidebar, SidebarItem } from "./sidebar";

export interface IAppSidebarProps {}

export function AppSidebar(props: IAppSidebarProps) {
  return (
    <Sidebar className="basis-32 sticky top-0">
      <SidebarItem herf="/home">Trang chủ</SidebarItem>
      <SidebarItem herf="/books/new">Đăng sách mới</SidebarItem>
      <SidebarItem herf="/books">Sách đã đăng</SidebarItem>
      <SidebarItem herf="/categories">Quản lý danh mục</SidebarItem>
      <SidebarItem herf="/authors">Quản lý tác giả</SidebarItem>
    </Sidebar>
  );
}
