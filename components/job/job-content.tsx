"use client";

import { useState } from "react";

type JobContentTabsProps = {
  description: string;
  taskInclude: string;
  occupations: string;
  other: string;
  t: (key: string) => string;
};

export default function JobContentTabs({ description, taskInclude, occupations, other, t }: JobContentTabsProps) {
  const tabs = [
    { id: "description", label: t("Description"), html: description },
    { id: "tasks", label: t("Tasks Include"), html: taskInclude },
    { id: "occupations", label: t("Occupations"), html: occupations },
    { id: "other", label: t("Other"), html: other },
  ].filter((tab) => tab.html.trim() !== "");

  const [activeTab, setActiveTab] = useState<string>("description");
  const current = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  if (!current) return null;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 sm:px-7">
        <div role="tablist" aria-label={t("Job information")} className="flex gap-6 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = current.id === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`job-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls="job-tab-panel"
                onClick={() => setActiveTab(tab.id)}
                className={`relative shrink-0 py-5 text-sm font-semibold transition-colors ${
                  isActive ? "text-[#485ea8]" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab.label}

                <span
                  className={`absolute inset-x-0 bottom-0 h-[3px] rounded-t-full transition-all ${
                    isActive ? "bg-[#485ea8]" : "bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div id="job-tab-panel" role="tabpanel" aria-labelledby={`job-tab-${current.id}`} className="p-5 sm:p-7">
        <div
          className="job-rich-text text-sm leading-7 text-slate-600 sm:text-base [&_li]:ml-5 [&_li]:list-disc [&_p]:mb-3 [&_strong]:text-slate-800 [&_ul]:mb-3"
          dangerouslySetInnerHTML={{ __html: current.html }}
        />
      </div>
    </section>
  );
}
