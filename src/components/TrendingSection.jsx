import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function TrendingSection() {
  useEffect(() => {
    gsap.from(".meme-card", {
      scrollTrigger: { trigger: ".trending", start: "top 80%" },
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
    });
  }, []);

  const memes = [
    "meme1.jpg",
    "meme2.jpg",
    "meme3.jpg",
    "meme4.jpg",
    "meme5.jpg",
  ];

  return (
    <section className="trending flex flex-col items-center mt-32">
      <h2 className="text-3xl font-semibold mb-8">Trending Now</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {memes.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="meme-card w-48 h-64 rounded-xl object-cover shadow-lg hover:scale-105 transition"
          />
        ))}
      </div>
    </section>
  );
}
