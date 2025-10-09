import React from "react";
import WorkSection from "./components/WorkSection";

export default function App() {
  return (
    <div className="bg-[#0A0A0A] text-white w-screen overflow-x-hidden overflow-y-auto snap-y snap-mandatory">
      {/* 🔴 Work showcase 섹션 */}
      <section className="h-screen snap-start">
        <WorkSection />
      </section>
    </div>
  );
}
