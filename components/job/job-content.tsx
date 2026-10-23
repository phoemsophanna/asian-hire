"use client";

import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

type JobContentTabsProps = {
  job: {
    description: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
  };
};

const tabs = [
  { id: "description", label: "Description" },
  { id: "responsibilities", label: "Responsibilities" },
  { id: "requirements", label: "Requirements" },
  { id: "benefits", label: "Benefits" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function JobContentTabs({
  job,
}: JobContentTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("description");

  const listContent: Partial<Record<TabId, string[]>> = {
    responsibilities: job.responsibilities,
    requirements: job.requirements,
    benefits: job.benefits,
  };

  const list = listContent[activeTab];

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Tabs navigation */}
      <div className="border-b border-slate-200 px-4 sm:px-7">
        <div
          role="tablist"
          aria-label="Job information"
          className="flex gap-6 overflow-x-auto"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

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
                  isActive
                    ? "text-[#485ea8]"
                    : "text-slate-500 hover:text-slate-900"
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

      {/* Tab content */}
      <div
        id="job-tab-panel"
        role="tabpanel"
        aria-labelledby={`job-tab-${activeTab}`}
        className="p-5 sm:p-7"
      >
        {activeTab === "description" && (
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              About this position
            </h2>

            <p className="mt-4 whitespace-pre-line text-sm leading-8 text-slate-600 sm:text-base">
              {job.description}
            </p>
          </div>
        )}

        {list && (
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {tabs.find((tab) => tab.id === activeTab)?.label}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {activeTab === "responsibilities" &&
                "What you will do in this role."}

              {activeTab === "requirements" &&
                "Skills and qualifications for this position."}

              {activeTab === "benefits" &&
                "What you can expect from this opportunity."}
            </p>

            <ul className="mt-6 space-y-4">
              {list.map((item, index) => (
                <li
                  key={`${activeTab}-${index}`}
                  className="flex items-start gap-3 text-sm leading-7 text-slate-600 sm:text-base"
                >
                  <FaCheckCircle className="mt-1.5 shrink-0 text-[#485ea8]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}