import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Controls() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="font-inter flex h-full w-full flex-col items-center justify-center p-25">
          <div className="flex h-full w-full flex-col items-center gap-3 rounded-md p-10">
            <div className="flex gap-10 rounded-md border p-5">
              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold">Power</h2>
                <div className="flex">
                  <button className="w-full cursor-pointer border px-10 py-8 text-xl">
                    ON
                  </button>
                  <button className="w-full cursor-pointer border border-red-700 bg-red-300 px-10 py-8 text-xl text-red-700">
                    OFF
                  </button>
                  <button className="w-full cursor-pointer border px-10 py-8 text-xl">
                    AUTO
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold">Mode</h2>
                <div className="flex">
                  <button className="w-full cursor-pointer border px-10 py-8 text-xl">
                    Warm
                  </button>
                  <button className="w-full cursor-pointer border border-red-700 bg-red-300 px-10 py-8 text-xl text-red-700">
                    Cool
                  </button>
                  <button className="w-full cursor-pointer border px-10 py-8 text-xl">
                    Auto
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
