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
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="font-inter flex h-full w-full flex-col items-center justify-center bg-gradient-to-t from-amber-50 to-white p-5">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-md">
            <div className="flex w-full max-w-[950px] flex-col gap-5 rounded-md px-5 py-3">
              <div className="flex w-full flex-col gap-5 rounded-md md:flex-row">
                <Power />
                <Mode />
              </div>
              <Auto />
              <LampColor />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function Power() {
  const [power, setPower] = useState("off");
  function handlePowerClick(selectedPower: string) {
    setPower(selectedPower);
  }
  return (
    <Card className="flex h-fit w-full flex-col gap-1 rounded-sm px-6 py-5">
      <h2 className="text-xl font-semibold">Power</h2>
      <div className="grid w-full grid-cols-3 gap-2">
        <Button
          className={`w-full cursor-pointer border px-10 py-8 text-base hover:border-green-500 hover:bg-green-100 md:text-lg ${power === "on" ? "border-green-500 bg-green-100 text-green-800" : ""}`}
          variant={"outline"}
          onClick={() => handlePowerClick("on")}
        >
          ON
        </Button>
        <Button
          className={`w-full cursor-pointer border px-10 py-8 text-base hover:border-red-500 hover:bg-red-100 md:text-lg ${power === "off" ? "border-red-500 bg-red-100 text-red-800" : ""}`}
          variant={"outline"}
          onClick={() => handlePowerClick("off")}
        >
          OFF
        </Button>
        <Button
          className={`w-full cursor-pointer border px-10 py-8 text-base hover:border-blue-500 hover:bg-blue-100 md:text-lg ${power === "auto" ? "border-blue-500 bg-blue-100 text-blue-800" : ""}`}
          variant={"outline"}
          onClick={() => handlePowerClick("auto")}
        >
          AUTO
        </Button>
      </div>
    </Card>
  );
}

export function Mode() {
  const [mode, setMode] = useState("warm");

  function handleModeClick(selectedMode: string) {
    setMode(selectedMode);
  }
  return (
    <Card className="flex h-fit w-full flex-col gap-1 rounded-sm px-6 py-5">
      <h2 className="text-xl font-semibold">Mode</h2>
      <div className="grid w-full grid-cols-3 gap-2">
        <Button
          className={`cursor-pointer border bg-amber-200 px-10 py-8 text-base hover:border-amber-500 hover:bg-amber-100 md:text-lg ${mode === "warm" ? "border-amber-700 bg-amber-400 text-amber-800" : ""}`}
          variant={"outline"}
          onClick={() => handleModeClick("warm")}
        >
          WARM
        </Button>
        <Button
          className={`cursor-pointer border bg-amber-200 px-10 py-8 text-base hover:border-cyan-500 hover:bg-cyan-100 md:text-lg ${mode === "cool" ? "border-cyan-500 bg-cyan-100 text-cyan-800" : ""}`}
          variant={"outline"}
          onClick={() => handleModeClick("cool")}
        >
          COOL
        </Button>
        <Button
          className={`cursor-pointer border bg-amber-200 px-10 py-8 text-base hover:border-blue-500 hover:bg-blue-100 md:text-lg ${mode === "auto" ? "border-blue-500 bg-blue-100 text-blue-800" : ""}`}
          variant={"outline"}
          onClick={() => handleModeClick("auto")}
        >
          AUTO
        </Button>
      </div>
    </Card>
  );
}

export function Auto() {
  return (
    <Card className="flex flex-col items-center justify-between gap-10 rounded-sm px-6 py-3 md:flex-row">
      <div className="flex w-full flex-col">
        <h2 className="text-xl font-semibold">
          Auto <span className="text-green-500">on</span>
        </h2>
        {/* Auto On */}
        <div className="flex justify-between gap-2">
          <div className="flex flex-col items-center">
            <Input className="w-full text-center text-sm"></Input>
            <label htmlFor="">Hours</label>
          </div>
          <span className="pt-1.5">:</span>
          <div className="flex flex-col items-center">
            <Input className="w-full text-center text-sm"></Input>
            <label htmlFor="">Minutes</label>
          </div>
          <span className="pt-1.5">:</span>
          <div className="flex flex-col items-center">
            <Input className="w-full text-center text-sm"></Input>
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
            <Input className="w-full text-center text-sm"></Input>
            <label htmlFor="">Hours</label>
          </div>
          <span className="pt-1.5">:</span>
          <div className="flex flex-col items-center">
            <Input className="w-full text-center text-sm"></Input>
            <label htmlFor="">Minutes</label>
          </div>
          <span className="pt-1.5">:</span>
          <div className="flex flex-col items-center">
            <Input className="w-full text-center text-sm"></Input>
            <label htmlFor="">Seconds</label>
          </div>
        </div>
        {/* Auto Off */}
      </div>
    </Card>
  );
}

export function LampColor() {
  const [color, setColor] = useState<string>("#FFF00F");
  const [colorPicker, setColorPicker] = useState<boolean>(false);

  function handleColorPickerClick() {
    setColorPicker((prevColorPicker) => !prevColorPicker);
  }
  return (
    <Card className="relative flex flex-row items-center gap-4 rounded-sm px-6 py-5">
      <div className="jus flex h-full w-full flex-col gap-1">
        <h2 className="text-xl font-semibold">Lamp color</h2>
        <div className="flex w-full flex-col justify-between gap-5 md:flex-row">
          <div
            className="h-[10rem] w-full rounded-md shadow-sm md:h-full"
            style={{ backgroundColor: color }}
          ></div>
          <div className="relative flex flex-col gap-5">
            <div>
              <label htmlFor="">Hex Code</label>
              <Input className="w-full text-sm"></Input>
            </div>
            <div className="flex justify-between gap-4">
              <div className="flex flex-col items-center">
                <Input className="w-[100%] text-center text-sm"></Input>
                <label htmlFor="">H</label>
              </div>
              <div className="flex flex-col items-center">
                <Input className="w-[100%] text-center text-sm"></Input>
                <label htmlFor="">S</label>
              </div>
              <div className="flex flex-col items-center">
                <Input className="w-[100%] text-center text-sm outline-none"></Input>
                <label htmlFor="">B</label>
              </div>
            </div>
            <Button
              onClick={handleColorPickerClick}
              className="cursor-pointer bg-blue-900 hover:bg-blue-800"
            >
              Pick a color <Pipette />
            </Button>
          </div>
        </div>
      </div>
      {colorPicker && (
        <HexColorPicker
          className="animate-fade-in !absolute right-6 bottom-15 z-50"
          color={color}
          onChange={setColor}
        />
      )}
    </Card>
  );
}
