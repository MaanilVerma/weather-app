"use client";
import { useToggle } from "@/context/ToggleThemeContext";
import { useUserInputContext } from "@/context/UserInputContext";
import Dashboard from "@/shared-components/Dashboard";
import Sidebar from "@/shared-components/Sidebar";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const { isLoading } = useUserInputContext();
  const { theme } = useToggle();
  return (
    <>
      {isLoading && (
        <section className="fixed top-0 left-0 z-10 right-0 w-full h-full   bg-[#00000059] flex justify-center items-center">
          <div className="loader"></div>
        </section>
      )}
      <main
        className={`w-full p-10  max-xl:flex-col max-xl:p-3 2xl:items-center ${
          isLoading ? "min-h-screen" : "min-h-max"
        } ${
          theme === "dark" ? "bg-[#3a3d44]" : "bg-[#d6d7da]"
        }     2xl:h-screen  flex max-xl:gap-5`}
      >
        <Sidebar />
        <Dashboard />
      </main>
      <Toaster position="top-right" />
    </>
  );
}
