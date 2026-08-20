import { createFileRoute } from "@tanstack/react-router";
import { Bell, Bot, CloudSun, Globe2, Save, UserRound, type LucideIcon } from "lucide-react";
import { useState, type ReactNode } from "react";

import { PageHeader, Panel, Pill, PreviewBadge } from "@/components/kit/Primitives";
import { PREVIEW_NOTICE } from "@/lib/preview-data";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — AI Travel Weather Agent" },
      {
        name: "description",
        content: "Manage your profile, travel, weather, alert and AI preferences.",
      },
    ],
  }),
  component: Settings,
});

function Settings() {
  const [name, setName] = useState("");
  const [homeRegion, setHomeRegion] = useState("Pakistan");
  const [units, setUnits] = useState("Metric");
  const [notifications, setNotifications] = useState(true);
  const [highRiskOnly, setHighRiskOnly] = useState(false);
  const [aiTone, setAiTone] = useState("Balanced");
  const [saved, setSaved] = useState(false);

  return (
    <div className="page">
      <PageHeader
        eyebrow="Workspace controls"
        title="Settings"
        description="Tune your travel intelligence experience. Changes are applied locally for this preview."
        actions={
          <>
            <PreviewBadge label={PREVIEW_NOTICE} />
            <button type="button" className="btn-primary" onClick={() => setSaved(true)}>
              <Save className="size-4" aria-hidden />
              Save preferences
            </button>
          </>
        }
      />

      {saved ? (
        <p className="mt-4 text-sm text-success" role="status">
          Preferences updated for this session.
        </p>
      ) : null}

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <SettingsPanel icon={UserRound} title="Profile" description="Basic details for your travel workspace.">
          <label className="field-label" htmlFor="settings-name">Display name</label>
          <input id="settings-name" className="field mt-2" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          <label className="field-label mt-4 block" htmlFor="settings-region">Home region</label>
          <select id="settings-region" className="field mt-2" value={homeRegion} onChange={(e) => setHomeRegion(e.target.value)}>
            <option>Pakistan</option>
            <option>United Arab Emirates</option>
            <option>United Kingdom</option>
            <option>United States</option>
          </select>
        </SettingsPanel>

        <SettingsPanel icon={Globe2} title="Travel Preferences" description="Set the defaults used when planning trips.">
          <label className="field-label" htmlFor="settings-units">Measurement units</label>
          <select id="settings-units" className="field mt-2" value={units} onChange={(e) => setUnits(e.target.value)}>
            <option>Metric</option>
            <option>Imperial</option>
          </select>
          <p className="mt-4 text-xs text-muted-foreground">Trip type and weather risk preferences can be selected while planning a journey.</p>
        </SettingsPanel>

        <SettingsPanel icon={CloudSun} title="Weather Preferences" description="Choose how forecast conditions are presented.">
          <Toggle label="Show feels-like temperature" checked={true} onChange={() => undefined} />
          <Toggle label="Include hourly forecast" checked={true} onChange={() => undefined} />
          <Toggle label="Highlight travel risks" checked={highRiskOnly} onChange={setHighRiskOnly} />
        </SettingsPanel>

        <SettingsPanel icon={Bell} title="Notifications" description="Control how alert updates appear in the interface.">
          <Toggle label="Weather alert notifications" checked={notifications} onChange={setNotifications} />
          <Toggle label="High-risk alerts only" checked={highRiskOnly} onChange={setHighRiskOnly} />
          <Pill tone="neutral" className="mt-3">Backend notifications not connected</Pill>
        </SettingsPanel>

        <SettingsPanel icon={Bot} title="AI Preferences" description="Personalize the assistant's response style.">
          <label className="field-label" htmlFor="settings-tone">Response style</label>
          <select id="settings-tone" className="field mt-2" value={aiTone} onChange={(e) => setAiTone(e.target.value)}>
            <option>Balanced</option>
            <option>Concise</option>
            <option>Detailed</option>
          </select>
          <p className="mt-4 text-xs text-muted-foreground">Voice and AI services remain disabled until their configured endpoints are connected.</p>
        </SettingsPanel>

        <SettingsPanel icon={Bell} title="Alert Settings" description="Review the alert categories you want to monitor.">
          <div className="flex flex-wrap gap-2">
            {["Heavy Rain", "Strong Winds", "Thunderstorms", "Extreme Heat", "Snow", "Poor Visibility"].map((item) => (
              <Pill key={item} tone="neutral">{item}</Pill>
            ))}
          </div>
        </SettingsPanel>
      </div>
    </div>
  );
}

function SettingsPanel({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Panel className="p-6">
      <div className="flex items-start gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden />
        </span>
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </Panel>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 border-b border-border py-3 text-sm last:border-b-0">
      <span>{label}</span>
      <input type="checkbox" className="size-4 accent-[hsl(var(--primary))]" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}
