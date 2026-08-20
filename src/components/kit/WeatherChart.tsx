import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Panel } from "@/components/kit/Primitives";

const axisProps = {
  stroke: "var(--muted-foreground)",
  tickLine: false,
  axisLine: false,
  fontSize: 11,
};

function ChartTooltip() {
  return (
    <Tooltip
      cursor={{ stroke: "var(--border)" }}
      contentStyle={{
        background: "var(--popover)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        fontSize: 12,
        color: "var(--popover-foreground)",
      }}
      labelStyle={{ color: "var(--muted-foreground)" }}
    />
  );
}

export function WeatherChart({
  title,
  subtitle,
  variant,
  data,
  children,
}: {
  title: string;
  subtitle?: string;
  variant: "temperature" | "rain" | "wind";
  data: Array<Record<string, string | number>>;
  children?: React.ReactNode;
}) {
  return (
    <Panel className="p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-medium">{title}</h3>
          {subtitle ? (
            <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        {children}
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {variant === "temperature" ? (
            <AreaChart data={data} margin={{ left: -20, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.55} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis dataKey={Object.keys(data[0] ?? { time: "" })[0]} {...axisProps} />
              <YAxis {...axisProps} />
              <ChartTooltip />
              <Area
                type="monotone"
                dataKey="temp"
                stroke="var(--primary)"
                strokeWidth={2}
                fill="url(#tempFill)"
                name="Temp (°C)"
              />
            </AreaChart>
          ) : variant === "rain" ? (
            <BarChart data={data} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis dataKey={Object.keys(data[0] ?? { time: "" })[0]} {...axisProps} />
              <YAxis {...axisProps} />
              <ChartTooltip />
              <Bar dataKey="rain" fill="var(--cyan)" radius={[6, 6, 0, 0]} name="Rain (%)" />
            </BarChart>
          ) : (
            <LineChart data={data} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis dataKey={Object.keys(data[0] ?? { time: "" })[0]} {...axisProps} />
              <YAxis {...axisProps} />
              <ChartTooltip />
              <Line
                type="monotone"
                dataKey="wind"
                stroke="var(--electric)"
                strokeWidth={2}
                dot={false}
                name="Wind (km/h)"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
