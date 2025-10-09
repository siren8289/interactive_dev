import React, { useEffect, useRef } from "react";
import "./ParticleCloud.css";

export default function ParticleCloud() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCanvas.width = 400;
    tempCanvas.height = 400;

    // 숫자 5를 그려서 픽셀 데이터 추출
    tempCtx.fillStyle = "white";
    tempCtx.font = "bold 300px Arial";
    tempCtx.fillText("5", 50, 300);

    const imageData = tempCtx.getImageData(0, 0, 400, 400);
    const particles = [];

    // 픽셀 데이터를 점으로 변환
    for (let y = 0; y < imageData.height; y += 6) {
      for (let x = 0; x < imageData.width; x += 6) {
        const index = (y * imageData.width + x) * 4;
        const alpha = imageData.data[index + 3];
        if (alpha > 128) {
          particles.push({
            x: x + canvas.width / 2 - 200,
            y: y + canvas.height / 2 - 200,
            baseX: x + canvas.width / 2 - 200,
            baseY: y + canvas.height / 2 - 200,
            size: Math.random() * 2 + 1,
            vx: Math.random() * 0.5 - 0.25,
            vy: Math.random() * 0.5 - 0.25,
          });
        }
      }
    }

    // 애니메이션
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 살짝 흔들리게
        p.x += p.vx;
        p.y += p.vy;

        if (Math.abs(p.x - p.baseX) > 2) p.vx *= -1;
        if (Math.abs(p.y - p.baseY) > 2) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    }

    animate();

    // 리사이즈 대응
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}
