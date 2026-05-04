import React, { useRef, useState, useEffect, useMemo } from "react";
import { stats } from "../data";

export default function StatsSection() {
  const sectionRef = useRef(null);
  const floatingLayerRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const spriteCacheRef = useRef(new Map());
  const boundsRef = useRef({ width: 0, height: 0, dpr: 1 });
  const animationFrameRef = useRef(null);
  const lastTimestampRef = useRef(0);

  const [showCards, setShowCards] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileProgress, setMobileProgress] = useState(0);

  const floatingOrbs = useMemo(() => {
    const orbCount = isMobile ? 18 : 36;
    return Array.from({ length: orbCount }, (_, index) => ({
      id: index + 1,
      size: 1.1 + ((index * 5) % 0.7),
    }));
  }, [isMobile]);

  const randomBetween = (min, max) => min + Math.random() * (max - min);

  const getParticleSprite = (radius) => {
    const cacheKey = Math.round(radius * 4) / 4;
    const cachedSprite = spriteCacheRef.current.get(cacheKey);
    if (cachedSprite) return cachedSprite;

    const spriteSize = Math.max(24, Math.ceil(cacheKey * 7));
    const sprite = document.createElement("canvas");
    sprite.width = spriteSize;
    sprite.height = spriteSize;

    const spriteContext = sprite.getContext("2d");
    if (!spriteContext) return null;

    const center = spriteSize / 2;
    const haloRadius = spriteSize * 0.34;

    spriteContext.globalCompositeOperation = "lighter";

    const halo = spriteContext.createRadialGradient(
      center,
      center,
      0,
      center,
      center,
      haloRadius
    );
    halo.addColorStop(0, "rgba(255, 248, 190, 0.45)");
    halo.addColorStop(0.24, "rgba(255, 228, 96, 0.24)");
    halo.addColorStop(0.56, "rgba(254, 190, 47, 0.08)");
    halo.addColorStop(1, "rgba(254, 190, 47, 0)");

    spriteContext.fillStyle = halo;
    spriteContext.beginPath();
    spriteContext.arc(center, center, haloRadius, 0, Math.PI * 2);
    spriteContext.fill();

    const core = spriteContext.createRadialGradient(
      center,
      center,
      0,
      center,
      center,
      cacheKey * 1.1
    );
    core.addColorStop(0, "rgba(255, 251, 226, 0.95)");
    core.addColorStop(0.38, "rgba(255, 230, 92, 0.88)");
    core.addColorStop(1, "rgba(254, 190, 47, 0.82)");

    spriteContext.fillStyle = core;
    spriteContext.beginPath();
    spriteContext.arc(center, center, cacheKey * 1.1, 0, Math.PI * 2);
    spriteContext.fill();

    spriteCacheRef.current.set(cacheKey, sprite);
    return sprite;
  };

  const createParticle = (orb, width, height) => {
    const radius = orb.size;
    const speed = randomBetween(18, 58);
    const angle = randomBetween(0, Math.PI * 2);
    const mass = Math.max(0.8, radius * radius);

    return {
      id: orb.id,
      r: radius,
      mass,
      x: randomBetween(radius, width - radius),
      y: randomBetween(radius, height - radius),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
    };
  };

  useEffect(() => {
    const updateViewport = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (isMobile) return;

    const preventDefault = (e) => {
      if (e.cancelable) e.preventDefault();
    };

    const handleWheel = (e) => {
      if (isLocked || window.innerWidth < 1024) return;

      const rect = section.getBoundingClientRect();
      const viewportMid = window.innerHeight / 2;
      const sectionMid = rect.top + rect.height / 2;

      if (Math.abs(sectionMid - viewportMid) < 60) {
        if (!showCards && e.deltaY > 0) {
          preventDefault(e);
          setIsLocked(true);
          setShowCards(true);

          window.scrollTo({
            top: window.scrollY + (sectionMid - viewportMid),
            behavior: "smooth",
          });

          setTimeout(() => setIsLocked(false), 1000);
        } else if (showCards && e.deltaY < 0) {
          preventDefault(e);
          setIsLocked(true);
          setShowCards(false);

          window.scrollTo({
            top: window.scrollY + (sectionMid - viewportMid),
            behavior: "smooth",
          });

          setTimeout(() => setIsLocked(false), 1000);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [showCards, isLocked, isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section || !isMobile) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Natural scroll progress:
      // Start when 20% visible, finish when 80% through
      const start = vh * 0.9;
      const end = vh * 0.1; 
      
      const progress = (start - rect.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, progress));

      setMobileProgress(clamped);
    };

    if (isMobile) {
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  useEffect(() => {
    const layer = floatingLayerRef.current;
    const canvas = canvasRef.current;
    if (!layer || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const measureAndMaybeInit = (shouldInitialize = false) => {
      const { width, height } = layer.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const previous = boundsRef.current;
      const nextWidth = Math.max(width, 1);
      const nextHeight = Math.max(height, 1);

      if (shouldInitialize || !particlesRef.current.length) {
        boundsRef.current = { width: nextWidth, height: nextHeight, dpr };
        particlesRef.current = floatingOrbs.map((orb) =>
          createParticle(orb, nextWidth, nextHeight)
        );
        canvas.width = Math.floor(nextWidth * dpr);
        canvas.height = Math.floor(nextHeight * dpr);
        canvas.style.width = `${nextWidth}px`;
        canvas.style.height = `${nextHeight}px`;
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        return;
      }

      const scaleX = previous.width ? nextWidth / previous.width : 1;
      const scaleY = previous.height ? nextHeight / previous.height : 1;

      particlesRef.current.forEach((particle) => {
        particle.x *= scaleX;
        particle.y *= scaleY;
      });

      boundsRef.current = { width: nextWidth, height: nextHeight, dpr };
      canvas.width = Math.floor(nextWidth * dpr);
      canvas.height = Math.floor(nextHeight * dpr);
      canvas.style.width = `${nextWidth}px`;
      canvas.style.height = `${nextHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    measureAndMaybeInit(true);

    const resizeObserver = new ResizeObserver(() => {
      measureAndMaybeInit(false);
    });

    resizeObserver.observe(layer);

    const resolveCollisions = () => {
      const particles = particlesRef.current;
      const cellSize = 56;
      const grid = new Map();

      const getCellKey = (x, y) => `${Math.floor(x / cellSize)},${Math.floor(y / cellSize)}`;

      particles.forEach((particle, index) => {
        const key = getCellKey(particle.x, particle.y);
        const bucket = grid.get(key);
        if (bucket) {
          bucket.push(index);
        } else {
          grid.set(key, [index]);
        }
      });

      for (let i = 0; i < particles.length; i += 1) {
        const first = particles[i];
        const cellX = Math.floor(first.x / cellSize);
        const cellY = Math.floor(first.y / cellSize);
        const tested = new Set();

        for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
          for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
            const neighborKey = `${cellX + offsetX},${cellY + offsetY}`;
            const candidates = grid.get(neighborKey);

            if (!candidates) continue;

            for (let candidateIndex = 0; candidateIndex < candidates.length; candidateIndex += 1) {
              const j = candidates[candidateIndex];
              if (j <= i || tested.has(j)) continue;

              tested.add(j);
              const second = particles[j];

              const dx = second.x - first.x;
              const dy = second.y - first.y;
              const distance = Math.hypot(dx, dy) || 0.0001;
              const minDistance = first.r + second.r;

              if (distance >= minDistance) continue;

              const nx = dx / distance;
              const ny = dy / distance;
              const overlap = minDistance - distance;
              const inverseMass1 = 1 / first.mass;
              const inverseMass2 = 1 / second.mass;
              const inverseMassSum = inverseMass1 + inverseMass2;

              const correction = overlap / inverseMassSum;
              first.x -= nx * correction * inverseMass1;
              first.y -= ny * correction * inverseMass1;
              second.x += nx * correction * inverseMass2;
              second.y += ny * correction * inverseMass2;

              const relativeVelocityX = first.vx - second.vx;
              const relativeVelocityY = first.vy - second.vy;
              const velocityAlongNormal = relativeVelocityX * nx + relativeVelocityY * ny;

              if (velocityAlongNormal >= 0) continue;

              const restitution = 0.86;
              const impulse = (-(1 + restitution) * velocityAlongNormal) / inverseMassSum;
              const impulseX = impulse * nx;
              const impulseY = impulse * ny;

              first.vx += impulseX * inverseMass1;
              first.vy += impulseY * inverseMass1;
              second.vx -= impulseX * inverseMass2;
              second.vy -= impulseY * inverseMass2;
            }
          }
        }
      }
    };

    const tick = (timestamp) => {
      const particles = particlesRef.current;
      const { width, height } = boundsRef.current;
      const deltaTime = lastTimestampRef.current
        ? Math.min((timestamp - lastTimestampRef.current) / 1000, 0.025)
        : 0.016;

      lastTimestampRef.current = timestamp;

      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.vx * deltaTime;
        particle.y += particle.vy * deltaTime;

        if (particle.x < -particle.r) {
          particle.x = width + particle.r;
        } else if (particle.x > width + particle.r) {
          particle.x = -particle.r;
        }

        if (particle.y < -particle.r) {
          particle.y = height + particle.r;
        } else if (particle.y > height + particle.r) {
          particle.y = -particle.r;
        }
      });

      resolveCollisions();

      particles.forEach((particle) => {
        const sprite = getParticleSprite(particle.r);
        if (!sprite) return;

        const drawSize = sprite.width;
        context.globalAlpha = 0.74;
        context.drawImage(sprite, particle.x - drawSize / 2, particle.y - drawSize / 2);
      });

      context.globalAlpha = 1;
      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    animationFrameRef.current = window.requestAnimationFrame(tick);

    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [floatingOrbs]);

  const HeadingContent = () => (
    <>
      <span className="text-gold-gradient">32% Financial Advisors</span>{" "}
      <span className="text-white-gradient">globally now invest</span>
      <br />
      <span className="text-white-gradient">
        crypto for client accounts — up from 11% in 2023
      </span>
    </>
  );

  const mobileHeadingOpacity = 1 - Math.min(mobileProgress * 2, 1);
  const mobileHeadingY = -24 * mobileProgress;
  const mobileHeadingScale = 1 - mobileProgress * 0.04;
  const mobileHeadingBlur = mobileProgress * 4;

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="network-bg" aria-hidden="true" />
      <div className="gold-floating-layer" aria-hidden="true" ref={floatingLayerRef}>
        <canvas className="gold-floating-canvas" ref={canvasRef} />
      </div>

      <div className="stats-content-inner">
        {isMobile ? (
          <h2
            className="stat-heading-mobile"
            style={{
              opacity: mobileHeadingOpacity,
              transform: `translate(-50%, calc(-50% + ${mobileHeadingY}px)) scale(${mobileHeadingScale})`,
              filter: `blur(${mobileHeadingBlur}px)`,
              transition: "opacity 0.25s linear, transform 0.25s ease-out, filter 0.25s linear",
              textAlign: "center",
              zIndex: mobileProgress > 0.5 ? 1 : 2
            }}
          >
            <HeadingContent />
          </h2>
        ) : (
          <div
            className="split-text-container"
            style={{ pointerEvents: showCards ? "none" : "auto" }}
          >
            <h2
              className="stat-heading split left"
              style={{
                opacity: showCards ? 0 : 1,
                transform: `translate(calc(-50% - ${showCards ? "60vw" : "0px"}), -50%)`,
                transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <HeadingContent />
            </h2>
            <h2
              className="stat-heading split right"
              style={{
                opacity: showCards ? 0 : 1,
                transform: `translate(calc(-50% + ${showCards ? "60vw" : "0px"}), -50%)`,
                transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <HeadingContent />
            </h2>
          </div>
        )}

        <div
          className="stat-grid"
          style={{
            opacity: isMobile ? (mobileProgress > 0.3 ? 1 : 0) : showCards ? 1 : 0,
            transform: isMobile
              ? `translate(-50%, calc(-50% + ${40 - mobileProgress * 40}px))`
              : `translate(-50%, -50%) scale(${showCards ? 1 : 0.95})`,
            transition: isMobile
              ? "opacity 0.4s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
              : "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
            pointerEvents: isMobile ? (mobileProgress > 0.5 ? "auto" : "none") : showCards ? "auto" : "none",
            position: "absolute",
            top: "50%",
            left: "50%",
            margin: "0",
            width: isMobile ? "calc(100% - 40px)" : "auto"
          }}
        >
          {stats.map((stat, idx) => {
            const cardStart = 0.4 + idx * 0.08;
            const cardProgress = isMobile
              ? Math.max(0, Math.min(1, (mobileProgress - cardStart) / 0.2))
              : showCards
              ? 1
              : 0;

            return (
              <article
                className="stat-card"
                key={idx}
                style={{
                  opacity: isMobile ? cardProgress : 1,
                  transform: isMobile
                    ? `translateY(${36 - cardProgress * 36}px) scale(${0.96 + cardProgress * 0.04})`
                    : "none",
                  filter: isMobile ? `blur(${(1 - cardProgress) * 5}px)` : "none",
                  transition: isMobile
                    ? "opacity 0.2s linear, transform 0.2s linear, filter 0.2s linear"
                    : "transform 0.3s ease",
                  transitionDelay: !isMobile ? `${idx * 0.1}s` : "0s",
                }}
              >
                <div className="stat-number-box">
                  <span className="stat-value-ghost">{stat.value}</span>
                  <span className="stat-value-main">{stat.value}</span>
                </div>
                <p className="stat-label-text">{stat.label}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
