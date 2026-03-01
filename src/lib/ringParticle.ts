class RingParticle {
  x: number;
  y: number;
  color: string;
  radius: number = 0;
  maxRadius: number = 50;
  speed: number = 1;
  life: number = 1; // life starts at 1 and decreases to 0

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;

    this.color = color;
  }

  update() {
    this.radius += this.speed;
    this.life = Math.max(0, 1 - this.radius / this.maxRadius);
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.life * 0.4;
    ctx.strokeStyle = 'rgba(255, 255, 255, ' + this.life + ')';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

export default RingParticle;
