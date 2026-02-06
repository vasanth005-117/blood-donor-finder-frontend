import React, { useEffect, useRef } from 'react';
import '../styles/Background3D.css';

const Background3D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles - NOSONAR: Math.random used for visual effects only, not security-critical
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width, // NOSONAR
        y: Math.random() * canvas.height, // NOSONAR
        size: Math.random() * 3 + 1, // NOSONAR
        speedX: (Math.random() - 0.5) * 0.5, // NOSONAR
        speedY: (Math.random() - 0.5) * 0.5, // NOSONAR
        opacity: Math.random() * 0.5 + 0.3, // NOSONAR
      });
    }

    const animate = () => {
      // Clear canvas with gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(20, 10, 30, 1)');
      gradient.addColorStop(0.5, 'rgba(35, 20, 50, 1)');
      gradient.addColorStop(1, 'rgba(15, 5, 25, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Draw particle
        ctx.fillStyle = `rgba(255, 100, 150, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="background-canvas" />;
};

export default Background3D;
