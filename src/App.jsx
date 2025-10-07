import MusicSection from "./components/MusicSection";

export default function App() {
  return (
    <div className="bg-[#0A0A0A] text-white w-screen overflow-x-hidden overflow-y-auto snap-y snap-mandatory">
      {/* 🔵 두 번째 섹션 */}
      <section className="h-screen snap-start">
        <MusicSection />
      </section>
    </div>
  );
}
