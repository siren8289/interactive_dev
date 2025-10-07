import { useEffect } from "react";
import { gsap } from "gsap";

export default function CircleGallery() {
  const images = Array.from({ length: 24 }).map((_, i) => `/meme${i + 1}.jpg`);

  useEffect(() => {
    gsap.to(".circle", {
      rotation: 360,
      duration: 40,
      ease: "none",
      repeat: -1,
      transformOrigin: "center center",
    });
  }, []);

  return (
    <div className="relative flex items-center justify-center w-screen h-screen bg-[#F4F4F4] overflow-hidden">
      {/* 중심 텍스트 */}
      <div className="absolute text-center z-10 max-w-[400px]">
        <h2 className="italic text-gray-700 font-serif text-xl">Whispers</h2>
        <p className="text-gray-600 mt-2 text-sm">
          is a sequential art game: a chain of fifty contributors creating fifty
          interlinked original artworks.
        </p>
        <button className="mt-4 text-gray-500 text-sm underline hover:text-black">
          More info
        </button>
      </div>

      {/* 원형 이미지 */}
      <div className="circle absolute w-[700px] h-[700px] rounded-full">
        {images.map((src, i) => {
          const angle = (i / images.length) * 360;
          const rotate = `rotate(${angle}deg) translate(330px) rotate(-${angle}deg)`;

          return (
            <img
              key={i}
              src={src}
              alt=""
              className="absolute w-[70px] h-[70px] object-cover rounded-md shadow-md"
              style={{ transform: rotate }}
            />
          );
        })}
      </div>
    </div>
  );
}
