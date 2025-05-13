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

  const [power, setPower] = useState("off");
  const [mode, setMode] = useState("warm");

  function handlePowerClick(selectedPower: string) {
    setPower(selectedPower);
  }

  function handleModeClick(selectedMode: string) {
    setMode(selectedMode);
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="font-inter flex h-full w-full flex-col items-center justify-center">
          <div className="flex flex-col gap-5 rounded-md p-10">
            <div className="flex gap-5 rounded-md">
              <Card className="flex h-fit flex-col gap-1 rounded-sm px-6 py-5">
                <h2 className="text-xl font-semibold">Power</h2>
                <div className="flex gap-2">
                  <Button
                    className={`cursor-pointer border px-10 py-8 text-lg hover:border-green-500 hover:bg-green-100 ${power === "on" ? "border-green-500 bg-green-100 text-green-800" : ""}`}
                    variant={"outline"}
                    onClick={() => handlePowerClick("on")}
                  >
                    ON
                  </Button>
                  <Button
                    className={`cursor-pointer border px-10 py-8 text-lg hover:border-red-500 hover:bg-red-100 ${power === "off" ? "border-red-500 bg-red-100 text-red-800" : ""}`}
                    variant={"outline"}
                    onClick={() => handlePowerClick("off")}
                  >
                    OFF
                  </Button>
                  <Button
                    className={`cursor-pointer border px-10 py-8 text-lg hover:border-blue-500 hover:bg-blue-100 ${power === "auto" ? "border-blue-500 bg-blue-100 text-blue-800" : ""}`}
                    variant={"outline"}
                    onClick={() => handlePowerClick("auto")}
                  >
                    AUTO
                  </Button>
                </div>
              </Card>
              <Card className="flex h-fit flex-col gap-1 rounded-sm px-6 py-5">
                <h2 className="text-xl font-semibold">Mode</h2>
                <div className="flex gap-2">
                  <Button
                    className={`cursor-pointer border px-10 py-8 text-lg hover:border-amber-500 hover:bg-amber-100 ${mode === "warm" ? "border-amber-500 bg-amber-100 text-amber-800" : ""}`}
                    variant={"outline"}
                    onClick={() => handleModeClick("warm")}
                  >
                    WARM
                  </Button>
                  <Button
                    className={`cursor-pointer border px-10 py-8 text-lg hover:border-cyan-500 hover:bg-cyan-100 ${mode === "cool" ? "border-cyan-500 bg-cyan-100 text-cyan-800" : ""}`}
                    variant={"outline"}
                    onClick={() => handleModeClick("cool")}
                  >
                    COOL
                  </Button>
                  <Button
                    className={`cursor-pointer border px-10 py-8 text-lg hover:border-blue-500 hover:bg-blue-100 ${mode === "auto" ? "border-blue-500 bg-blue-100 text-blue-800" : ""}`}
                    variant={"outline"}
                    onClick={() => handleModeClick("auto")}
                  >
                    AUTO
                  </Button>
                </div>
              </Card>
            </div>
            <Card className="flex flex-row items-center justify-between gap-10 rounded-sm px-6 py-3">
              <div className="flex w-full flex-col">
                <h2 className="text-xl font-semibold">
                  Auto <span className="text-green-500">on</span>
                </h2>
                {/* Auto On */}
                <div className="flex justify-between gap-2">
                  <div className="flex flex-col items-center">
                    <Input className="w-[7rem] text-center text-sm"></Input>
                    <label htmlFor="">Hours</label>
                  </div>
                  <span className="pt-1.5">:</span>
                  <div className="flex flex-col items-center">
                    <Input className="w-[7rem] text-center text-sm"></Input>
                    <label htmlFor="">Minutes</label>
                  </div>
                  <span className="pt-1.5">:</span>
                  <div className="flex flex-col items-center">
                    <Input className="w-[7rem] text-center text-sm"></Input>
                    <label htmlFor="">Seconds</label>
                  </div>
                </div>
                {/* Auto On */}
              </div>
              <div className="flex w-full flex-col">
                <h2 className="text-xl font-semibold">
                  Auto <span className="text-red-500">off</span>
                </h2>
                {/* Auto Off */}
                <div className="flex justify-between gap-2">
                  <div className="flex flex-col items-center">
                    <Input className="w-[7rem] text-center text-sm"></Input>
                    <label htmlFor="">Hours</label>
                  </div>
                  <span className="pt-1.5">:</span>
                  <div className="flex flex-col items-center">
                    <Input className="w-[7rem] text-center text-sm"></Input>
                    <label htmlFor="">Minutes</label>
                  </div>
                  <span className="pt-1.5">:</span>
                  <div className="flex flex-col items-center">
                    <Input className="w-[7rem] text-center text-sm"></Input>
                    <label htmlFor="">Seconds</label>
                  </div>
                </div>
                {/* Auto Off */}
              </div>
            </Card>
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
                        <Input className="w-[5rem] text-center text-sm"></Input>
                        <label htmlFor="">H</label>
                      </div>
                      <div className="flex flex-col items-center">
                        <Input className="w-[5rem] text-center text-sm"></Input>
                        <label htmlFor="">S</label>
                      </div>
                      <div className="flex flex-col items-center">
                        <Input className="w-[5rem] text-center text-sm outline-none"></Input>
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
