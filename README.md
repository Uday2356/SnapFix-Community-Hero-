# 📸 SnapFix — Community Hero
> **Hyperlocal Problem Solver for Smart Citizens & Accountable Cities**
>
> Deployed Link = https://snapfix-470674749585.asia-southeast1.run.app 

---

## 📌 1. Project Title & Tagline
### **SnapFix — Community Hero**
> *"Power to the Pavement: Empowering everyday citizens to snap, report, and track civic hazards with dynamic authority resolution loops."*

---

## 📖 2. Project Overview
**SnapFix** is a next-generation, mobile-first civic tech application designed to bridge the historical gap between local government departments and the residents they serve. 

Built with low-friction workflows at its core, SnapFix lets community members immediately capture and report municipal hazards—such as dangerous potholes, hazardous garbage piles, overflowing sewage, and broken streetlights. It replaces bureaucratic paperwork with instant visual reporting, real-time progress timelines, and an interactive digital vector map.

By aligning individual civic contributions with a rewarding point-based token economy, SnapFix transforms passive complaining into active, crowd-solved neighborhood stewardship.

---

## ⚠️ 3. Problem Statement
Modern cities suffer from three compounding civic bottlenecks:
1. **The Bureaucratic Black Hole**: Traditional civic complaint systems are notoriously slow, confusing, and lack transparency. Once a resident files a report, they rarely receive real-time status updates on if, when, or how the issue is being resolved.
2. **Citizen Disengagement (The Bystander Effect)**: Without incentives or visible collective action, residents become desensitized to urban decay. When reporting feels like shouting into a void, community engagement drops to zero.
3. **Operational Blindspots**: Municipal emergency crews often lack synchronized geolocation coordinates, visual severity indicators, and categorized urgency metrics, resulting in highly inefficient resource routing.

---

## 💡 4. Solution Overview
**SnapFix** resolves these challenges through a unified client platform featuring:
* **Frictionless Entrance**: A rapid, single-click Guest/Judge Bypass mode that skips cumbersome authentication so testing and reporting can begin instantly.
* **Modern Aesthetic Interface**: A clean, highly immersive dark-slate user interface built around negative space and intuitive, responsive micro-animations that maximize visibility in high-stress real-world situations.
* **Action-Oriented Tracking**: Clear geographical mapping, live citizen feeds, and instant, gamified visual confirmation showing municipal dispatch alignment.

---

## 🌟 5. Core Features

### 📸 5.1. Quick Issue Reporting (Camera Upload & Categorization)
* Capture or drop-in localized photos of community hazards.
* Dynamic categorization (Roads/Potholes, Waste/Garbage, Water/Sewage, Streetlights, Security/Hazards).
* Automated coordinate pinpointing and description tagging.

### 🗺️ 5.2. Real-time Interactive Neighborhood Feed
* Scroll through an elegantly structured, localized live activity log of all community alerts.
* Interactive social support structures: Upvote urgent issues to boost municipal priority weight.
* Live filter mechanics to isolate specific problems by category (e.g., viewing only electrical or sewage reports).

### ⚡ 5.3. One-Click Guest Mode & Judge Bypass
* Instantaneous testing interface explicitly optimized for hackathon evaluation.
* Skip username/password requirements instantly with mock profiles to preview immediate interactions.

### 🏆 5.4. Civic Impact Hub (Leaderboard, Points, & Rewards)
* Earn **Hero Points** for every verified issue report and active community vote.
* Dynamic user levels (e.g., "Civic Champion") reflected instantly on profile badges.
* Integrated digital marketplace to swap accumulated points for verified local merchant discount coupons.

### 🚚 5.5. Smart Logistics Route Tracker
* Interactive geographic map utilizing localized custom SVG tracking.
* High-fidelity progress timeline showing actual step-by-step dispatch workflow stages (*Reported ➡️ Verified ➡️ In Progress ➡️ Resolved*).

---

## 🛠️ 6. Tech Stack
The SnapFix codebase is built using a modern, lightweight, and blazingly fast technology stack:

* **Frontend Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (Strict typing for robust state and callback handling).
* **Styling & Theme**: [Tailwind CSS v4](https://tailwindcss.com/) (Premium utility classes, responsive grid architectures, and fluid animations).
* **Build System & Dev Server**: [Vite](https://vitejs.dev/) (Ultra-fast Hot Module Replacement and production bundling).
* **Iconography**: [Lucide React](https://lucide.dev/) (Sleek, high-contrast, scalable vector icons).
* **Animations**: [Motion](https://motion.dev/) (Staggered list entrances and micro-interaction transitions).

---

## 📐 7. System Architecture & Workflow
The diagram below illustrates the unified workflow from citizen photo-capture to municipal routing and rewarding:

```text
  ┌────────────────────────┐
  │  Citizen Snaps Photo   │◄────────────────────────────────┐
  └───────────┬────────────┘                                 │
              │                                              │
              ▼                                              │
  ┌────────────────────────┐                                 │
  │  AI Verification/Tag   │                                 │
  │  (Location & Category) │                                 │
  └───────────┬────────────┘                                 │
              │                                              │
              ▼                                              │
  ┌────────────────────────┐                                 │  [5. Civic Reward Loop]
  │ Local Feed & Dashboard │                                 │  • Earns Hero Points
  │ (Priority Upvotes)     │                                 │  • Unlocks Coupons
  └───────────┬────────────┘                                 │  • Rises in Leaderboard
              │                                              │
              ▼                                              │
  ┌────────────────────────┐                                 │
  │ Municipal Admin Portal │                                 │
  │ (Urgency Assessment)   │                                 │
  └───────────┬────────────┘                                 │
              │                                              │
              ▼                                              │
  ┌────────────────────────┐                                 │
  │ Dispatch Crew Assigned │─────────────────────────────────┘
  │ (Real-time GPS Tracking│
  │    & SVG Route Map)    │
  └────────────────────────┘
```

---

## 🖼️ 8. User Interface Showcase

Below are visual layouts representing key screens in the SnapFix platform:

### 🔒 8.1. Auth & Welcome Screen
```text
┌────────────────────────────────────────────────────────┐
│                      SNAPFIX                           │
│        [ Google Sign-In ]     [ Guest Access ]         │
│                                                        │
│  "Empowering everyday citizens to restore cities."     │
└────────────────────────────────────────────────────────┘
```

### 📋 8.2. Interactive Neighborhood Dashboard
```text
┌────────────────────────────────────────────────────────┐
│  [Report Tab]    [Dashboard Tab]    [Leaderboard Tab]   │
│ ┌────────────────────────────────────────────────────┐ │
│ │  🔥 Live Issue Alert: Pothole on NH-25              │ │
│ │  Status: 🚚 Dispatching Crew (ETA: 45 min)         │ │
│ │  [ ▲ Upvote (42) ]                  [ 💬 Comment ] │ │
│ └────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

### 🎁 8.3. Civic Impact Hub & Marketplace
```text
┌────────────────────────────────────────────────────────┐
│  My Wallet: 340 Hero Points      Level: Civic Guardian │
│ ┌────────────────────────────────────────────────────┐ │
│ │  [🎁 Claim Reward] 20% Off Local Organic Bakery    │ │
│ │  Cost: 100 Points                                  │ │
│ └────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

---

## ⚡ 9. Getting Started

To run SnapFix locally, follow these simple steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/snapfix.git
   cd snapfix
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser to the local address displayed in the terminal.

4. **Build the production bundle**:
   ```bash
   npm run build
   ```

---

*Designed and engineered with passion for sustainable urban development.*  
**SnapFix — Make your voice visible.**
