"use client";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Record as DataRecord } from "@/app/dashboard/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
// const chartConfig = {
//   time: {
//     label: "Time",
//     color: "hsl(var(--chart-1))",
//   },
//   temperature: {
//     label: "Temp",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig;

type ChartConfig = Record<string, { label: string; color: string }>;

export function Component({
  title,
  description,
  chartData,
  trend,
  chartConfig,
}: {
  title: string;
  description: string;
  chartData: DataRecord[];
  trend: string;
  chartConfig: ChartConfig;
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
            className="w-[15rem]"
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={"ddddd"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <defs>
              <linearGradient id="colorChart" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FEF9C2" stopOpacity={1} />
                <stop offset="100%" stopColor="#FDC700" stopOpacity={1} />
              </linearGradient>
            </defs>
            {Object.entries(chartConfig).map(([key]) => (
              <Area
                key={key}
                dataKey={key}
                type="natural"
                fill="url(#colorChart)"
                fillOpacity={0.4}
                stroke={"#F0B100"}
                stackId="a"
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              {trend} <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Updated every 30 - 60 - 90 - 120 - 180 seconds
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
