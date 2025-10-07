import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

const images = [
  "/meme1.jpg",
  "/meme2.jpg",
  "/meme3.jpg",
  "/meme4.jpg",
  "/meme5.jpg",
  "/meme6.jpg",
  "/meme7.jpg",
  "/meme8.jpg",
];

function RotatingArc() {
  const groupRef = useRef();
  const radius = 3;

  // 프레임마다 회전 애니메이션
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01; // ← 이게 회전 속도
    }
  });

  return (
    <group ref={groupRef}>
      {images.map((src, i) => {
        const angle = (i / images.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        const texture = new THREE.TextureLoader().load(src);
        return (
          <mesh key={i} position={[x, 0, z]} rotation={[0, -angle, 0]}>
            <planeGeometry args={[1.2, 1.2]} />
            <meshBasicMaterial map={texture} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function MemeArc() {
  return (
    <div className="w-full h-[300px]">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={1.2} />
        <RotatingArc />
      </Canvas>
    </div>
  );
}
