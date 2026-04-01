import { useState } from "react";
import FluidElement from "./components/FluidElement";

// ─── Easing options ───────────────────────────────────────────────────────────

const easingOptions = [
  { id: "smooth", label: "Smooth" },
  { id: "snappy", label: "Snappy" },
  { id: "spring", label: "Spring" },
  { id: "ease-in-out", label: "Ease in-out" },
  { id: "linear", label: "Linear" },
] as const;

type EasingOption = (typeof easingOptions)[number]["id"];

// ─── Height demo data ─────────────────────────────────────────────────────────

const heightCards = [
  {
    id: "notification",
    label: "Notification",
    content: (isDark: boolean) => (
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center shrink-0 text-white text-xs font-semibold">
          JL
        </div>
        <div className="space-y-0.5 min-w-0">
          <p
            className={`text-sm font-medium leading-tight ${isDark ? "text-gray-50" : "text-gray-900"}`}
          >
            Jordan Lee
          </p>
          <p
            className={`text-xs ${isDark ? "text-gray-100" : "text-gray-500"}`}
          >
            Liked your post
          </p>
        </div>
        <span
          className={`text-xs ml-auto shrink-0 ${isDark ? "text-gray-100" : "text-gray-200"}`}
        >
          2m
        </span>
      </div>
    ),
  },
  {
    id: "thread",
    label: "Thread",
    content: (isDark: boolean) => (
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center shrink-0 text-white text-xs font-semibold">
            AS
          </div>
          <div className="space-y-1 min-w-0">
            <p
              className={`text-sm font-medium ${isDark ? "text-gray-50" : "text-gray-900"}`}
            >
              Alex S.
            </p>
            <p
              className={`text-xs leading-relaxed ${isDark ? "text-gray-100" : "text-gray-500"}`}
            >
              Left a comment on your PR — "This looks great, just one nit."
            </p>
          </div>
          <span
            className={`text-xs ml-auto shrink-0 ${isDark ? "text-gray-100" : "text-gray-200"}`}
          >
            5m
          </span>
        </div>
        <div
          className={`ml-11 pl-3 border-l text-xs leading-relaxed ${isDark ? "border-white/10 text-gray-200" : "border-black/10 text-gray-200"}`}
        >
          Consider extracting this into a custom hook for reuse across the
          codebase.
        </div>
      </div>
    ),
  },
  {
    id: "activity",
    label: "Activity",
    content: (isDark: boolean) => (
      <div className="space-y-3">
        {[
          {
            color: "bg-emerald-500",
            initials: "MR",
            name: "Maya R.",
            action: "Merged pull request",
            time: "1h",
          },
          {
            color: "bg-amber-500",
            initials: "TC",
            name: "Tom C.",
            action: "Opened issue #214",
            time: "2h",
          },
          {
            color: "bg-rose-500",
            initials: "PK",
            name: "Priya K.",
            action: "Closed milestone v2.1",
            time: "3h",
          },
        ].map(({ color, initials, name, action, time }) => (
          <div key={initials} className="flex items-center gap-3">
            <div
              className={`w-7 h-7 rounded-full ${color} flex items-center justify-center shrink-0 text-white text-xs font-semibold`}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <span
                className={`text-xs font-medium ${isDark ? "text-gray-100" : "text-gray-700"}`}
              >
                {name}
              </span>
              <span
                className={`text-xs ${isDark ? "text-gray-100" : "text-gray-200"}`}
              >
                {" "}
                · {action}
              </span>
            </div>
            <span
              className={`text-xs shrink-0 ${isDark ? "text-gray-100" : "text-gray-200"}`}
            >
              {time}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "short",
    label: "Short",
    content: (isDark: boolean) => (
      <p
        className={`text-sm leading-relaxed ${isDark ? "text-gray-100" : "text-gray-500"}`}
      >
        A single concise line of content.
      </p>
    ),
  },
  {
    id: "tall",
    label: "Tall",
    content: (isDark: boolean) => (
      <div className="space-y-3">
        <p
          className={`text-sm leading-relaxed ${isDark ? "text-gray-100" : "text-gray-500"}`}
        >
          Now we have quite a bit of content in this card.
        </p>
        <p
          className={`text-sm leading-relaxed ${isDark ? "text-gray-100" : "text-gray-500"}`}
        >
          A second paragraph, going a bit deeper into the topic at hand.
        </p>
        <p
          className={`text-sm leading-relaxed ${isDark ? "text-gray-100" : "text-gray-500"}`}
        >
          A third paragraph to really stretch things out and show the container
          grows without any snap or jump.
        </p>
        <div className="grid grid-cols-2 gap-2 mt-8">
          {["Design", "Engineering", "Animation", "DX"].map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-3 py-1 text-xs text-center border ${
                isDark
                  ? "bg-white/5 border-white/10 text-gray-200"
                  : "bg-black/5 border-black/10 text-gray-500"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
];

// ─── Width demo data ──────────────────────────────────────────────────────────

const widthSteps = [
  {
    id: "xs",
    label: "Pill",
    className: "w-32",
    content: (isDark: boolean) => (
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
        <span
          className={`text-xs font-medium whitespace-nowrap ${isDark ? "text-gray-100" : "text-gray-700"}`}
        >
          Active
        </span>
      </div>
    ),
  },
  {
    id: "sm",
    label: "Compact",
    className: "w-52",
    content: (isDark: boolean) => (
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
        <span
          className={`text-xs font-medium whitespace-nowrap ${isDark ? "text-gray-100" : "text-gray-700"}`}
        >
          1 service running
        </span>
      </div>
    ),
  },
  {
    id: "md",
    label: "Default",
    className: "w-72",
    content: (isDark: boolean) => (
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
        <span
          className={`text-xs font-medium whitespace-nowrap ${isDark ? "text-gray-100" : "text-gray-700"}`}
        >
          All systems operational
        </span>
      </div>
    ),
  },
  {
    id: "lg",
    label: "Wide",
    className: "w-96",
    content: (isDark: boolean) => (
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span
            className={`text-xs font-medium whitespace-nowrap ${isDark ? "text-gray-100" : "text-gray-700"}`}
          >
            All systems operational
          </span>
        </div>
        <span
          className={`text-xs whitespace-nowrap ${isDark ? "text-gray-100" : "text-gray-200"}`}
        >
          99.98% uptime
        </span>
      </div>
    ),
  },
  {
    id: "xl",
    label: "Full",
    className: "w-full",
    content: (isDark: boolean) => (
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span
            className={`text-xs font-medium whitespace-nowrap ${isDark ? "text-gray-100" : "text-gray-700"}`}
          >
            All systems operational
          </span>
        </div>
        <div className="flex items-center gap-3">
          {["API", "Web", "DB"].map((s) => (
            <div key={s} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span
                className={`text-xs whitespace-nowrap ${isDark ? "text-gray-100" : "text-gray-200"}`}
              >
                {s}
              </span>
            </div>
          ))}
        </div>
        <span
          className={`text-xs whitespace-nowrap ${isDark ? "text-gray-100" : "text-gray-200"}`}
        >
          99.98% uptime
        </span>
      </div>
    ),
  },
];

// ─── Both demo data ───────────────────────────────────────────────────────────

const bothCards = [
  {
    id: "pricing-starter",
    label: "Starter",
    width: "w-52",
    content: (isDark: boolean) => (
      <div className="space-y-3">
        <div>
          <p
            className={`text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-100" : "text-gray-200"}`}
          >
            Starter
          </p>
          <div className="flex items-baseline gap-1 mt-1">
            <span
              className={`text-2xl font-semibold ${isDark ? "text-gray-50" : "text-gray-900"}`}
            >
              $0
            </span>
            <span
              className={`text-xs ${isDark ? "text-gray-100" : "text-gray-200"}`}
            >
              /mo
            </span>
          </div>
        </div>
        <button
          className={`w-full text-xs py-1.5 rounded-lg border font-medium transition-colors ${isDark ? "border-white/10 text-gray-100 hover:bg-white/5" : "border-black/10 text-gray-600 hover:bg-black/5"}`}
        >
          Get started
        </button>
      </div>
    ),
  },
  {
    id: "pricing-pro",
    label: "Pro",
    width: "w-72",
    content: (isDark: boolean) => (
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <p
              className={`text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-100" : "text-gray-200"}`}
            >
              Pro
            </p>
            <div className="flex items-baseline gap-1 mt-1">
              <span
                className={`text-2xl font-semibold ${isDark ? "text-gray-50" : "text-gray-900"}`}
              >
                $19
              </span>
              <span
                className={`text-xs ${isDark ? "text-gray-100" : "text-gray-200"}`}
              >
                /mo
              </span>
            </div>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-500 font-medium">
            Popular
          </span>
        </div>
        <ul className="space-y-1.5">
          {["Unlimited projects", "10 team members", "Priority support"].map(
            (f) => (
              <li key={f} className="flex items-center gap-2">
                <svg
                  className="w-3.5 h-3.5 text-violet-400 shrink-0"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8l3.5 3.5L13 4.5" />
                </svg>
                <span
                  className={`text-xs ${isDark ? "text-gray-100" : "text-gray-500"}`}
                >
                  {f}
                </span>
              </li>
            ),
          )}
        </ul>
        <button className="w-full text-xs py-1.5 rounded-lg bg-violet-500 hover:bg-violet-400 text-white font-medium transition-colors">
          Upgrade to Pro
        </button>
      </div>
    ),
  },
  {
    id: "pricing-enterprise",
    label: "Enterprise",
    width: "w-80",
    content: (isDark: boolean) => (
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <p
              className={`text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-100" : "text-gray-200"}`}
            >
              Enterprise
            </p>
            <div className="flex items-baseline gap-1 mt-1">
              <span
                className={`text-2xl font-semibold ${isDark ? "text-gray-50" : "text-gray-900"}`}
              >
                Custom
              </span>
            </div>
          </div>
          <span
            className={`text-xs px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/25 font-medium ${
              isDark ? "text-amber-400" : "text-amber-500"
            }`}
          >
            Contact us
          </span>
        </div>
        <ul className="space-y-1.5">
          {[
            "Everything in Pro",
            "Unlimited team members",
            "SSO & SAML",
            "Dedicated SLA",
            "Custom contracts",
          ].map((f) => (
            <li key={f} className="flex items-center gap-2">
              <svg
                className="w-3.5 h-3.5 text-amber-400 shrink-0"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8l3.5 3.5L13 4.5" />
              </svg>
              <span
                className={`text-xs ${isDark ? "text-gray-100" : "text-gray-500"}`}
              >
                {f}
              </span>
            </li>
          ))}
        </ul>
        <button
          className={`w-full text-xs py-1.5 rounded-lg border font-medium transition-colors0 border-amber-500/30 ${
            isDark
              ? "text-amber-400 bg-amber-500/1 hover:bg-amber-500/20"
              : "text-white bg-amber-500 hover:bg-amber-400"
          }`}
        >
          Talk to sales
        </button>
      </div>
    ),
  },
  {
    id: "profile-compact",
    label: "Profile",
    width: "w-56",
    content: (isDark: boolean) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold shrink-0">
          EZ
        </div>
        <div className="min-w-0">
          <p
            className={`text-sm font-medium truncate ${isDark ? "text-gray-50" : "text-gray-900"}`}
          >
            Ezekiel N.
          </p>
          <p
            className={`text-xs truncate ${isDark ? "text-gray-100" : "text-gray-200"}`}
          >
            @ezekiel
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "profile-full",
    label: "Profile+",
    width: "w-80",
    content: (isDark: boolean) => (
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white font-semibold shrink-0">
            EZ
          </div>
          <div className="flex-1 min-w-0">
            <p
              className={`text-sm font-medium ${isDark ? "text-gray-50" : "text-gray-900"}`}
            >
              Ezekiel Nwoye
            </p>
            <p
              className={`text-xs ${isDark ? "text-gray-100" : "text-gray-200"}`}
            >
              @ezekiel · he/him
            </p>
            <p
              className={`text-xs mt-1 leading-relaxed ${isDark ? "text-gray-100" : "text-gray-500"}`}
            >
              Building tools that feel great to use.
            </p>
          </div>
        </div>
        <div
          className={`flex gap-4 pt-1 border-t ${isDark ? "border-white/[0.06]" : "border-black/[0.06]"}`}
        >
          {[
            ["142", "Following"],
            ["4.8k", "Followers"],
            ["38", "Projects"],
          ].map(([val, label]) => (
            <div key={label} className="text-center">
              <p
                className={`text-sm font-semibold ${isDark ? "text-gray-50" : "text-gray-900"}`}
              >
                {val}
              </p>
              <p
                className={`text-xs ${isDark ? "text-gray-100" : "text-gray-200"}`}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

// ─── Height demo B — FAQ accordion ───────────────────────────────────────────

const faqItems = [
  {
    id: "q1",
    label: "Q1",
    content: (isDark: boolean) => (
      <div className="space-y-2">
        <p
          className={`text-sm font-medium ${isDark ? "text-gray-50" : "text-gray-900"}`}
        >
          What is FluidElement?
        </p>
        <p
          className={`text-xs leading-relaxed ${isDark ? "text-gray-200" : "text-gray-500"}`}
        >
          A React component that animates height, width, or both when its
          content changes — with no dependencies.
        </p>
      </div>
    ),
  },
  {
    id: "q2",
    label: "Q2",
    content: (isDark: boolean) => (
      <div className="space-y-2">
        <p
          className={`text-sm font-medium ${isDark ? "text-gray-50" : "text-gray-900"}`}
        >
          Does it work with any content?
        </p>
        <p
          className={`text-xs leading-relaxed ${isDark ? "text-gray-200" : "text-gray-500"}`}
        >
          Yes. Wrap any children — text, cards, lists, forms. FluidElement
          detects size changes automatically and handles the rest. No configs.
        </p>
      </div>
    ),
  },
  {
    id: "q3",
    label: "Q3",
    content: (isDark: boolean) => (
      <div className="space-y-2">
        <p
          className={`text-sm font-medium ${isDark ? "text-gray-50" : "text-gray-900"}`}
        >
          How does it compare to Framer Motion?
        </p>
        <p
          className={`text-xs leading-relaxed ${isDark ? "text-gray-200" : "text-gray-500"}`}
        >
          Framer Motion is a full animation library. FluidElement is a single
          component that does one thing — animate height between content states.
          No layout proxies, no extra setup, no 100kb bundle.
        </p>
        <div className="flex gap-2 pt-1 flex-wrap">
          {["~2kb", "Zero deps", "No config"].map((t) => (
            <span
              key={t}
              className={`text-xs px-2 py-0.5 rounded-full border ${isDark ? "bg-white/5 border-white/10 text-gray-200" : "bg-black/5 border-black/10 text-gray-500"}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    ),
  },
];

// ─── Width demo B — search bar ────────────────────────────────────────────────

const searchStates = [
  {
    id: "idle",
    label: "Idle",
    className: "w-40",
    content: (isDark: boolean) => (
      <div className="flex items-center gap-2">
        <svg
          className={`w-3.5 h-3.5 shrink-0 ${isDark ? "text-gray-200" : "text-gray-400"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span
          className={`text-xs ${isDark ? "text-gray-200" : "text-gray-400"}`}
        >
          Search…
        </span>
      </div>
    ),
  },
  {
    id: "typing",
    label: "Typing",
    className: "w-72",
    content: (isDark: boolean) => (
      <div className="flex items-center gap-2">
        <svg
          className={`w-3.5 h-3.5 shrink-0 ${isDark ? "text-gray-200" : "text-gray-500"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span
          className={`text-xs ${isDark ? "text-gray-50" : "text-gray-900"}`}
        >
          FluidElement
        </span>
        <span className="w-px h-3.5 bg-gray-300 animate-pulse -ml-0.5" />
      </div>
    ),
  },
  {
    id: "results",
    label: "Results",
    className: "w-80",
    content: (isDark: boolean) => (
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-2">
          <svg
            className={`w-3.5 h-3.5 shrink-0 ${isDark ? "text-gray-200" : "text-gray-500"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span
            className={`text-xs ${isDark ? "text-gray-50" : "text-gray-900"}`}
          >
            FluidElement react
          </span>
        </div>
        {[
          "FluidElement on GitHub",
          "FluidElement docs",
          "FluidElement playground",
        ].map((r) => (
          <div
            key={r}
            className={`text-xs px-2 py-1 rounded-lg cursor-pointer ${isDark ? "hover:bg-white/5 text-gray-200" : "hover:bg-black/5 text-gray-600"}`}
          >
            {r}
          </div>
        ))}
      </div>
    ),
  },
];

// ─── Both demo B — settings panel ─────────────────────────────────────────────

const settingsPanels = [
  {
    id: "collapsed",
    label: "Collapsed",
    width: "w-64",
    content: (isDark: boolean) => (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDark ? "bg-white/8" : "bg-black/8"}`}
          >
            <svg
              className={`w-3.5 h-3.5 ${isDark ? "text-gray-200" : "text-gray-600"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
            </svg>
          </div>
          <span
            className={`text-sm font-medium ${isDark ? "text-gray-50" : "text-gray-900"}`}
          >
            Notifications
          </span>
        </div>
        <span
          className={`text-xs px-1.5 py-0.5 rounded-md ${isDark ? "bg-white/8 text-gray-200" : "bg-black/8 text-gray-500"}`}
        >
          Off
        </span>
      </div>
    ),
  },
  {
    id: "expanded",
    label: "Expanded",
    width: "w-80",
    content: (isDark: boolean) => (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDark ? "bg-white/8" : "bg-black/8"}`}
            >
              <svg
                className={`w-3.5 h-3.5 ${isDark ? "text-gray-200" : "text-gray-600"}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
              </svg>
            </div>
            <span
              className={`text-sm font-medium ${isDark ? "text-gray-50" : "text-gray-900"}`}
            >
              Notifications
            </span>
          </div>
          <span className="text-xs px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400">
            On
          </span>
        </div>
        <div
          className={`space-y-2 pt-2 border-t ${isDark ? "border-white/[0.06]" : "border-black/[0.06]"}`}
        >
          {["Email updates", "Push notifications", "Weekly digest"].map(
            (item) => (
              <div key={item} className="flex items-center justify-between">
                <span
                  className={`text-xs ${isDark ? "text-gray-200" : "text-gray-500"}`}
                >
                  {item}
                </span>
                <div
                  className={`w-7 h-4 rounded-full flex items-center px-0.5 ${isDark ? "bg-white/10" : "bg-black/10"}`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${isDark ? "bg-gray-400" : "bg-gray-500"}`}
                  />
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    ),
  },
  {
    id: "custom",
    label: "Custom",
    width: "w-96",
    content: (isDark: boolean) => (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDark ? "bg-white/8" : "bg-black/8"}`}
            >
              <svg
                className={`w-3.5 h-3.5 ${isDark ? "text-gray-200" : "text-gray-600"}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
              </svg>
            </div>
            <span
              className={`text-sm font-medium ${isDark ? "text-gray-50" : "text-gray-900"}`}
            >
              Notifications
            </span>
          </div>
          <span className="text-xs px-1.5 py-0.5 rounded-md bg-orange-500/15 text-orange-500">
            Custom
          </span>
        </div>
        <div
          className={`space-y-2 pt-2 border-t ${isDark ? "border-white/[0.06]" : "border-black/[0.06]"}`}
        >
          {[
            { label: "Email updates", on: true },
            { label: "Push notifications", on: false },
            { label: "Weekly digest", on: true },
            { label: "Security alerts", on: true },
          ].map(({ label, on }) => (
            <div key={label} className="flex items-center justify-between">
              <span
                className={`text-xs ${isDark ? "text-gray-200" : "text-gray-500"}`}
              >
                {label}
              </span>
              <div
                className={`w-7 h-4 rounded-full flex items-center px-0.5 transition-colors ${on ? "bg-emerald-500/30 justify-end" : isDark ? "bg-white/10" : "bg-black/10"}`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${on ? "bg-emerald-500" : isDark ? "bg-gray-400" : "bg-gray-500"}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

// ─── Shared UI ────────────────────────────────────────────────────────────────

function Tabs<T extends string>({
  options,
  value,
  onChange,
  isDark,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
  isDark: boolean;
}) {
  return (
    <div
      className={`flex gap-1 p-1 rounded-xl w-fit border flex-wrap ${isDark ? "bg-white/5 border-white/[0.08]" : "bg-black/5 border-black/[0.08]"}`}
    >
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
            value === opt.id
              ? isDark
                ? "bg-white text-black shadow"
                : "bg-gray-900 text-white shadow"
              : isDark
                ? "text-gray-300 hover:text-gray-100"
                : "text-gray-200 hover:text-gray-600"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function EasingPicker({
  value,
  onChange,
  isDark,
}: {
  value: EasingOption;
  onChange: (v: EasingOption) => void;
  isDark: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`text-xs font-mono shrink-0 ${isDark ? "text-gray-100" : "text-gray-200"}`}
      >
        easing
      </span>
      <div className="flex gap-1 flex-wrap">
        {easingOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`px-3 py-1 rounded-lg text-xs transition-all duration-150 cursor-pointer border ${
              value === opt.id
                ? isDark
                  ? "border-white/20 bg-white/8 text-white"
                  : "border-black/20 bg-black/8 text-gray-900"
                : isDark
                  ? "border-transparent text-gray-300 hover:text-gray-100"
                  : "border-transparent text-gray-200 hover:text-gray-600"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function DemoCard({
  number,
  title,
  description,
  isDark,
  children,
}: {
  number: string;
  title: string;
  description: string;
  isDark: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p
          className={`text-xs font-mono uppercase tracking-widest ${isDark ? "text-gray-100" : "text-gray-200"}`}
        >
          {number}
        </p>
        <h2
          className={`text-2xl font-semibold tracking-tight ${isDark ? "text-gray-50" : "text-gray-900"}`}
        >
          {title}
        </h2>
        <p
          className={`text-sm max-w-sm leading-relaxed ${isDark ? "text-gray-100" : "text-gray-200"}`}
        >
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}

function ThemeToggle({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200 cursor-pointer ${
        isDark
          ? "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
          : "border-black/10 bg-black/5 text-gray-500 hover:bg-black/10 hover:text-gray-800"
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="2" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [isDark, setIsDark] = useState(true);

  const [heightTab1, setHeightTab1] = useState(heightCards[0]!.id);
  const [heightTab2, setHeightTab2] = useState(faqItems[0]!.id);
  const [heightEasing, setHeightEasing] = useState<EasingOption>("spring");

  const [widthStep1, setWidthStep1] = useState(widthSteps[2]!.id);
  const [widthStep2, setWidthStep2] = useState(searchStates[0]!.id);
  const [widthEasing, setWidthEasing] = useState<EasingOption>("spring");

  const [bothCard1, setBothCard1] = useState(bothCards[0]!.id);
  const [bothCard2, setBothCard2] = useState(settingsPanels[0]!.id);
  const [bothEasing, setBothEasing] = useState<EasingOption>("spring");

  const activeHeight1 = heightCards.find((c) => c.id === heightTab1)!;
  const activeHeight2 = faqItems.find((c) => c.id === heightTab2)!;
  const activeWidth1 = widthSteps.find((s) => s.id === widthStep1)!;
  const activeWidth2 = searchStates.find((s) => s.id === widthStep2)!;
  const activeBoth1 = bothCards.find((c) => c.id === bothCard1)!;
  const activeBoth2 = settingsPanels.find((c) => c.id === bothCard2)!;

  const divider = (
    <div
      className={`w-full h-px ${isDark ? "bg-white/[0.1]" : "bg-black/[0.1]"}`}
    />
  );

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-[#0a0a0a]" : "bg-[#f7f7f7]"
      }`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Subtle background grid */}
      <div
        className={`fixed inset-0 pointer-events-none ${
          isDark ? "opacity-[0.03]" : "opacity-[0.05]"
        }`}
        style={{
          backgroundImage: isDark
            ? "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)"
            : "linear-gradient(rgba(0,0,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 py-20 space-y-24">
        {/* Header */}
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${isDark ? "border-white/10 bg-white/5 text-gray-200" : "border-black/10 bg-black/5 text-gray-500"}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Playground
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/Nwoye-Ezekiel/fluid-element"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200 cursor-pointer ${
                  isDark
                    ? "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                    : "border-black/10 bg-black/5 text-gray-500 hover:bg-black/10 hover:text-gray-800"
                }`}
                aria-label="GitHub profile"
              >
                <GitHubIcon size={16} />
              </a>
              <ThemeToggle
                isDark={isDark}
                onToggle={() => setIsDark((d) => !d)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <h1
              className={`text-5xl font-semibold tracking-tight leading-none ${isDark ? "text-gray-50" : "text-gray-900"}`}
            >
              FluidElement{" "}
              <span
                className={`text-2xl font-normal ${isDark ? "text-gray-400" : "text-gray-400"}`}
              >
                by Ezekiel
              </span>
            </h1>
            <p
              className={`max-w-md text-base leading-relaxed ${isDark ? "text-gray-100" : "text-gray-500"}`}
            >
              Wherever a div height would snap, it animates instead. No
              dependencies. No configuration. Just wrap.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <code
              className={`inline-block text-xs px-3 py-2 rounded-xl border font-mono ${isDark ? "bg-white/5 border-white/[0.08] text-gray-200" : "bg-black/5 border-black/[0.08] text-gray-500"}`}
            >
              {'<FluidElement animate="height">'}
            </code>
            <div className="flex items-center gap-2">
              {[
                {
                  label: "height",
                  color:
                    "bg-violet-500/15 border-violet-500/25 text-violet-400",
                },
                {
                  label: "width",
                  color: "bg-sky-500/15 border-sky-500/25 text-sky-400",
                },
                {
                  label: "both",
                  color:
                    "bg-emerald-500/15 border-emerald-500/25 text-emerald-400",
                },
              ].map(({ label, color }) => (
                <span
                  key={label}
                  className={`text-xs px-2.5 py-1 rounded-full border font-medium ${color}`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {divider}

        {/* Demo 1 — Height */}
        <DemoCard
          number="01"
          title="Animate height"
          description="Content changes height. The container follows — no snap, no jump."
          isDark={isDark}
        >
          <EasingPicker
            value={heightEasing}
            onChange={setHeightEasing}
            isDark={isDark}
          />
          <div className="flex flex-col gap-6">
            {/* Example A — Notification feed */}
            <div className="space-y-3">
              <p
                className={`text-xs font-mono ${isDark ? "text-gray-200" : "text-gray-400"}`}
              >
                Notification card
              </p>
              <Tabs
                options={heightCards}
                value={heightTab1}
                onChange={setHeightTab1}
                isDark={isDark}
              />
              <div
                className={`rounded-2xl border p-5 ${isDark ? "border-white/[0.08] bg-white/[0.02]" : "border-black/[0.08] bg-black/[0.02]"}`}
              >
                <FluidElement animate="height" easing={heightEasing}>
                  {activeHeight1.content(isDark)}
                </FluidElement>
              </div>
            </div>
            {/* Example B — FAQ accordion */}
            <div className="space-y-3">
              <p
                className={`text-xs font-mono ${isDark ? "text-gray-200" : "text-gray-400"}`}
              >
                FAQ accordion
              </p>
              <Tabs
                options={faqItems}
                value={heightTab2}
                onChange={setHeightTab2}
                isDark={isDark}
              />
              <div
                className={`rounded-2xl border p-5 ${isDark ? "border-white/[0.08] bg-white/[0.02]" : "border-black/[0.08] bg-black/[0.02]"}`}
              >
                <FluidElement animate="height" easing={heightEasing}>
                  {activeHeight2.content(isDark)}
                </FluidElement>
              </div>
            </div>
          </div>
          <p
            className={`text-xs font-mono ${isDark ? "text-gray-200" : "text-gray-400"}`}
          >
            {`<FluidElement animate="height" easing="${heightEasing}">`}
          </p>
        </DemoCard>

        {divider}

        {/* Demo 2 — Width */}
        <DemoCard
          number="02"
          title="Animate width"
          description="The container stretches or shrinks to a new width, animated."
          isDark={isDark}
        >
          <EasingPicker
            value={widthEasing}
            onChange={setWidthEasing}
            isDark={isDark}
          />
          <div className="flex flex-col gap-6">
            {/* Example A — Status bar */}
            <div className="space-y-3">
              <p
                className={`text-xs font-mono ${isDark ? "text-gray-200" : "text-gray-400"}`}
              >
                Status bar
              </p>
              <Tabs
                options={widthSteps}
                value={widthStep1}
                onChange={setWidthStep1}
                isDark={isDark}
              />
              <div
                className={`rounded-2xl border p-5 overflow-hidden ${isDark ? "border-white/[0.08] bg-white/[0.02]" : "border-black/[0.08] bg-black/[0.02]"}`}
              >
                <FluidElement
                  animate="width"
                  easing={widthEasing}
                  className={`${activeWidth1.className} rounded-xl border px-4 py-2.5 ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}
                >
                  {activeWidth1.content(isDark)}
                </FluidElement>
              </div>
            </div>
            {/* Example B — Search bar */}
            <div className="space-y-3">
              <p
                className={`text-xs font-mono ${isDark ? "text-gray-200" : "text-gray-400"}`}
              >
                Search bar
              </p>
              <Tabs
                options={searchStates}
                value={widthStep2}
                onChange={setWidthStep2}
                isDark={isDark}
              />
              <div
                className={`rounded-2xl border p-5 overflow-hidden ${isDark ? "border-white/[0.08] bg-white/[0.02]" : "border-black/[0.08] bg-black/[0.02]"}`}
              >
                <FluidElement
                  animate="width"
                  easing={widthEasing}
                  className={`${activeWidth2.className} rounded-xl border px-4 py-2.5 ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}
                >
                  {activeWidth2.content(isDark)}
                </FluidElement>
              </div>
            </div>
          </div>
          <p
            className={`text-xs font-mono ${isDark ? "text-gray-200" : "text-gray-400"}`}
          >
            {`<FluidElement animate="width" easing="${widthEasing}">`}
          </p>
        </DemoCard>

        {divider}

        {/* Demo 3 — Both */}
        <DemoCard
          number="03"
          title="Animate both"
          description="Width and height animate together. The container morphs to fit any content shape."
          isDark={isDark}
        >
          <EasingPicker
            value={bothEasing}
            onChange={setBothEasing}
            isDark={isDark}
          />
          <div className="flex flex-col gap-6">
            {/* Example A — Pricing card */}
            <div className="space-y-3">
              <p
                className={`text-xs font-mono ${isDark ? "text-gray-200" : "text-gray-400"}`}
              >
                Pricing card
              </p>
              <Tabs
                options={bothCards}
                value={bothCard1}
                onChange={setBothCard1}
                isDark={isDark}
              />
              <div
                className={`rounded-2xl border p-5 ${isDark ? "border-white/[0.08] bg-white/[0.02]" : "border-black/[0.08] bg-black/[0.02]"}`}
              >
                <FluidElement
                  animate="both"
                  easing={bothEasing}
                  className={`${activeBoth1.width} rounded-xl border p-4 ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}
                >
                  {activeBoth1.content(isDark)}
                </FluidElement>
              </div>
            </div>
            {/* Example B — Settings panel */}
            <div className="space-y-3">
              <p
                className={`text-xs font-mono ${isDark ? "text-gray-200" : "text-gray-400"}`}
              >
                Settings panel
              </p>
              <Tabs
                options={settingsPanels}
                value={bothCard2}
                onChange={setBothCard2}
                isDark={isDark}
              />
              <div
                className={`rounded-2xl border p-5 ${isDark ? "border-white/[0.08] bg-white/[0.02]" : "border-black/[0.08] bg-black/[0.02]"}`}
              >
                <FluidElement
                  animate="both"
                  easing={bothEasing}
                  className={`${activeBoth2.width} rounded-xl border p-4 ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}
                >
                  {activeBoth2.content(isDark)}
                </FluidElement>
              </div>
            </div>
          </div>
          <p
            className={`text-xs font-mono ${isDark ? "text-gray-200" : "text-gray-400"}`}
          >
            {`<FluidElement animate="both" easing="${bothEasing}">`}
          </p>
        </DemoCard>

        {divider}

        {/* Footer */}
        <div
          className={`flex items-center justify-between text-xs ${isDark ? "text-gray-100" : "text-gray-200"}`}
        >
          <span
            className={`font-medium ${isDark ? "text-gray-100" : "text-gray-500"}`}
          >
            FluidElement
          </span>
          <a
            href="https://github.com/Nwoye-Ezekiel"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 transition-colors duration-150 ${
              isDark
                ? "text-gray-300 hover:text-gray-100"
                : "text-gray-200 hover:text-gray-700"
            }`}
          >
            <GitHubIcon size={13} />
            <span>Ezekiel Nwoye</span>
          </a>
        </div>
      </div>
    </main>
  );
}
