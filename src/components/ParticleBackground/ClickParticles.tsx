import { useEffect, useRef } from 'react';

class ClickParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = 1;
    this.size = Math.random() * 4 + 2;
    const colors = ['#00d4ff', '#7b2ff7', '#ff006e'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update(deltaTime: number) {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.1; // Gravity
    this.life -= deltaTime * 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  isDead() {
    return this.life <= 0;
  }
}

const ClickParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    let particles: ClickParticle[] = [];
    let animationId: number;
    let lastTime = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 15; i++) {
        particles.push(new ClickParticle(e.clientX, e.clientY));
      }
    };

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles = particles.filter((p) => !p.isDead());
      particles.forEach((p) => {
        p.update(deltaTime);
        p.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('click', handleClick);
    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 999,
      }}
    />
  );
};

export default ClickParticles;
