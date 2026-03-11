import { useEffect, useRef } from "react";

export const StarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const dpr = window.devicePixelRatio || 1;

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Particle system
    const particles = [];
    const particleCount = width < 768 ? 700 : 1500;

    const initParticles = () => {
      particles.length = 0;
      const baseRadius = Math.min(width, height) * 0.65;

      for (let i = 0; i < particleCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const radius = baseRadius * (0.85 + Math.random() * 0.3);

        particles.push({
          radius,
          theta,
          phi,
          speed:
            (0.0015 + Math.random() * 0.002) *
            (Math.random() > 0.5 ? 1 : -1),
          dashLength: 8 + Math.random() * 12,
          isPulse: Math.random() > 0.8,
          // Cursor repulsion displacement (in screen space)
          displaceX: 0,
          displaceY: 0,
        });
      }
    };

    initParticles();

    // Mouse state
    let mouseScreenX = width / 2;
    let mouseScreenY = height / 2;
    let mouseActive = false;

    let targetTiltX = 0.2;
    let targetTiltY = 0;
    let currentTiltX = 0.2;
    let currentTiltY = 0;

    // Repulsion config
    const REPULSION_RADIUS = 350; // px — how close the cursor needs to be
    const REPULSION_STRENGTH = 200; // px — max push distance
    const REPULSION_DECAY = 0.88; // how fast displacement eases back (per frame)

    const handleMouseMove = (e) => {
      mouseScreenX = e.clientX;
      mouseScreenY = e.clientY;
      mouseActive = true;

      const mx = (e.clientX / width) * 2 - 1;
      const my = (e.clientY / height) * 2 - 1;
      targetTiltX = 0.2 + my * 0.3;
      targetTiltY = mx * 0.3;
    };

    const handleMouseLeave = () => {
      mouseActive = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;
    const FOV = 800;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      currentTiltX += (targetTiltX - currentTiltX) * 0.05;
      currentTiltY += (targetTiltY - currentTiltY) * 0.05;

      particles.forEach((p) => {
        // Update rotation
        p.theta += p.speed;

        // 3D coordinates
        let x = p.radius * Math.sin(p.phi) * Math.cos(p.theta);
        let y = p.radius * Math.sin(p.phi) * Math.sin(p.theta);
        let z = p.radius * Math.cos(p.phi);

        // Tilt Y (horizontal mouse)
        let tmpX = x * Math.cos(currentTiltY) + z * Math.sin(currentTiltY);
        let tmpZ = -x * Math.sin(currentTiltY) + z * Math.cos(currentTiltY);
        x = tmpX;
        z = tmpZ;

        // Tilt X (vertical mouse)
        let tmpY = y * Math.cos(currentTiltX) - z * Math.sin(currentTiltX);
        tmpZ = y * Math.sin(currentTiltX) + z * Math.cos(currentTiltX);
        y = tmpY;
        z = tmpZ;

        // Floating wave
        y += Math.sin(time + p.theta) * 20;

        // Project to screen
        const scale = FOV / (FOV + z + p.radius * 2);
        let screenX = cx + x * scale;
        let screenY = cy + y * scale;

        // ── Cursor repulsion ──
        if (mouseActive) {
          const dxMouse = screenX - mouseScreenX;
          const dyMouse = screenY - mouseScreenY;
          const distToMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distToMouse < REPULSION_RADIUS && distToMouse > 0.1) {
            // Strength falls off with distance (inverse, clamped)
            const force =
              ((REPULSION_RADIUS - distToMouse) / REPULSION_RADIUS) *
              REPULSION_STRENGTH;
            // Push along the vector from mouse to particle
            p.displaceX += (dxMouse / distToMouse) * force * 0.15;
            p.displaceY += (dyMouse / distToMouse) * force * 0.15;
          }
        }

        // Ease displacement back to zero (springy return)
        p.displaceX *= REPULSION_DECAY;
        p.displaceY *= REPULSION_DECAY;

        // Clamp max displacement to avoid particles flying too far
        const maxDisplace = 300;
        p.displaceX = Math.max(-maxDisplace, Math.min(maxDisplace, p.displaceX));
        p.displaceY = Math.max(-maxDisplace, Math.min(maxDisplace, p.displaceY));

        // Apply displacement
        screenX += p.displaceX;
        screenY += p.displaceY;

        // Next point for dash direction
        const nextTheta = p.theta + (p.speed > 0 ? 0.05 : -0.05);
        let nextX = p.radius * Math.sin(p.phi) * Math.cos(nextTheta);
        let nextY = p.radius * Math.sin(p.phi) * Math.sin(nextTheta);
        let nextZ = p.radius * Math.cos(p.phi);

        let nTmpX =
          nextX * Math.cos(currentTiltY) + nextZ * Math.sin(currentTiltY);
        let nTmpZ =
          -nextX * Math.sin(currentTiltY) + nextZ * Math.cos(currentTiltY);
        nextX = nTmpX;
        nextZ = nTmpZ;

        let nTmpY =
          nextY * Math.cos(currentTiltX) - nextZ * Math.sin(currentTiltX);
        nTmpZ =
          nextY * Math.sin(currentTiltX) + nextZ * Math.cos(currentTiltX);
        nextY = nTmpY + Math.sin(time + nextTheta) * 20;
        nextZ = nTmpZ;

        const nextScale = FOV / (FOV + nextZ + p.radius * 2);
        const nextScreenX = cx + nextX * nextScale + p.displaceX;
        const nextScreenY = cy + nextY * nextScale + p.displaceY;

        // Color gradient (Red → Purple → Blue)
        const normalizedX = Math.max(
          0,
          Math.min(1, (screenX - p.displaceX) / width)
        );

        let r, g, b;
        if (normalizedX < 0.5) {
          const ratio = normalizedX * 2;
          r = 239 - (239 - 168) * ratio;
          g = 68 - (68 - 85) * ratio;
          b = 68 - (68 - 247) * ratio;
        } else {
          const ratio = (normalizedX - 0.5) * 2;
          r = 168 - (168 - 59) * ratio;
          g = 85 - (85 - 130) * ratio;
          b = 247 - (247 - 246) * ratio;
        }

        // Depth fade
        const depthAlpha = Math.max(
          0.2,
          (z + p.radius * 2) / (p.radius * 4)
        );
        const baseAlpha = p.isPulse
          ? 0.8 + Math.sin(time * 5 + p.theta) * 0.2
          : 0.6;

        // Boost opacity slightly when displaced (makes the spread more visible)
        const displaceMag = Math.sqrt(
          p.displaceX * p.displaceX + p.displaceY * p.displaceY
        );
        const displaceBoost = Math.min(0.3, displaceMag / 200);
        const finalAlpha = Math.min(1, depthAlpha * baseAlpha + displaceBoost);

        // Draw dash
        ctx.beginPath();
        ctx.moveTo(screenX, screenY);

        const dx = nextScreenX - screenX;
        const dy = nextScreenY - screenY;
        const mag = Math.sqrt(dx * dx + dy * dy) || 1;

        const drawLength = p.dashLength * scale;
        const endX = screenX + (dx / mag) * drawLength;
        const endY = screenY + (dy / mag) * drawLength;

        ctx.lineTo(endX, endY);

        ctx.strokeStyle = `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}, ${finalAlpha})`;
        ctx.lineWidth = 3 * scale;
        ctx.lineCap = "round";
        ctx.stroke();
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#09090b]">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ opacity: 1 }}
      />
    </div>
  );
};
