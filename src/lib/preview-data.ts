/**
 * Interface preview data.
 *
 * These values exist ONLY to demonstrate layout, charts and states while the
 * orchestration backend (n8n + WeatherAPI + OpenAI) is being connected. Every
 * surface that renders them shows a "Preview data" badge. Nothing here is a
 * real forecast or a real AI response, and nothing is persisted.
 */

export const PREVIEW_NOTICE = "Preview data — connect the backend for live results";

export type RiskLevel = "low" | "moderate" | "high";
export type TripStatus = "Good Conditions" | "Moderate Risk" | "High Risk";

export interface PreviewTrip {
  id: string;
  destination: string;
  country: string;
  date: string;
  time: string;
  type: string;
  score: number;
  status: TripStatus;
  summary: string;
}

export const previewTrips: PreviewTrip[] = [
  {
    id: "trip_demo_lahore",
    destination: "Lahore",
    country: "Pakistan",
    date: "2026-09-04",
    time: "08:30",
    type: "Road Trip",
    score: 82,
    status: "Good Conditions",
    summary: "Clear morning window with light winds and stable visibility.",
  },
  {
    id: "trip_demo_swat",
    destination: "Swat Valley",
    country: "Pakistan",
    date: "2026-09-12",
    time: "06:00",
    type: "Hiking",
    score: 61,
    status: "Moderate Risk",
    summary: "Afternoon showers likely on higher trail sections.",
  },
  {
    id: "trip_demo_murree",
    destination: "Murree",
    country: "Pakistan",
    date: "2026-09-20",
    time: "14:00",
    type: "Family",
    score: 38,
    status: "High Risk",
    summary: "Thunderstorm cell and reduced visibility on the approach road.",
  },
  {
    id: "trip_demo_dubai",
    destination: "Dubai",
    country: "UAE",
    date: "2026-10-02",
    time: "22:15",
    type: "Flight",
    score: 74,
    status: "Good Conditions",
    summary: "Hot but stable; night departure avoids peak heat load.",
  },
];

export const previewHourly = [
  { time: "06:00", temp: 24, rain: 5, wind: 8 },
  { time: "08:00", temp: 27, rain: 8, wind: 10 },
  { time: "10:00", temp: 31, rain: 12, wind: 14 },
  { time: "12:00", temp: 34, rain: 22, wind: 18 },
  { time: "14:00", temp: 35, rain: 38, wind: 21 },
  { time: "16:00", temp: 33, rain: 44, wind: 19 },
  { time: "18:00", temp: 30, rain: 26, wind: 15 },
  { time: "20:00", temp: 27, rain: 14, wind: 11 },
];

export const previewDaily = [
  { day: "Mon", high: 35, low: 24, rain: 20 },
  { day: "Tue", high: 34, low: 25, rain: 35 },
  { day: "Wed", high: 32, low: 24, rain: 55 },
  { day: "Thu", high: 33, low: 23, rain: 25 },
  { day: "Fri", high: 36, low: 25, rain: 10 },
  { day: "Sat", high: 37, low: 26, rain: 5 },
  { day: "Sun", high: 34, low: 24, rain: 18 },
];

export interface PreviewAlert {
  id: string;
  category: string;
  severity: RiskLevel;
  destination: string;
  date: string;
  condition: string;
  action: string;
}

export const previewAlerts: PreviewAlert[] = [
  {
    id: "alert_1",
    category: "Heavy Rain",
    severity: "high",
    destination: "Murree",
    date: "20 Sep 2026",
    condition: "45–60 mm rainfall expected between 13:00 and 19:00.",
    action: "Shift departure to the morning window or postpone by one day.",
  },
  {
    id: "alert_2",
    category: "Strong Winds",
    severity: "moderate",
    destination: "Swat Valley",
    date: "12 Sep 2026",
    condition: "Gusts up to 48 km/h along exposed ridge sections.",
    action: "Secure roof loads and avoid ridge trails after 15:00.",
  },
  {
    id: "alert_3",
    category: "Extreme Heat",
    severity: "moderate",
    destination: "Dubai",
    date: "02 Oct 2026",
    condition: "Feels-like temperature peaking near 46°C.",
    action: "Travel after sunset and carry 1L water per person per two hours.",
  },
];

export const alertCategories = [
  "Heavy Rain",
  "Strong Winds",
  "Thunderstorms",
  "Extreme Heat",
  "Snow",
  "Poor Visibility",
];

export const tripTypes = [
  "Road Trip",
  "Flight",
  "Hiking",
  "Business",
  "Family",
  "Adventure",
  "Other",
];

export const preferenceOptions = [
  { value: "avoid-rain", label: "Avoid rain" },
  { value: "avoid-extreme-heat", label: "Avoid extreme heat" },
  { value: "avoid-strong-winds", label: "Avoid strong winds" },
  { value: "prefer-cooler-weather", label: "Prefer cooler weather" },
  { value: "prefer-clear-skies", label: "Prefer clear skies" },
] as const;
