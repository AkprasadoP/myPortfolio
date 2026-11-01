import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS2DRenderer, CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";

/**
 * LivePulse as a small night-city of infrastructure. Each service is a block
 * on a ground grid; height encodes authority (PostgreSQL, the source of
 * truth, stands tallest). Committed events travel as glowing packets that
 * arc between rooftops.
 *
 * Loaded lazily — this module is the only importer of three.js.
 */

const COLORS = {
  fill: 0x0d0f14,
  edge: 0x3a4152,
  edgeDim: 0x2a3040,
  red: 0xd42a33,
  blue: 0x5b7fe0,
  ground: 0x1b1f29,
  groundSub: 0x12151c,
};

// x/z footprint centre, w/d footprint, h height
const BLOCKS = {
  studentA: { x: -5.6, z: -2.2, w: 0.7, d: 0.7, h: 0.4, title: "Student A", sub: "browser" },
  teacher: { x: -5.6, z: 0, w: 0.7, d: 0.7, h: 0.4, title: "Teacher", sub: "browser" },
  studentB: { x: -5.6, z: 2.2, w: 0.7, d: 0.7, h: 0.4, title: "Student B", sub: "browser" },
  instA: { x: -2.2, z: -1.5, w: 1.7, d: 1.2, h: 1.2, title: "WS Instance A", sub: "Fastify + ws" },
  instB: { x: -2.2, z: 1.5, w: 1.7, d: 1.2, h: 1.2, title: "WS Instance B", sub: "Fastify + ws" },
  redis: { x: 0.9, z: 0, w: 1.4, d: 1.0, h: 0.6, title: "Redis Pub/Sub", sub: "fan-out only", tone: "blue" },
  pg: { x: 4.2, z: 0, w: 2.0, d: 2.0, h: 2.4, title: "PostgreSQL", sub: "source of truth", tone: "red" },
};

// persistent connections drawn on the ground
const LINKS = [
  ["studentA", "instA"],
  ["teacher", "instA"],
  ["studentB", "instB"],
  ["instA", "redis", "blue"],
  ["instB", "redis", "blue"],
  ["instA", "pg", "red"],
  ["instB", "pg", "red"],
];

const TRAVEL_MS = 850;

const toneColor = (tone) =>
  tone === "red" ? COLORS.red : tone === "blue" ? COLORS.blue : COLORS.edge;

const roofPoint = (b) => new THREE.Vector3(b.x, b.h + 0.05, b.z);

export const createArchScene = (container, { reducedMotion = false, interactive = true } = {}) => {
  const width = () => container.clientWidth;
  const height = () => container.clientHeight;

  // —— renderers ——
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width(), height());
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const labels = new CSS2DRenderer();
  labels.setSize(width(), height());
  labels.domElement.className = "lp3d-labels";
  container.appendChild(labels.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a0c10, 14, 26);

  const camera = new THREE.PerspectiveCamera(30, width() / height(), 0.1, 100);
  const target = new THREE.Vector3(-0.6, 0.7, 0.2);
  // home view: in front, above, a little to the right — data flows left → right
  const home = new THREE.Spherical(15, 1.02, 0.2);
  const fitRadius = () => {
    // keep ~12.5 world units of width in frame at any aspect ratio
    const vfov = THREE.MathUtils.degToRad(camera.fov);
    const hfov = 2 * Math.atan(Math.tan(vfov / 2) * camera.aspect);
    return Math.max(14, 6.6 / Math.tan(hfov / 2));
  };
  home.radius = fitRadius();
  camera.position.setFromSpherical(home).add(target);

  const controls = new OrbitControls(camera, labels.domElement);
  controls.target.copy(target);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.minPolarAngle = 0.55;
  controls.maxPolarAngle = 1.25;
  controls.minAzimuthAngle = -0.9;
  controls.maxAzimuthAngle = 1.1;
  controls.enabled = interactive;
  controls.update();

  // —— light ——
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 0.9);
  key.position.set(5, 10, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x5b7fe0, 0.5);
  rim.position.set(-8, 4, -6);
  scene.add(rim);

  // —— ground ——
  const grid = new THREE.GridHelper(20, 40, COLORS.ground, COLORS.groundSub);
  grid.position.y = 0;
  scene.add(grid);

  // —— blocks ——
  const nodes = {};
  Object.entries(BLOCKS).forEach(([id, b]) => {
    const geo = new THREE.BoxGeometry(b.w, b.h, b.d);
    const mat = new THREE.MeshStandardMaterial({
      color: COLORS.fill,
      roughness: 0.85,
      metalness: 0.15,
      emissive: toneColor(b.tone),
      // tiny on purpose: emissive is linear-space, so 0.06 already reads as a lit red box
      emissiveIntensity: b.tone ? 0.012 : 0,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(b.x, b.h / 2, b.z);
    scene.add(mesh);

    const edgeMat = new THREE.LineBasicMaterial({ color: toneColor(b.tone) });
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat);
    edges.position.copy(mesh.position);
    scene.add(edges);

    // roof accent line for the two stores
    if (b.tone) {
      const roof = new THREE.Mesh(
        new THREE.PlaneGeometry(b.w * 0.92, b.d * 0.92),
        new THREE.MeshBasicMaterial({ color: toneColor(b.tone), transparent: true, opacity: 0.08 })
      );
      roof.rotation.x = -Math.PI / 2;
      roof.position.set(b.x, b.h + 0.002, b.z);
      scene.add(roof);
    }

    const el = document.createElement("div");
    el.className = `lp3d-label${b.tone ? ` lp3d-label--${b.tone}` : ""}`;
    el.innerHTML = `<b>${b.title}</b><span>${b.sub}</span>`;
    const label = new CSS2DObject(el);
    label.position.set(b.x, b.h + 0.42, b.z);
    scene.add(label);

    nodes[id] = { block: b, mesh, edgeMat, el, baseEdge: toneColor(b.tone) };
  });

  // —— ground links ——
  LINKS.forEach(([a, b, tone]) => {
    const A = BLOCKS[a];
    const B = BLOCKS[b];
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(A.x, 0.01, A.z),
      new THREE.Vector3(B.x, 0.01, B.z),
    ]);
    const mat =
      tone === "blue"
        ? new THREE.LineDashedMaterial({ color: COLORS.blue, dashSize: 0.18, gapSize: 0.14, transparent: true, opacity: 0.7 })
        : new THREE.LineBasicMaterial({ color: tone === "red" ? COLORS.red : COLORS.edgeDim, transparent: true, opacity: tone ? 0.55 : 0.9 });
    const line = new THREE.Line(geo, mat);
    if (tone === "blue") line.computeLineDistances();
    scene.add(line);
  });

  // —— packet ——
  const packet = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 24, 16),
    new THREE.MeshBasicMaterial({ color: COLORS.red })
  );
  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 24, 16),
    new THREE.MeshBasicMaterial({ color: COLORS.red, transparent: true, opacity: 0.18, depthWrite: false })
  );
  packet.add(halo);
  const glow = new THREE.PointLight(COLORS.red, 0.9, 2.2, 2);
  packet.add(glow);
  packet.visible = false;
  scene.add(packet);

  // faint trail of the current hop
  const trailMat = new THREE.LineBasicMaterial({ color: COLORS.red, transparent: true, opacity: 0.45 });
  const trail = new THREE.Line(new THREE.BufferGeometry(), trailMat);
  trail.visible = false;
  scene.add(trail);

  let hop = null; // { curve, start, to }
  let activeId = null;

  const setActive = (id) => {
    if (activeId && nodes[activeId]) {
      const n = nodes[activeId];
      n.edgeMat.color.setHex(n.baseEdge);
      n.el.classList.remove("lp3d-label--active");
    }
    activeId = id;
    if (id && nodes[id]) {
      nodes[id].edgeMat.color.setHex(COLORS.red);
      nodes[id].el.classList.add("lp3d-label--active");
    }
  };

  const setStep = (path) => {
    if (!path) {
      hop = null;
      packet.visible = false;
      trail.visible = false;
      setActive(null);
      return;
    }
    const [fromId, toId] = path;
    const p0 = roofPoint(BLOCKS[fromId]);
    const p2 = roofPoint(BLOCKS[toId]);
    const mid = p0.clone().lerp(p2, 0.5);
    mid.y = Math.max(p0.y, p2.y) + 1.1 + p0.distanceTo(p2) * 0.12;
    const curve = new THREE.QuadraticBezierCurve3(p0, mid, p2);
    trail.geometry.dispose();
    trail.geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
    trail.visible = true;
    packet.visible = true;
    packet.scale.setScalar(1);
    hop = { curve, start: performance.now(), to: toId };
    if (reducedMotion) {
      packet.position.copy(p2);
      setActive(toId);
    }
  };

  // —— loop ——
  let raf = 0;
  let running = false;
  const tick = (now) => {
    if (hop && !reducedMotion) {
      const t = Math.min(1, (now - hop.start) / TRAVEL_MS);
      const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      packet.position.copy(hop.curve.getPoint(eased));
      trailMat.opacity = 0.45 * (1 - t * 0.6);
      // shrink on arrival so the packet never sits hidden under a label
      packet.scale.setScalar(t < 0.85 ? 1 : Math.max(0.001, 1 - (t - 0.85) / 0.15));
      if (t >= 1 && activeId !== hop.to) setActive(hop.to);
    }

    // idle: drift gently around the home view (and ease back after a drag)
    if (!dragging && now - lastInteraction > 2500) {
      const offset = camera.position.clone().sub(controls.target);
      const sph = new THREE.Spherical().setFromVector3(offset);
      const sway = reducedMotion ? 0 : Math.sin(now / 5200) * 0.22;
      sph.theta += (home.theta + sway - sph.theta) * 0.02;
      sph.phi += (home.phi - sph.phi) * 0.02;
      sph.radius += (home.radius - sph.radius) * 0.05;
      camera.position.setFromSpherical(sph).add(controls.target);
    }
    halo.scale.setScalar(1 + Math.sin(now / 180) * 0.12);
    controls.update();
    renderer.render(scene, camera);
    labels.render(scene, camera);
    if (running) raf = requestAnimationFrame(tick);
  };

  const play = () => {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(tick);
  };
  const pause = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  let dragging = false;
  let lastInteraction = 0;
  controls.addEventListener("start", () => {
    dragging = true;
  });
  controls.addEventListener("end", () => {
    dragging = false;
    lastInteraction = performance.now();
  });

  const onResize = () => {
    const w = width();
    const h = height();
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    home.radius = fitRadius();
    renderer.setSize(w, h);
    labels.setSize(w, h);
    if (!running) {
      renderer.render(scene, camera);
      labels.render(scene, camera);
    }
  };
  const ro = new ResizeObserver(onResize);
  ro.observe(container);

  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !document.hidden) play();
    else pause();
  });
  io.observe(container);
  const onVisibility = () => (document.hidden ? pause() : play());
  document.addEventListener("visibilitychange", onVisibility);

  // first frame immediately so there is never an empty box
  renderer.render(scene, camera);
  labels.render(scene, camera);

  const dispose = () => {
    pause();
    io.disconnect();
    ro.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    controls.dispose();
    scene.traverse((obj) => {
      obj.geometry?.dispose?.();
      const m = obj.material;
      if (Array.isArray(m)) m.forEach((x) => x.dispose());
      else m?.dispose?.();
    });
    renderer.dispose();
    renderer.domElement.remove();
    labels.domElement.remove();
  };

  return { setStep, dispose };
};
