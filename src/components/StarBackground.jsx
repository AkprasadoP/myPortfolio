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

    // ─── Configuration ───
    const NODE_COUNT = width < 768 ? 60 : 120;
    const CONNECTION_DIST = 220; // max distance for connections
    const CURSOR_CONNECT_DIST = 300; // cursor proximity for new connections
    const PULSE_SPEED = 0.8; // speed of traveling pulses
    const FOV = 600;
    const DEPTH = 800; // z-range for 3D distribution

    // ─── Nodes ───
    const nodes = [];
    const initNodes = () => {
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          // 3D positions (spread across a large volume)
          x: (Math.random() - 0.5) * width * 1.4,
          y: (Math.random() - 0.5) * height * 1.4,
          z: (Math.random() - 0.5) * DEPTH,
          // Slow drift velocity
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          vz: (Math.random() - 0.5) * 0.15,
          // Base size
          baseSize: 1.5 + Math.random() * 2,
          // Pulse glow phase
          phase: Math.random() * Math.PI * 2,
          // Whether this is a "hub" node (larger, brighter)
          isHub: Math.random() > 0.85,
        });
      }
    };
    initNodes();

    // ─── Pulses (traveling sparks along connections) ───
    const pulses = [];
    const MAX_PULSES = 30;

    const spawnPulse = (fromIdx, toIdx) => {
      if (pulses.length >= MAX_PULSES) return;
      pulses.push({
        from: fromIdx,
        to: toIdx,
        progress: 0, // 0 to 1
        speed: PULSE_SPEED + Math.random() * 0.5,
        hue: 220 + Math.random() * 80, // blue to purple range
      });
    };

    // Periodically spawn pulses on random connections
    let pulseTimer = 0;

    // ─── Mouse ───
    let mouseScreenX = -9999;
    let mouseScreenY = -9999;
    let mouseActive = false;

    const handleMouseMove = (e) => {
      mouseScreenX = e.clientX;
      mouseScreenY = e.clientY;
      mouseActive = true;
    };
    const handleMouseLeave = () => {
      mouseActive = false;
      mouseScreenX = -9999;
      mouseScreenY = -9999;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    // Project a 3D point to 2D screen
    const project = (x, y, z) => {
      const scale = FOV / (FOV + z + DEPTH * 0.6);
      return {
        sx: width / 2 + x * scale,
        sy: height / 2 + y * scale,
        scale,
        z,
      };
    };

    // Color helpers
    const getNodeColor = (alpha, hue = 220) => {
      return `hsla(${hue}, 70%, 70%, ${alpha})`;
    };
    const getConnectionColor = (alpha, hue = 230) => {
      return `hsla(${hue}, 50%, 55%, ${alpha})`;
    };

    const render = () => {
      time += 0.008;
      pulseTimer += 0.008;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // ─── Update nodes (gentle drift + subtle orbit) ───
      nodes.forEach((n) => {
        n.x += n.vx + Math.sin(time + n.phase) * 0.15;
        n.y += n.vy + Math.cos(time * 0.7 + n.phase) * 0.15;
        n.z += n.vz;

        // Wrap around (soft boundaries)
        const bx = width * 0.8;
        const by = height * 0.8;
        const bz = DEPTH * 0.5;
        if (n.x > bx) n.vx -= 0.02;
        if (n.x < -bx) n.vx += 0.02;
        if (n.y > by) n.vy -= 0.02;
        if (n.y < -by) n.vy += 0.02;
        if (n.z > bz) n.vz -= 0.01;
        if (n.z < -bz) n.vz += 0.01;

        // Damping
        n.vx *= 0.999;
        n.vy *= 0.999;
        n.vz *= 0.999;
      });

      // ─── Project all nodes ───
      const projected = nodes.map((n) => project(n.x, n.y, n.z));

      // ─── Find connections ───
      const connections = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dz = nodes[i].z - nodes[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < CONNECTION_DIST) {
            connections.push({ i, j, dist });
          }
        }
      }

      // ─── Cursor-triggered connections ───
      if (mouseActive) {
        for (let i = 0; i < projected.length; i++) {
          const p = projected[i];
          const dmx = p.sx - mouseScreenX;
          const dmy = p.sy - mouseScreenY;
          const screenDist = Math.sqrt(dmx * dmx + dmy * dmy);
          if (screenDist < CURSOR_CONNECT_DIST) {
            // Find nearby nodes to this one and boost their connections
            for (let j = 0; j < projected.length; j++) {
              if (i === j) continue;
              const p2 = projected[j];
              const d2mx = p2.sx - mouseScreenX;
              const d2my = p2.sy - mouseScreenY;
              const screenDist2 = Math.sqrt(d2mx * d2mx + d2my * d2my);
              if (screenDist2 < CURSOR_CONNECT_DIST) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dz = nodes[i].z - nodes[j].z;
                const dist3d = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (dist3d < CONNECTION_DIST * 2) {
                  connections.push({ i, j, dist: dist3d, cursor: true });
                }
              }
            }
          }
        }
      }

      // ─── Draw connections ───
      connections.forEach((c) => {
        const p1 = projected[c.i];
        const p2 = projected[c.j];

        // Fade by distance
        const maxDist = c.cursor ? CONNECTION_DIST * 2 : CONNECTION_DIST;
        const alpha = (1 - c.dist / maxDist) * (c.cursor ? 0.25 : 0.12);

        // Depth-based fade
        const avgZ = (nodes[c.i].z + nodes[c.j].z) / 2;
        const depthFade = Math.max(0.3, (avgZ + DEPTH) / (DEPTH * 2));

        const hue = c.cursor ? 270 : 220 + (c.dist / CONNECTION_DIST) * 40;

        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.strokeStyle = getConnectionColor(
          alpha * depthFade,
          hue
        );
        ctx.lineWidth = c.cursor ? 1 : 0.6;
        ctx.stroke();
      });

      // ─── Spawn pulses periodically ───
      if (pulseTimer > 0.15 && connections.length > 0) {
        pulseTimer = 0;
        const randomConn =
          connections[Math.floor(Math.random() * connections.length)];
        spawnPulse(randomConn.i, randomConn.j);
      }

      // Spawn extra pulses near cursor
      if (mouseActive && Math.random() > 0.7) {
        const cursorConns = connections.filter((c) => c.cursor);
        if (cursorConns.length > 0) {
          const rc = cursorConns[Math.floor(Math.random() * cursorConns.length)];
          spawnPulse(rc.i, rc.j);
        }
      }

      // ─── Draw and update pulses ───
      for (let pi = pulses.length - 1; pi >= 0; pi--) {
        const pulse = pulses[pi];
        pulse.progress += pulse.speed * 0.02;

        if (pulse.progress >= 1) {
          pulses.splice(pi, 1);
          continue;
        }

        const pFrom = projected[pulse.from];
        const pTo = projected[pulse.to];
        if (!pFrom || !pTo) {
          pulses.splice(pi, 1);
          continue;
        }

        // Interpolate position
        const px = pFrom.sx + (pTo.sx - pFrom.sx) * pulse.progress;
        const py = pFrom.sy + (pTo.sy - pFrom.sy) * pulse.progress;
        const pScale =
          pFrom.scale + (pTo.scale - pFrom.scale) * pulse.progress;

        // Draw pulse glow
        const pulseSize = 3 * pScale;
        const pulseAlpha = Math.sin(pulse.progress * Math.PI) * 0.9;

        // Outer glow
        const gradient = ctx.createRadialGradient(
          px, py, 0,
          px, py, pulseSize * 4
        );
        gradient.addColorStop(
          0,
          `hsla(${pulse.hue}, 80%, 70%, ${pulseAlpha * 0.6})`
        );
        gradient.addColorStop(1, `hsla(${pulse.hue}, 80%, 70%, 0)`);
        ctx.beginPath();
        ctx.arc(px, py, pulseSize * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Inner bright core
        ctx.beginPath();
        ctx.arc(px, py, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${pulse.hue}, 90%, 85%, ${pulseAlpha})`;
        ctx.fill();
      }

      // ─── Draw nodes ───
      // Sort by z for proper layering (far nodes first)
      const sortedIndices = [...Array(nodes.length).keys()].sort(
        (a, b) => nodes[a].z - nodes[b].z
      );

      sortedIndices.forEach((i) => {
        const n = nodes[i];
        const p = projected[i];

        // Pulsing glow
        const glow = 0.5 + Math.sin(time * 2 + n.phase) * 0.3;
        const depthFade = Math.max(0.3, (n.z + DEPTH) / (DEPTH * 2));

        // Cursor proximity boost
        let cursorBoost = 0;
        if (mouseActive) {
          const dmx = p.sx - mouseScreenX;
          const dmy = p.sy - mouseScreenY;
          const screenDist = Math.sqrt(dmx * dmx + dmy * dmy);
          if (screenDist < CURSOR_CONNECT_DIST) {
            cursorBoost =
              ((CURSOR_CONNECT_DIST - screenDist) / CURSOR_CONNECT_DIST) * 0.6;
          }
        }

        const size = n.baseSize * p.scale * (n.isHub ? 1.8 : 1);
        const alpha = (glow * depthFade + cursorBoost) * (n.isHub ? 1 : 0.7);
        const hue = n.isHub ? 260 : 220;

        // Outer glow for hub nodes and cursor-boosted nodes
        if (n.isHub || cursorBoost > 0.1) {
          const glowRadius = size * (3 + cursorBoost * 4);
          const glowGrad = ctx.createRadialGradient(
            p.sx, p.sy, 0,
            p.sx, p.sy, glowRadius
          );
          glowGrad.addColorStop(
            0,
            `hsla(${hue}, 70%, 65%, ${alpha * 0.3})`
          );
          glowGrad.addColorStop(1, `hsla(${hue}, 70%, 65%, 0)`);
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = glowGrad;
          ctx.fill();
        }

        // Node core
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        ctx.fillStyle = getNodeColor(
          Math.min(1, alpha),
          hue + cursorBoost * 30
        );
        ctx.fill();
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
