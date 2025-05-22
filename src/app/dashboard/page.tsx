"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Component } from "@/components/utils-components/Chart";
import { useState, useEffect } from "react";

import { ThermometerSun } from "lucide-react";

// const chartData1 = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ];

// const chartData2 = [
//   { month: "January", desktop: 689 },
//   { month: "February", desktop: 304 },
//   { month: "March", desktop: 480 },
//   { month: "April", desktop: 399 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ];

export type Record = {
  id: string;
  temperature: number;
  time: Date;
  humidity: number;
};

export default function Dashboard() {
  const [record, setRecords] = useState<Record | null>(null);
  const [lastFiveTemp, setLastFiveTemp] = useState<Record[]>([]);
  const [lastFiveHumid, setLastFiveHumid] = useState<Record[]>([]);

  async function fetchAll() {
    try {
      const response = await fetch("api/records/latest-record");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setRecords(json);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchLastFiveTemp() {
    try {
      const response = await fetch("api/records/last-five");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      const numbers = [30, 60, 120, 180, 240];

      const validDataTemp = json?.map((jsonItem, index: number) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { temperature } = jsonItem;
        return { temperature, time: numbers[index] };
      });

      const validDataHumid = json?.map((jsonItem, index: number) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { humidity } = jsonItem;
        return { humidity, time: numbers[index] };
      });
      setLastFiveTemp(validDataTemp);
      setLastFiveHumid(validDataHumid);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(lastFiveHumid);
  console.log(lastFiveTemp);

  // async function fetchLastFiveHumid() {
  //   try {
  //     const response = await fetch("api/records/last-five");
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const json = await response.json();
  //     const validData = json?.map((jsonItem) => {
  //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //       const { _temperature, _id, ...rest } = jsonItem;
  //       return rest;
  //     });
  //     setLastFiveHumid(validData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  useEffect(() => {
    fetchAll();
    fetchLastFiveTemp();
    const intervalTemp = setInterval(fetchLastFiveTemp, 10000); // every 10 seconds
    const interval = setInterval(fetchAll, 10000); // every 10 seconds

    return () => {
      clearInterval(intervalTemp);
      clearInterval(interval);
    };
  }, []);

  const configTemp = {
    temperature: { label: "Temperature", color: "hsl(var(--chart-2))" },
    // add more keys if needed
  };
  const configHumid = {
    humidity: { label: "Humidity", color: "hsl(var(--chart-2))" },
    // add more keys if needed
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="font-inter h-full w-full p-15">
          <Card className="h-fit gap-10 bg-white p-10">
            <div className="flex w-[100%] flex-row gap-5">
              <Card className="flex h-fit w-full flex-col gap-1 px-10 py-7">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h1 className="font-medium text-black">Temperature</h1>
                    <small className="text-gray-500">
                      Updated every 30 secs
                    </small>
                  </div>
                  <ThermometerSun size={20} color="#6A7282" />
                </div>
                <h2 className="text-3xl font-bold">{record?.temperature}</h2>
              </Card>
              <Card className="flex h-fit w-full flex-col gap-1 px-10 py-7">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h1 className="font-medium text-black">Humidity</h1>
                    <small className="text-gray-500">
                      Updated every 30 secs
                    </small>
                  </div>
                  <ThermometerSun size={20} color="#6A7282" />
                </div>
                <h2 className="text-3xl font-bold">68.92</h2>
              </Card>
            </div>
            <div className="flex w-[100%] flex-row items-center justify-center gap-5">
              <div className="flex w-[100%] flex-row gap-5">
                <Component
                  title="Temperature"
                  description="Attribute of hotness or coldness."
                  chartData={lastFiveTemp}
                  trend="Grpahical Representation of the temperature trend"
                  chartConfig={configTemp}
                />
                <Component
                  title="Humidity"
                  description="Concentration of water vapor present in the air"
                  chartData={lastFiveHumid}
                  trend="Grpahical Representation of the humidity trend"
                  chartConfig={configHumid}
                />
              </div>
            </div>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
