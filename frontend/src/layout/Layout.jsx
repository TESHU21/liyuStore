import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./navbar/NavBar";
import Footer from "./navbar/Footer";
import { Toaster } from "@/components/ui/sonner";

const Login = React.lazy(() => import("@/pages/auth/login/Login"));
const SignUp = React.lazy(() => import("@/pages/auth/registration/SignUp"));

const Layout = () => {
  const { activeModal } = useSelector((state) => state.ui);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "mt-[80px] ",
        }}
      />

      <Suspense fallback={null}>
        {activeModal === "login" ? <Login /> : null}
        {activeModal === "signup" ? <SignUp /> : null}
      </Suspense>

      <Footer />
    </div>
  );
};

export default Layout;
