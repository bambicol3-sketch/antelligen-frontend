"use client";

import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import StudyRoomDashboard from "@/features/study-room/ui/components/StudyRoomDashboard";
import MseMarketAnalysisDashboard from "@/features/mse-market-analysis/ui/components/MseMarketAnalysisDashboard";
import MseSectorsDashboard from "@/features/mse-sectors/ui/components/MseSectorsDashboard";
import MseCreditDashboard from "@/features/mse-credit/ui/components/MseCreditDashboard";
import { studyRoomTabsStyles as s } from "@/features/study-room/ui/components/studyRoomTabsStyles";
import {
  parseStudyRoomNavMessage,
  type StudyRoomTabKey,
} from "@/features/study-room/ui/components/dashboardEmbed";
import { mseMarketAnalysisQueryAtom } from "@/features/mse-market-analysis/application/atoms/mseMarketAnalysisAtom";
import type { MseMarketAnalysisQuery } from "@/features/mse-market-analysis/domain/model/mseMarketAnalysis";

const tabs: { key: StudyRoomTabKey; label: string }[] = [
  { key: "dashboard", label: "대시보드" },
  { key: "market", label: "시장 분석" },
  { key: "sectors", label: "산업군 분석" },
  { key: "credit", label: "신용 스프레드 분석" },
];

export default function StudyRoomTabs() {
  const [activeTab, setActiveTab] = useState<StudyRoomTabKey>("dashboard");
  const setMarketQuery = useSetAtom(mseMarketAnalysisQueryAtom);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const message = parseStudyRoomNavMessage(event.data);
      if (!message) return;
      if (message.tab === "market") {
        const next: MseMarketAnalysisQuery = {};
        const indexCode = message.params.index_code;
        if (indexCode) next.indexCode = indexCode;
        const periodRaw = message.params.period;
        if (periodRaw !== undefined) {
          const periodNum = Number(periodRaw);
          if (Number.isFinite(periodNum)) next.period = periodNum;
        }
        setMarketQuery(next);
      }
      setActiveTab(message.tab);
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setMarketQuery]);

  const tabClassName = (key: StudyRoomTabKey) =>
    [s.tab.base, key === activeTab ? s.tab.active : s.tab.default].join(" ");

  return (
    <div className={s.wrap}>
      <div role="tablist" className={s.tabBar}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            className={tabClassName(tab.key)}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={s.panel}>
        {activeTab === "dashboard" && <StudyRoomDashboard />}
        {activeTab === "market" && <MseMarketAnalysisDashboard />}
        {activeTab === "sectors" && <MseSectorsDashboard />}
        {activeTab === "credit" && <MseCreditDashboard />}
      </div>
    </div>
  );
}
