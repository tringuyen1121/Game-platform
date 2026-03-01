export class Confetti {
  x: number;
  y: number;
  color: string;
  size: number;
  speedX: number;
  speedY: number;
  gravity: number;
  life: number;
  decay: number;
  rotation: number;
  rotSpeed: number;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = Math.random() * 7 + 2;
    this.speedX = (Math.random() - 0.5) * 14;
    this.speedY = (Math.random() - 0.5) * 14 - 5; // Bias upward
    this.gravity = 0.18;
    this.life = 1.0; // 1 = fully alive, 0 = dead
    this.decay = Math.random() * 0.015 + 0.006;
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 12;
  }

  update() {
    this.speedY += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= this.decay;
    this.rotation += this.rotSpeed;
    this.size *= 0.995;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size, -this.size / 2, this.size * 2, this.size);
    ctx.restore();
  }
}

export default Confetti;
