import ThemeToggle from "../components/theme-toggle";
import MainLayout from "./layout/main-layout";

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center gap-6 p-12">

        <ThemeToggle />
      </div>
    </MainLayout>
  );
}
