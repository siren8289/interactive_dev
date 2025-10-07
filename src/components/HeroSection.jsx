import { useEffect } from "react";
import { gsap } from "gsap";
import MemeArc from "./MemeArc";

export default function HeroSection() {
  useEffect(() => {
    gsap.from(".title", { opacity: 0, y: 40, duration: 1 });
    gsap.from(".subtext", { opacity: 0, y: 60, duration: 1, delay: 0.3 });
    gsap.from(".join-btn", { opacity: 0, scale: 0.5, duration: 1, delay: 0.6 });
  }, []);

  return (
    <section className="flex flex-col items-center justify-center h-screen text-center">
      <MemeArc />
      <h1 className="title text-6xl font-bold mt-12">Gather Memes</h1>
      <p className="subtext text-gray-400 mt-4">
        Explore the world of memes in motion.
      </p>
      <button className="join-btn bg-white text-black px-6 py-3 mt-6 rounded-full font-semibold hover:scale-105 transition">
        Join
      </button>
    </section>
  );
}
