import { QuestionCard } from "@/components/romantic/QuestionCard";
import { FloatingHearts } from "@/components/romantic/FloatingHearts";
import { BackgroundGlow } from "@/components/romantic/BackgroundGlow";

export default function Home() {
  return (
    <main className="relative min-h-[100dvh] w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Background Lighting */}
      <BackgroundGlow />
      <FloatingHearts />

      {/* Main Container จัดกึ่งกลาง */}
      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center justify-center text-center">
        <QuestionCard />
      </div>
    </main>
  );
}