# 🛠️ SnapFix AI Engineering & Prompt Guide (PROMPT.md)
> **Engineering System Rules, UI/UX Style Guardrails, and Prompt Blueprints for LLM Assistants**

This file serves as the definitive engineering prompt guide and context file for Google AI Studio or any LLM-based coding assistant working on the **SnapFix** codebase. It documents the exact system rules, stylistic guardrails, and feature context definitions required to maintain code quality, UI consistency, and functional integrity.

---

## 🧠 1. System Role Definition & AI Guidelines
When modifying, debugging, or extending the **SnapFix** application, any AI assistant **MUST** adhere to the following principles:

*   **Role**: Act as an expert Senior Full-Stack React & TypeScript Engineer with a flawless eye for modern digital design.
*   **Architecture First**: Prioritize clean state management. Keep `App.tsx` structured. Extract reusable sub-components into modular files under `/src/components/` (e.g., `CivicMap.tsx`) rather than consolidating all logic into a single unreadable file.
*   **Strict Type Safety**: Ensure every helper function, state variable, and callback is explicitly typed in TypeScript. Never use `any` unless absolutely unavoidable. All enum values must be standard TS enums (no `const enum`).
*   **Respect Existing Scope**: Never implement unsolicited external APIs or background server routes unless requested. The app runs as a highly polished, responsive client-side SPA with local persistence.

---

## 🎨 2. UI/UX Style Guardrails & CSS Specifications
Every visual interface in SnapFix is built with intentional aesthetic styling rather than generic defaults. Maintain these exact CSS utility standards:

### 🌌 2.1. Color Palette & Backgrounds
*   **The Slate-Velvet Canvas**: The standard backdrop uses deep charcoal grays and midnight tones with occasional rich velvet highlights:
    *   Main Gradient Header: `bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900`
    *   Standard Card Background (Light/Dark Switch): High contrast. Under `darkVision` mode, use `bg-slate-900/80 border-slate-800/60`. Under light mode, use clean, crisp whites `bg-white border-slate-200/80`.
*   **Accent Glows**: Accent elements should utilize soft, high-contrast neon highlights (predominantly **Teal** and **Sky Blue**):
    *   Teal: `text-teal-400`, `bg-teal-500`
    *   Sky Blue: `text-blue-400`, `bg-blue-500`

### 🧪 2.2. Glassmorphic Card Styling (`.glass-card`)
When creating widgets or dashboard overlays, apply subtle glassmorphism:
```html
<div className="backdrop-blur-md bg-slate-900/60 border border-slate-800/80 rounded-2xl shadow-xl shadow-slate-950/20">
  {content}
</div>
```

### 💫 2.3. Micro-Interactions & Motion
*   All list items, modal pop-ups, and active route transitions must use smooth exit/entrance animations.
*   Apply the custom class `animate-premium-fade` for entry transitions.
*   Interactive buttons must incorporate subtle scale-down feedback: `active:scale-95 transition-all duration-150`.

---

## 📝 3. Core Feature Prompts Compilation
Below are the reference prompts to be passed to LLMs when iterating on specific modules of the application.

### 📋 3.1. Core Feed & Filtering Prompt
> *"Modify the dashboard feed so citizens can filter the reported issues dynamically based on status indicators. Filter buttons should support 'All', 'Reported', 'Verified', and 'Resolved' states. When a filter is selected, apply a staggered list animation to the matching items. Ensure that status badges are color-coded: Yellow for Reported, Orange for Verified, and Emerald Green for Resolved."*

### 🏆 3.2. Vibe2Ship Hackathon Civic Impact Expansion Prompt
> *"Enhance the Civic Impact Hub. Users should see an elegant high-contrast card showing their accumulated Hero Points and dynamic tier badges (e.g., 'Civic Hero', 'City Guardian'). Connect this wallet interface to a Marketplace module where users can exchange points for real local discount vouchers. Ensure voucher claim actions trigger animated success modals and deduct points immediately from the client state."*

### 🚚 3.3. Logistics Route Dispatch & Map Timeline Prompt
> *"Maintain the interactive digital vector map. When an issue pin is selected, display a responsive logistics drawer illustrating actual municipal progress. The progress bar must show a 4-step vertical or horizontal timeline: [1] Report Registered ➡️ [2] Spot Verified ➡️ [3] Crew Dispatched (With approximate ETA) ➡️ [4] Issue Resolved. Update coordinates using a custom scaling calculation mapping coordinates directly into SVG space."*

---

## 🚫 4. Rules for Extension & Bloat Prevention
As SnapFix continues to scale, developers must observe strict scope boundaries to keep the app clean, accessible, and high-performing:

1.  **Single-View Priority**: For simple visual components, prevent deep nesting. Keep layouts simple, placing high-density bento grid widgets only on large desktop screens (`lg:` and `xl:` break-points).
2.  **Strict Anti-AI-Slop Rules**:
    *   **No Dummy System Logs**: Do not place fake background terminal outputs (like `SYSTEM_ONLINE: 1`) or telemetry lines in the headers or footers. The user interface must look elegant, human-readable, and highly professional.
    *   **Keep Outer Boundaries Clean**: Cards must sit on an elegant, clutter-free slate canvas. Do not fill the margins of the application with unsolicited layout rules, indicators, or system credit lines.
3.  **Human-Centered Labels**: Avoid overly dramatic labels. Button text must be direct, literal, and action-oriented (e.g., Use *"Call Emergency"* instead of *"Activate Tactical Distress Beacon"*).

---

*This guide ensures that any LLM agent or developer can pick up the SnapFix project and immediately output clean, styled, and structurally sound code matching the creator's vision.*
