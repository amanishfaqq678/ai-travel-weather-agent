# Nova Travel AI

Build a complete, premium, futuristic MULTI-PAGE web application called:

AI TRAVEL WEATHER AGENT

==================================================

IMPORTANT — FRONTEND ONLY

==================================================

This task is primarily for building the FRONTEND/UI.

Do NOT recreate or replace the backend.

The AI/weather orchestration will exist separately through n8n.

Do NOT build fake backend logic.

Do NOT expose API keys.

Do NOT create fake WeatherAPI results.

Do NOT create fake OpenAI responses.

Do NOT create fake Vapi functionality.

Instead, create a professional frontend architecture with clean API/service integration points so the real backend can be connected later.

The final result should feel like a REAL premium AI travel technology product, not a university assignment or basic weather website.

==================================================

TECH STACK

==================================================

Use this technology stack:

- Next.js

- React

- JavaScript

- Tailwind CSS

Use modern React component architecture.

Use Next.js routing for the multi-page application.

Use Tailwind CSS as the primary styling system.

Use Framer Motion for subtle premium animations and transitions where appropriate.

Use a modern icon library such as Lucide Icons.

Do not introduce unnecessary frameworks or libraries.

Keep the code clean, modular, reusable, and easy to continue developing in VS Code.

==================================================

CORE PRODUCT

==================================================

Product name:

AI Travel Weather Agent

The product combines:

AI

+

Real-time weather

+

Travel intelligence

+

Automation

+

Voice AI

The user should be able to:

- plan a trip

- search destinations

- view live weather

- analyze travel conditions using AI

- receive a Travel Score

- understand weather risks

- receive recommendations

- save trips

- view trip history

- manage weather alerts

- chat with an AI travel assistant

- access a voice AI interface

- eventually make/receive AI calls

The product should feel intelligent throughout the entire experience.

==================================================

DESIGN DIRECTION

==================================================

Create a PREMIUM DARK FUTURISTIC DESIGN.

Visual direction:

- cinematic

- futuristic

- elegant

- premium

- sophisticated

- AI-focused

- travel-tech

- modern SaaS

- technically advanced

- minimal but visually rich

Think of the visual quality of a high-end AI startup/product website combined with a premium travel dashboard.

It should have the polish of a professional startup product.

It should NOT look like:

- a student assignment

- a basic weather app

- a generic dashboard template

- a simple chatbot

- a normal portfolio website

- an old Bootstrap website

- a cheap neon website

- an overly colorful SaaS template

==================================================

COLOR SYSTEM

==================================================

Primary:

Deep black / near-black

Secondary:

Dark navy / deep blue-black

Accent colors:

Electric purple

Electric blue

Subtle cyan

Use sophisticated purple-to-blue gradients.

Example visual hierarchy:

Background:

#050507 / near-black

Panels:

very dark navy / charcoal

Primary accent:

electric purple

Secondary accent:

electric blue

Highlight:

subtle cyan

Text:

white / soft white

Secondary text:

muted gray

IMPORTANT:

Do NOT make the entire UI glow.

Use glow effects selectively for:

- AI elements

- buttons

- active states

- charts

- important metrics

- voice interface

- hero visual

The design should remain elegant and readable.

==================================================

TYPOGRAPHY

==================================================

Use a premium modern sans-serif font.

Typography should have:

- large cinematic hero headings

- strong section headings

- clean readable body text

- clear labels

- excellent spacing

- strong visual hierarchy

Avoid excessive oversized text.

==================================================

BACKGROUND / VISUAL LANGUAGE

==================================================

Create sophisticated backgrounds using:

- subtle gradients

- dark atmospheric backgrounds

- soft radial glows

- very subtle grid patterns

- faint particles where appropriate

- abstract AI/data visualizations

- blurred light effects

Avoid distracting backgrounds.

The UI must remain readable.

==================================================

GLASSMORPHISM

==================================================

Use subtle glassmorphism for selected cards and floating UI:

- translucent dark surfaces

- subtle borders

- background blur

- soft shadows

Do NOT turn every element into a glass card.

Use glass effects strategically.

==================================================

MOTION & ANIMATION

==================================================

Use Framer Motion for tasteful motion.

Examples:

- page transitions

- hero entrance animations

- card hover effects

- subtle floating elements

- chart animations

- AI loading states

- chatbot message appearance

- voice assistant animation

- smooth navigation transitions

Animations should feel:

smooth

premium

subtle

intentional

Avoid excessive bouncing, spinning, or distracting effects.

==================================================

RESPONSIVE DESIGN

==================================================

Build the entire application responsive.

Desktop:

premium spacious SaaS experience.

Tablet:

adapt layouts intelligently.

Mobile:

excellent mobile UX.

Requirements:

- no horizontal scrolling

- readable typography

- touch-friendly buttons

- responsive forms

- responsive cards

- mobile navigation

- full-screen mobile chatbot

- responsive charts

- responsive voice assistant

==================================================

GLOBAL NAVIGATION

==================================================

Create a premium navigation system.

Logo:

AI Travel Weather Agent

Navigation:

Home

Plan Trip

Live Weather

AI Insights

My Trips

Alerts

Voice AI

Right side:

AI Chat

Notifications

Profile

Use a modern floating/sticky navigation style.

On mobile:

Use a polished mobile navigation menu.

Navigation must actually work between all pages.

==================================================

PAGE 1 — HOME

==================================================

Create a cinematic premium landing page.

Hero headline:

"Travel Smarter With Weather Intelligence."

Supporting text:

"Plan every journey with real-time weather data and AI-powered travel recommendations."

Primary CTA:

"Plan a Trip"

Secondary CTA:

"Explore Weather"

Hero visual should communicate:

TRAVEL + WEATHER + AI

Create a futuristic visual such as:

- dark globe

- atmospheric weather layers

- glowing destination points

- travel route lines

- weather particles

- subtle data visualization

- AI scanning effect

Do not use a generic stock photo.

Below hero:

SECTION:

"Your Personal Travel Intelligence"

Feature cards:

01

AI Travel Analysis

02

Real-Time Weather

03

Smart Weather Alerts

04

Voice Travel Assistant

Then:

"How It Works"

Step 01:

Choose your destination

Step 02:

We retrieve real weather data

Step 03:

AI analyzes travel conditions

Step 04:

Receive a practical recommendation

Then:

"Intelligence At A Glance"

Show example metrics:

Travel Score

Rain Risk

Wind Risk

Visibility

Temperature

Best Travel Time

Then a premium CTA:

"Plan Your Next Journey"

==================================================

PAGE 2 — PLAN TRIP

==================================================

This is one of the most important pages.

Create a premium travel planning interface.

Title:

"Plan Your Trip"

Subtitle:

"Tell us where you're going. We'll tell you what the weather means for your journey."

Form:

Destination

Travel Date

Travel Time

Trip Type

Preferences

Trip Types:

Road Trip

Flight

Hiking

Business

Family

Adventure

Other

Preferences:

Avoid rain

Avoid extreme heat

Avoid strong winds

Prefer cooler weather

Prefer clear skies

Primary CTA:

"Analyze Trip"

Loading state:

"Analyzing travel conditions..."

Create professional validation.

Prevent duplicate submissions.

Handle loading, success, and errors.

The frontend should be ready to POST to the existing n8n webhook.

Environment variable:

NEXT_PUBLIC_N8N_WEATHER_WEBHOOK_URL

Request structure:

{

  "location": "<destination>",

  "tripId": "<trip id>",

  "context": {

    "travelDate": "<date>",

    "travelTime": "<time>",

    "tripType": "<trip type>",

    "preferences": "<preferences>"

  }

}

Create a clean service layer.

For example:

src/services/travelWeatherApi.js

Do not scatter API requests throughout components.

==================================================

PAGE 3 — LIVE WEATHER

==================================================

Create a premium weather intelligence dashboard.

Search destination.

Show:

Location

Country

Temperature

Feels Like

Condition

Humidity

Wind

Visibility

UV

Last Updated

Forecast:

Hourly Forecast

Daily Forecast

Rain Probability

Wind

Humidity

High / Low

Sunrise

Sunset

Use elegant charts and data visualization.

Make the page feel like professional weather intelligence software.

Do not hardcode fake weather once backend integration is connected.

==================================================

PAGE 4 — AI INSIGHTS

==================================================

Create a dedicated AI decision-support page.

Header:

"AI Travel Insights"

Large Travel Score:

82 / 100

Status:

"Good Conditions"

Sections:

Weather Summary

Travel Recommendation

Best Travel Time

Risk Analysis

What To Pack

What To Avoid

Risk cards:

Rain Risk

Wind Risk

Visibility Risk

Temperature Risk

Use visual severity indicators.

The design should feel like an AI decision-support system.

==================================================

PAGE 5 — MY TRIPS

==================================================

Create a premium trip management dashboard.

Header:

"My Trips"

CTA:

"Plan New Trip"

Trip cards:

Destination

Travel Date

Travel Time

Trip Type

Travel Score

Weather Status

Statuses:

Good Conditions

Moderate Risk

High Risk

Include:

Search

Filter

Sort

Empty state:

"No trips yet"

CTA:

"Plan Your First Trip"

Prepare this page for future Django/database integration.

Do not pretend data is persistent until backend integration exists.

==================================================

PAGE 6 — TRIP DETAILS

==================================================

Create a detailed trip intelligence page.

Show:

Destination

Trip date

Travel time

Trip type

Large Travel Score

Weather overview

Forecast

AI recommendation

Risk analysis

Best travel time

Packing recommendations

Things to avoid

Weather timeline

Actions:

Refresh Analysis

Save Trip

Set Alert

Use a premium dashboard layout.

==================================================

PAGE 7 — WEATHER ALERTS

==================================================

Create:

"Weather Alerts"

Alert categories:

Heavy Rain

Strong Winds

Thunderstorms

Extreme Heat

Snow

Poor Visibility

Alert card:

Severity

Destination

Date

Condition

Recommended Action

Create:

"Alert Preferences"

Allow users to configure conditions they care about.

Include professional empty states.

==================================================

PAGE 8 — VOICE AI

==================================================

Create a futuristic voice assistant interface.

Title:

"Talk To Your Travel Assistant"

Subtitle:

"Ask about destinations, weather, and travel conditions using your voice."

Central visual:

AI orb / circular interface

Include:

Listening

Thinking

Speaking

Idle

Create:

- animated waveform

- microphone button

- transcript area

- assistant response area

Example prompts:

"What's the weather in Lahore tomorrow?"

"Should I travel to Swat this weekend?"

"What's the best time to leave?"

IMPORTANT:

This is frontend UI only.

Do NOT fake Vapi functionality.

Prepare the interface for future real Vapi integration.

==================================================

PAGE 9 — AI CHATBOT

==================================================

Create a premium AI chatbot experience.

The chatbot should be accessible globally.

Desktop:

Floating chat panel.

Mobile:

Full-screen chat.

Include:

AI avatar

Message bubbles

Typing indicator

Input field

Send button

Microphone button

Suggested prompts

Suggested questions:

"Should I travel tomorrow?"

"What's the weather in Islamabad?"

"Best time to travel to Murree?"

"Will rain affect my road trip?"

Create a sophisticated AI conversation experience.

Use subtle purple/blue AI glow.

Do not generate fake real-world weather responses.

Create a clean service layer so the chatbot can later communicate with n8n/OpenAI.

==================================================

PAGE 10 — AI CALLS

==================================================

Create a future-ready AI Calls management page.

Sections:

Inbound AI Calls

Outbound AI Calls

Call History

Statuses:

Completed

Missed

Scheduled

In Progress

Include:

"Start AI Call"

Do not fake actual calls.

Prepare UI for future Vapi integration.

==================================================

PAGE 11 — SETTINGS

==================================================

Create a premium settings page.

Sections:

Profile

Travel Preferences

Weather Preferences

Notifications

Alert Settings

AI Preferences

Examples:

Preferred temperature

Weather conditions to avoid

Default trip type

Notification preferences

==================================================

PAGE 12 — ABOUT

==================================================

Create a premium About page.

Explain that the platform combines:

AI

Weather Intelligence

Travel Planning

Automation

Voice Interaction

Technology section:

Next.js

React

JavaScript

Tailwind CSS

OpenAI GPT-4.1

WeatherAPI

n8n

Vapi

FastAPI

Django

Do not claim features are production-ready if they are still being integrated.

==================================================

AI CHAT EXPERIENCE

==================================================

AI should feel like a core product feature.

Create:

- global floating AI button

- expandable chat

- premium message UI

- typing indicator

- suggested prompts

- microphone button

- clear conversation

- responsive mobile experience

AI visual identity:

purple + blue

subtle glow

dark glass panel

==================================================

COMPONENT ARCHITECTURE

==================================================

Create reusable components such as:

Navbar

MobileNav

Footer

AIChat

AIChatButton

ChatMessage

WeatherCard

ForecastCard

TravelScore

RiskCard

TripCard

TripForm

WeatherChart

AlertCard

VoiceAssistant

LoadingState

ErrorState

EmptyState

MetricCard

Modal

Badge

Avoid duplicated UI.

Keep components modular.

==================================================

API ARCHITECTURE

==================================================

Create:

src/services/

Example:

travelWeatherApi.js

Use:

NEXT_PUBLIC_N8N_WEATHER_WEBHOOK_URL

The frontend should send:

POST

{

  "location": "...",

  "tripId": "...",

  "context": {

    "travelDate": "...",

    "travelTime": "...",

    "tripType": "...",

    "preferences": [...]

  }

}

Expected response concept:

{

  "success": true,

  "tripId": "...",

  "location": "...",

  "weather": {},

  "analysis": {}

}

Handle:

Loading

Success

400 errors

502 errors

Network errors

Timeouts

Empty responses

Display professional user-friendly error messages.

==================================================

SECURITY

==================================================

NEVER expose:

OpenAI API keys

WeatherAPI keys

Vapi private keys

n8n credentials

The frontend should communicate with the backend/orchestration layer.

Only public configuration such as the webhook URL may exist in frontend environment variables.

==================================================

CODE QUALITY

==================================================

Use:

Next.js

React

JavaScript

Tailwind CSS

Write clean reusable code.

Use semantic HTML.

Use accessible controls.

Use keyboard navigation.

Maintain consistent spacing.

Avoid unnecessary dependencies.

Avoid duplicated code.

Keep the project easy to continue developing in VS Code.

==================================================

FINAL DESIGN QUALITY

==================================================

Before finishing, review the entire application as if it were being launched by a serious AI startup.

Check:

- visual hierarchy

- spacing

- typography

- responsive design

- navigation

- animations

- accessibility

- loading states

- error states

- empty states

- forms

- chatbot

- voice interface

- charts

- consistency

- button states

- hover states

- mobile experience

Every page must feel like part of ONE product.

Do not create twelve unrelated page designs.

Maintain one cohesive visual language.

The final website should feel:

PREMIUM

FUTURISTIC

DARK

INTELLIGENT

TRAVEL-TECH

AI-POWERED

PROFESSIONAL

The final visual identity must strongly use:

BLACK + PURPLE + BLUE

with subtle cyan highlights.

The result should be impressive enough for a professional internship/final-project demonstration while remaining usable and technically maintainable.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ae16a1f2-122d-4e98-9bea-ccb1324ac9c8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
