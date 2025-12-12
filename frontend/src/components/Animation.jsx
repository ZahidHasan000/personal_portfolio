// ParticleAnimation.jsx
import { useRef, useEffect } from 'react';

const Animation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Set initial background color
    ctx.fillStyle = '#bcbcbc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#bcbcbc"

    class Particle {
      constructor(effect) {
        this.effect = effect;
        this.radius = Math.floor(Math.random() * 4 + 1);
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
        this.vx = Math.random() * 1 - 0.5;
        this.vy = Math.random() * 1 - 0.5;
        this.pushX = 0;
        this.pushY = 0;
      }

      draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
      }

      update() {
        if (this.effect.mouse) {
          const dx = this.x - this.effect.mouse.x;
          const dy = this.y - this.effect.mouse.y;
          const distance = Math.hypot(dx, dy);
          const force = this.effect.mouse.radius / distance;
          if (distance < this.effect.mouse.radius) {
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force;
            this.y += Math.sin(angle) * force;
          }
        }
        this.x += this.pushX + this.vx;
        this.y += this.pushY + this.vy;

        if (this.x < this.radius) {
          this.x = this.radius;
          this.vx *= -1;
        } else if (this.x > this.effect.width - this.radius) {
          this.x = this.effect.width - this.radius;
          this.vx *= -1;
        }

        if (this.y < this.radius) {
          this.y = this.radius;
          this.vy *= -1;
        } else if (this.y > this.effect.height - this.radius) {
          this.y = this.effect.height - this.radius;
          this.vy *= -1;
        }
      }

      reset() {
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
      }
    }

    class Effect {
      constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 100;
        this.createParticles();

        let radius = window.innerWidth > 768 ? 300 : 195;
        this.mouse = {
          x: 0,
          y: 0,
          pressed: false,
          radius: radius
        };

        this.handleResize = this.handleResize.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);

        window.addEventListener('resize', this.handleResize);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mousedown', this.handleMouseDown);
        window.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
        window.addEventListener('touchstart', this.handleTouchStart, { passive: false });
        window.addEventListener('touchend', this.handleTouchEnd);
      }

      createParticles() {
        for (let i = 0; i < this.numberOfParticles; i++) {
          this.particles.push(new Particle(this));
        }
      }

      handleParticles() {
        this.connectParticles();
        this.particles.forEach(particle => {
          particle.draw(this.context);
          particle.update();
        });
      }

      connectParticles() {
        const maxDistance = 100;
        for (let a = 0; a < this.particles.length; a++) {
          for (let b = a; b < this.particles.length; b++) {
            const dx = this.particles[a].x - this.particles[b].x;
            const dy = this.particles[a].y - this.particles[b].y;
            const distance = Math.hypot(dx, dy);
            if (distance < maxDistance) {
              this.context.save();
              const opacity = 1 - (distance / maxDistance);
              this.context.globalAlpha = opacity;
              this.context.beginPath();
              this.context.moveTo(this.particles[a].x, this.particles[a].y);
              this.context.lineTo(this.particles[b].x, this.particles[b].y);
              this.context.stroke();
              this.context.restore();
            }
          }
        }
      }

      handleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        const gradient = this.context.createLinearGradient(0, 0, this.width, this.height);
        gradient.addColorStop(0, '#bcbcbc');
        gradient.addColorStop(0.5, '#717171');
        gradient.addColorStop(1, '#000050');
        this.context.fillStyle = '#bcbcbc';
        this.context.strokeStyle = "#bcbcbc";
        this.particles.forEach(particle => {
          particle.reset();
        });
      }

      handleMouseMove(e) {
        if (this.mouse) {
          this.mouse.x = e.clientX;
          this.mouse.y = e.clientY;
        }
      }

      handleMouseDown(e) {
        this.mouse.pressed = true;
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      }

      handleMouseUp() {
        this.mouse.pressed = false;
        const newParticlesCount = 10; // Change this value as needed
        for (let i = 0; i < newParticlesCount; i++) {
          this.particles.push(new Particle(this));
        }
      }

      handleTouchMove(e) {
        if (this.mouse) {
          const touch = e.touches[0];
          this.mouse.x = touch.clientX;
          this.mouse.y = touch.clientY;
        }
      }

      handleTouchStart(e) {
        this.mouse.pressed = true;
        const touch = e.touches[0];
        this.mouse.x = touch.clientX;
        this.mouse.y = touch.clientY;
      }

      handleTouchEnd() {
        this.mouse.pressed = false;
        const newParticlesCount = 2; // Change this value as needed
        for (let i = 0; i < newParticlesCount; i++) {
          this.particles.push(new Particle(this));
        }
      }

      cleanup() {
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mousedown', this.handleMouseDown);
        window.removeEventListener('mouseup', this.handleMouseUp);
        window.removeEventListener('touchmove', this.handleTouchMove);
        window.removeEventListener('touchstart', this.handleTouchStart);
        window.removeEventListener('touchend', this.handleTouchEnd);
      }
    }

    const effect = new Effect(canvas, ctx);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      effect.handleParticles();
      requestAnimationFrame(animate);
    }
    animate();

    // Cleanup function
    return () => {
      // Cleanup code
      effect.cleanup();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }} />;
};

export default Animation;





