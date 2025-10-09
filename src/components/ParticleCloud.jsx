import React, { useEffect, useRef } from "react";
import "./ParticleCloud.css";

export default function ParticleCloud() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const rectSize = Math.min(canvas.width, canvas.height) * 0.4;
    const gap = 10;

    // 마우스 좌표 저장
    const mouse = { x: null, y: null, radius: 100 };

    // 마우스 움직임 이벤트 등록
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // 점 생성
    for (let y = -rectSize / 2; y <= rectSize / 2; y += gap) {
      for (let x = -rectSize / 2; x <= rectSize / 2; x += gap) {
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;
        particles.push({
          baseX: x + canvas.width / 2,
          baseY: y + canvas.height / 2,
          x: x + offsetX + canvas.width / 2,
          y: y + offsetY + canvas.height / 2,
          size: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
        });
      }
    }

    // 애니메이션
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 기본 진동
        p.x += p.vx;
        p.y += p.vy;
        if (Math.abs(p.x - p.baseX) > 3) p.vx *= -1;
        if (Math.abs(p.y - p.baseY) > 3) p.vy *= -1;

        // 마우스 반응
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          // 마우스 근처 점 밀어내기
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - dist) / mouse.radius;
          const moveX = Math.cos(angle) * force * 8;
          const moveY = Math.sin(angle) * force * 8;
          p.x -= moveX;
          p.y -= moveY;
        } else {
          // 제자리로 복귀 (복원력)
          p.x += (p.baseX - p.x) * 0.03;
          p.y += (p.baseY - p.y) * 0.03;
        }

        // 점 그리기
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    }

    animate();

    // 반응형 리사이즈
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}
