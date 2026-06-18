"use client";

import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

const ITEMS = [
  { id: 1, emoji: "👗", link: "https://www.zara.com/us/en/woman-dresses-l1066.html" },
  { id: 2, emoji: "👕", link: "https://www.hm.com/us/products/t-shirts" },
  { id: 3, emoji: "👠", link: "https://www.asos.com/women/shoes/heels" },
  { id: 4, emoji: "👒", link: "https://www.nordstrom.com/sr?keyword=sun+hat" },
  { id: 5, emoji: "👜", link: "https://www.shopbop.com/bags" },
  { id: 6, emoji: "🕶️", link: "https://www.warbyparker.com/sunglasses" },
  { id: 7, emoji: "🧣", link: "https://www.hermes.com/us/en/category/women/scarves-and-silks/" },
  { id: 8, emoji: "👟", link: "https://www.nike.com/w/womens-shoes" },
  { id: 9, emoji: "💍", link: "https://www.mejuri.com/collections/rings" },
  { id: 10, emoji: "🧥", link: "https://www.burberry.com/trench-coats" },
  { id: 11, emoji: "🩱", link: "https://www.aerie.com/swim" },
  { id: 12, emoji: "🧤", link: "https://www.nordstrom.com/sr?keyword=gloves" },
];

export default function InteractiveLookbook() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const textContainerRef = useRef(null);
  const engineRef = useRef(null);
  const bodiesRef = useRef([]);
  const hoveredIdRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!wrapRef.current || !canvasRef.current) return;

    const { Engine, Bodies, Composite, Body, Runner } = Matter;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let cw = wrap.clientWidth;
    let ch = wrap.clientHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = cw * dpr;
    canvas.height = ch * dpr;
    canvas.style.width = `${cw}px`;
    canvas.style.height = `${ch}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Keep gravity very low so they settle slowly but float nicely
    const engine = Engine.create({
      gravity: { x: 0, y: 0.01 }, 
    });
    engineRef.current = engine;

    const world = engine.world;
    const runner = Runner.create();
    Runner.run(runner, engine);

    const createWalls = () => {
      const T = 80;
      return [
        Bodies.rectangle(cw / 2, ch + T / 2, cw + T * 2, T, { isStatic: true, render: { visible: false } }),
        Bodies.rectangle(-T / 2, ch / 2, T, ch + T * 2, { isStatic: true, render: { visible: false } }),
        Bodies.rectangle(cw + T / 2, ch / 2, T, ch + T * 2, { isStatic: true, render: { visible: false } }),
        Bodies.rectangle(cw / 2, -T / 2, cw + T * 2, T, { isStatic: true, render: { visible: false } }),
      ];
    };

    let walls = createWalls();
    Composite.add(world, walls);

    const isMobile = () => window.innerWidth < 640;
    const getCount = () => (isMobile() ? 10 : window.innerWidth < 1024 ? 16 : 22);
    const getIconSize = () => (isMobile() ? 28 : 36);

    const spawnBodies = () => {
      const items = [];
      const count = getCount();

      for (let i = 0; i < count; i++) {
        const item = ITEMS[i % ITEMS.length];
        const r = isMobile() ? 16 : 20;
        
        // UPDATE: Group everything at the bottom center to start
        const x = cw / 2 + (Math.random() - 0.5) * 150;
        const y = ch - 50 + (Math.random() - 0.5) * 40;

        const body = Bodies.circle(x, y, r, {
          restitution: 0.8, // Bouncier for a better scatter
          frictionAir: 0.02, // Lower air friction so they move faster when pushed
          friction: 0.01,
          render: { visible: false },
        });

        body._fid = item.id;
        
        // Very low initial velocity so they stay pooled at the bottom until hovered
        Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
        });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);
        items.push(body);
      }

      bodiesRef.current = items;
      Composite.add(world, items);
    };

    spawnBodies();

    const draw = () => {
      ctx.clearRect(0, 0, cw, ch);
      const bodies = bodiesRef.current;
      const iconSize = getIconSize();

      bodies.forEach((b) => {
        const item = ITEMS.find((f) => f.id === b._fid);
        if (!item) return;

        const hovered = hoveredIdRef.current === b._fid;

        ctx.save();
        ctx.translate(b.position.x, b.position.y);
        ctx.rotate(b.angle * 0.08);

        if (hovered) {
          ctx.shadowColor = "rgba(0,0,0,0.2)";
          ctx.shadowBlur = 18;
          ctx.shadowOffsetY = 8;
          ctx.scale(1.18, 1.18);
        } else {
          ctx.shadowColor = "rgba(0,0,0,0.12)";
          ctx.shadowBlur = 10;
          ctx.shadowOffsetY = 5;
        }

        ctx.font = `${iconSize}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.emoji, 0, 0);
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const sx = cw / rect.width;
      const sy = ch / rect.height;
      return {
        x: (e.clientX - rect.left) * sx,
        y: (e.clientY - rect.top) * sy,
      };
    };

    const handleMouseMove = (e) => {
      const { x: mx, y: my } = getPos(e);
      const radius = 250; 
      const iconHit = getIconSize();

      let found = null;

      // --- CANVAS ELEMENTS REPULSION ---
      bodiesRef.current.forEach((b) => {
        const dx = b.position.x - mx;
        const dy = b.position.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius && dist > 1) {
          // UPDATE: Force magnitude increased drastically for fast scatter
          const forceMagnitude = Math.pow((radius - dist) / radius, 2) * 0.08; 
          Body.applyForce(b, b.position, {
            x: (dx / dist) * forceMagnitude,
            y: (dy / dist) * forceMagnitude,
          });
        }

        if (dist < iconHit) found = b._fid;
      });

      // --- HTML TEXT REPULSION ---
      if (textContainerRef.current) {
        const spans = textContainerRef.current.querySelectorAll("span");
        const textRadius = 150;

        spans.forEach((span) => {
          const rect = span.getBoundingClientRect();
          const spanCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };
          
          const dx = spanCenter.x - e.clientX;
          const dy = spanCenter.y - e.clientY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < textRadius) {
            const push = ((textRadius - dist) / textRadius) * 20; 
            span.style.transform = `translate(${(dx / dist) * push}px, ${(dy / dist) * push}px)`;
          } else {
            span.style.transform = `translate(0px, 0px)`;
          }
        });
      }

      hoveredIdRef.current = found;
      canvas.style.cursor = found ? "pointer" : "default";
    };

    const handleLeave = () => {
      hoveredIdRef.current = null;
      canvas.style.cursor = "default";
      
      if (textContainerRef.current) {
        const spans = textContainerRef.current.querySelectorAll("span");
        spans.forEach((span) => {
          span.style.transform = `translate(0px, 0px)`;
        });
      }
    };

    const handleClick = (e) => {
      const { x: cx, y: cy } = getPos(e);
      const iconHit = getIconSize();

      bodiesRef.current.forEach((b) => {
        const dx = b.position.x - cx;
        const dy = b.position.y - cy;
        if (Math.sqrt(dx * dx + dy * dy) < iconHit) {
          const item = ITEMS.find((f) => f.id === b._fid);
          if (item) window.open(item.link, "_blank", "noopener,noreferrer");
        }
      });
    };

    const handleScroll = () => {
      bodiesRef.current.forEach((b) => {
        Body.applyForce(b, b.position, {
          x: (Math.random() - 0.5) * 0.005,
          y: -0.005,
        });
      });
    };

    const handleResize = () => {
      cw = wrap.clientWidth;
      ch = wrap.clientHeight;
      const dpr2 = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = cw * dpr2;
      canvas.height = ch * dpr2;
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      ctx.setTransform(dpr2, 0, 0, dpr2, 0, 0);

      Composite.clear(world, false);
      walls = createWalls();
      Composite.add(world, walls);
      Composite.add(world, bodiesRef.current);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, []);

  const renderInteractiveText = (text) => {
    return text.split("").map((char, index) => (
      <span 
        key={index} 
        className="inline-block transition-transform duration-200 ease-out"
        style={{ whiteSpace: "pre" }}
      >
        {char}
      </span>
    ));
  };

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-[520px] max-sm:h-[360px] overflow-hidden bg-[#f3f2f8] text-4xl"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-20 w-full h-full block" />
      
      <div className="absolute inset-0 z-[5] pointer-events-none flex flex-col items-center justify-center text-center">
        <div 
          ref={textContainerRef}
          className="capitalize lg:text-3xl text-5xl font-black tracking-tight text-black leading-9"
        >
          <div>{renderInteractiveText("Float into")}</div>
          <div>{renderInteractiveText("fashion..")}</div>
        </div>
      </div>
    </div>
  );
}