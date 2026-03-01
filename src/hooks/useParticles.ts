import { useCallback, useEffect, useRef } from 'react';
import Sparkle from '../lib/sparkle';
import RingParticle from '../lib/ringParticle';
import Confetti from '../lib/confetti';

export const useParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<(Sparkle | RingParticle)[]>([]);
  const frameRef = useRef<number>(null);
  const activeRef = useRef<boolean>(false);

  const startLoop = useCallback(() => {
    if (activeRef.current) return; // Don't start duplicate loops

    const canvas = canvasRef.current;
    if (!canvas) return;

    activeRef.current = true;

    const loop = () => {
      if (!canvas) {
        activeRef.current = false;
        return;
      }

      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      particlesRef.current.forEach((p) => {
        p.update(); // Assuming 60 FPS, so ~16ms per frame
        p.draw(ctx);
      });

      // Keep looping only if particles remain
      if (particlesRef.current.length > 0) {
        frameRef.current = requestAnimationFrame(loop);
      } else {
        activeRef.current = false; // Stop loop when all particles are dead
      }
    };

    frameRef.current = requestAnimationFrame(loop);
  }, []);

  // Confetti burst (for victory)
  const burst = useCallback(
    (x: number, y: number, count = 50) => {
      const colors = ['#E84855', '#F9DC5C', '#3185FC', '#5BBA6F', '#FF6F61'];
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(
          new Confetti(x, y, colors[Math.floor(Math.random() * colors.length)])
        );
      }
      startLoop();
    },
    [startLoop]
  );

  const sparkle = useCallback(
    (x: number, y: number, color: string) => {
      for (let i = 0; i < 12; i++) {
        particlesRef.current.push(new Sparkle(x, y, color));
      }
      for (let i = 0; i < 2; i++) {
        particlesRef.current.push(new RingParticle(x, y, color));
      }
      startLoop();
    },
    [startLoop]
  );

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return { canvasRef, sparkle, burst };
};
