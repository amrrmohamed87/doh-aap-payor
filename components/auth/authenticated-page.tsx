import { SidebarProvider } from "@/contextAPI/sidebar-context";
import { Sidebar } from "../sidebar/sidebar";
import { DashboardWrapper } from "./dashboard-wrapper";

const AuthPages = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider>
      <main className="w-full h-screen flex bg-slate-50">
        <Sidebar />

        <DashboardWrapper>{children}</DashboardWrapper>
      </main>
    </SidebarProvider>
  );
};

export default AuthPages;
