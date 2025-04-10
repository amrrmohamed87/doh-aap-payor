import AuthPages from "@/components/auth/authenticated-page";
import { ToastContainer } from "react-toastify";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main>
      <AuthPages>{children}</AuthPages>
      <ToastContainer />
    </main>
  );
};

export default DashboardLayout;
