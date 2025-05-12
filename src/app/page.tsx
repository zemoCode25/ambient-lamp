// React imports
import Link from "next/link";

// UI imports
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { AuroraText } from "@/components/magicui/aurora-text";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="font-inter flex h-screen w-screen items-center justify-center">
      <div className="">
        <NeonGradientCard
          borderSize={0}
          neonColors={{ firstColor: "#1034E6", secondColor: "#EDE500" }}
          className="p-0 shadow-lg"
        >
          <AuroraText
            colors={["#1034E6", "#57C3C7", "#EDE500"]}
            className="text-3xl font-bold sm:text-5xl md:text-7xl"
          >
            AmbientLamp
          </AuroraText>
          <div className="z-10 flex w-full items-center justify-center">
            <div
              className={cn(
                "group rounded-lg border border-black/9 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 text-gray-500 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span className="text-xs sm:text-sm md:text-lg">
                  ✨ Light Up
                </span>
              </AnimatedShinyText>
            </div>
          </div>
        </NeonGradientCard>
      </div>
    </main>
  );
}
