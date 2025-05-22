"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Component } from "@/components/utils-components/Chart";
import { useState, useEffect } from "react";

import { ThermometerSun } from "lucide-react";

const chartData1 = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartData2 = [
  { month: "January", desktop: 689 },
  { month: "February", desktop: 304 },
  { month: "March", desktop: 480 },
  { month: "April", desktop: 399 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

export type Record = {
  id: string;
  temperature: number;
  time: Date;
  humidity: number;
};

export default function Dashboard() {
  const [record, setRecords] = useState<Record>([]);
  const [loading, setLoading] = useState(true);
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 10000); // every 30 seconds
    return () => clearInterval(interval);
  }, []);

  console.log(record);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="font-inter h-full w-full p-15">
          <Card className="h-fit gap-10 bg-white p-10">
            <div className="flex w-[70%] flex-row gap-5">
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
            <div className="flex w-[70%] flex-row gap-5">
              <Component
                title="Total Revenue"
                description="Revenue for the business."
                chartData={chartData1}
                trend="Trending up by 3.4% this month"
              />
              <Component
                title="Sales this month"
                description="Total sales of the business."
                chartData={chartData2}
                trend="Trending up by 7.4% this month"
              />
            </div>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
