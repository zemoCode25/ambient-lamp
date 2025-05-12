"use client";
import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { HexColorPicker } from "react-colorful";
import { Pipette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Controls() {
  const [color, setColor] = useState<string>("#FFF00F");
  console.log(`p-10 bg-[${color}]`);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="font-inter flex h-full w-full flex-col items-center justify-center">
          <div className="flex flex-col gap-3 rounded-md p-10">
            <div className="flex gap-5 rounded-md">
              <Card className="flex h-fit flex-col gap-1 rounded-sm px-6 py-5">
                <h2 className="text-xl font-semibold">Power</h2>
                <div className="flex">
                  <button className="w-full cursor-pointer border px-10 py-8 text-lg">
                    ON
                  </button>
                  <button className="w-full cursor-pointer border-2 border-red-800 bg-red-100 px-10 py-8 text-lg text-red-800">
                    OFF
                  </button>
                  <button className="w-full cursor-pointer border px-10 py-8 text-lg">
                    AUTO
                  </button>
                </div>
              </Card>
              <Card className="flex h-fit flex-col gap-1 rounded-sm px-6 py-5">
                <h2 className="text-xl font-semibold">Mode</h2>
                <div className="flex">
                  <button className="w-full cursor-pointer border px-10 py-8 text-lg">
                    Warm
                  </button>
                  <button className="w-full cursor-pointer border-2 border-red-800 bg-red-100 px-10 py-8 text-lg text-red-800">
                    Cool
                  </button>
                  <button className="w-full cursor-pointer border px-10 py-8 text-lg">
                    Auto
                  </button>
                </div>
              </Card>
            </div>
            <Card className="flex flex-row items-center gap-4 rounded-sm px-6 py-5">
              <div className="jus flex h-full w-full flex-col gap-1">
                <h2 className="text-xl font-semibold">Lamp color</h2>
                <div className="flex w-full justify-between gap-5">
                  <div
                    className="h-full w-full rounded-md shadow-sm"
                    style={{ backgroundColor: color }}
                  ></div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <label htmlFor="">Hex Code</label>
                      <Input className="text-sm"></Input>
                    </div>
                    <div className="flex justify-between gap-2">
                      <div className="flex flex-col items-center">
                        <Input className="w-[5rem] text-sm"></Input>
                        <label htmlFor="">H</label>
                      </div>
                      <div className="flex flex-col items-center">
                        <Input className="w-[5rem] text-sm"></Input>
                        <label htmlFor="">S</label>
                      </div>
                      <div className="flex flex-col items-center">
                        <Input className="w-[5rem] text-sm"></Input>
                        <label htmlFor="">B</label>
                      </div>
                    </div>
                    <Button className="cursor-pointer bg-blue-900 hover:bg-blue-800">
                      Pick a color <Pipette />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
