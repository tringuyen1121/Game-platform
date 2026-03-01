class Sparkle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  color: string;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = Math.random() * 3 + 2;
    this.speedX = (Math.random() - 0.5) * 4;
    this.speedY = (Math.random() - 0.5) * 4;
    this.life = 1; // life starts at 1 and decreases to 0
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= 0.05; // decrease life over time, fade out
    this.size *= 0.9; // shrink over time
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.life <= 0) return; // don't draw if particle is dead
    ctx.save();
    ctx.globalAlpha = this.life; // fade out based on life
    ctx.strokeStyle = '#ffffff50';
    ctx.translate(this.x, this.y);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      ctx.moveTo(0, 0);
      ctx.lineTo(
        Math.cos(angle) * this.size * 3,
        Math.sin(angle) * this.size * 3
      );
    }
    ctx.stroke();
    ctx.restore();
  }
}

export default Sparkle;
