import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./WorkSection.css";

export default function WorkSection() {
  const cardsRef = useRef([]);
  const [current, setCurrent] = useState(2);
  const total = 5;

  const arrangeCards = (index) => {
    // 🔥 이전 트윈(애니메이션) 중단 → 즉각 반응
    gsap.killTweensOf(cardsRef.current);

    cardsRef.current.forEach((card, i) => {
      const offset = i - index;
      const abs = Math.abs(offset);

      gsap.to(card, {
        x: offset * 320,
        z: -abs * 150, // 깊이감 살짝 줄여 반응 속도 개선
        scale: i === index ? 1 : 0.88 - abs * 0.04,
        rotationY: offset * -25, // 시야 왜곡 완화
        opacity: i === index ? 1 : 0.45,
        zIndex: 10 - abs,
        duration: 0.35, // ⚡ 훨씬 빠르게
        ease: "power2.out", // 💨 자연스럽게 감속
      });
    });
  };

  // 초기 및 current 변경 시 실행
  useEffect(() => {
    arrangeCards(current);
  }, [current]);

  // 슬라이드 이동 함수
  const slide = (dir) => {
    // 🔥 클릭 시 즉시 애니메이션 갱신
    gsap.killTweensOf(cardsRef.current);
    setCurrent((prev) => (prev + dir + total) % total);
  };

  return (
    <section className="work-section">
      <h2 className="work-title">
        our <span>work</span>
        <br />
        <strong>speaks</strong> for us
      </h2>

      <div className="work-slider">
        {[...Array(total)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="work-card"
          >
            <div className="work-inner">
              <div
                className="work-image"
                style={{
                  backgroundImage: `url(https://picsum.photos/400/300?random=${i})`,
                }}
              ></div>
              <div className="work-info">
                <h3>Creative Project {i + 1}</h3>
                <p>
                  Launch a new brand with impactful design and storytelling.
                </p>
                <button className="work-btn">→</button>
              </div>
            </div>
          </div>
        ))}

        {/* ✅ 좌우 네비게이션 버튼 */}
        <button className="nav-btn left" onClick={() => slide(-1)}>
          ‹
        </button>
        <button className="nav-btn right" onClick={() => slide(1)}>
          ›
        </button>
      </div>
    </section>
  );
}
