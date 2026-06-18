"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

export default function FashionPhysicsBox() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const { Engine, Render, Runner, Bodies, Composite, Body, Vector } = Matter;

    // 1. Initialize Engine with low gravity to make items feel lighter (like air can lift them)
    const engine = Engine.create({
      gravity: { y: 0.25, x: 0 }, 
    });
    const world = engine.world;

    // Grab current container bounds
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 2. Setup Renderer bounded exactly to our canvas element dimensions
    const render = Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: width,
        height: height,
        background: "transparent", // Transparent to blend seamlessly with container CSS background
        wireframes: false,         // Must be false to allow image sprites to render
      },
    });

    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    // 3. Static boundaries tightly fitting the specific component box
    const wallThickness = 60;
    const wallOptions = { isStatic: true, render: { visible: false } };

    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, wallOptions);
    const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, wallOptions);
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, wallOptions);

    Composite.add(world, [ground, leftWall, rightWall, ceiling]);

    // 4. Fashion Icon Configs (Make sure these exist in your public/icons/ directory)
    const fashionIcons = [
      { url: "/tshirt.png", scale: 0.6 },
      { url: "/dress.png", scale: 0.6 },
      { url: "/fashion.png", scale: 0.5 },
      { url: "/dress2.png", scale: 0.6 },
      { url: "/fashion.png", scale: 0.5 },
    ];

    const elements= [];
    const totalItems = 35; // Adjust the density/number of items inside the box here

    // 5. Spawn Physics Objects with Sprites
    for (let i = 0; i < totalItems; i++) {
      const x = Math.random() * (width - 120) + 60;
      const y = Math.random() * (height - 120) + 60;
      
      const icon = fashionIcons[Math.floor(Math.random() * fashionIcons.length)];
      const radius = 24; // Circular boundary used under-the-hood for smooth rolling

      const item = Bodies.circle(x, y, radius, {
        restitution: 0.6,   // Bounciness factor
        frictionAir: 0.03,  // Higher values simulate air resistance/floating
        render: {
          sprite: {
            texture: icon.url,
            xScale: icon.scale,
            yScale: icon.scale
          }
        }
      });

      elements.push(item);
    }

    Composite.add(world, elements);

    // 6. Scroll interaction simulation: "Turbulent Air / Wind Blow" effect
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (Math.abs(deltaY) < 1) return;

      // Determine wind energy from scroll speed velocity
      const forceMagnitude = Math.min(Math.abs(deltaY) * 0.0006, 0.035);

      elements.forEach((element) => {
        // Wind blows sideways depending on scroll direction, accompanied by chaotic upward gusts
        const windDirectionX = deltaY > 0 ? 1 : -1; 
        
        Body.applyForce(element, element.position, {
          x: (windDirectionX * forceMagnitude * 1.5) + (Math.random() - 0.5) * 0.02,
          y: -forceMagnitude * (Math.random() * 2.5) // Stronger upward lift to fight gravity
        });
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // 7. Dynamic Window Resizing containment adjustment
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      render.canvas.width = newWidth;
      render.canvas.height = newHeight;

      Body.setPosition(ground, Vector.create(newWidth / 2, newHeight + wallThickness / 2));
      Body.setPosition(rightWall, Vector.create(newWidth + wallThickness / 2, newHeight / 2));
    };

    window.addEventListener("resize", handleResize);

    // Cleanup physics processes on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full min-h-[450px] overflow-hidden bg-neutral-50 rounded-3xl border border-neutral-200 shadow-inner"
    >
      {/* Target Canvas Layer for Matter.js engine rendering */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-10" 
      />

      {/* Embedded UI content displayed behind the floating elements */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-0 p-8 text-center select-none">
        <span className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-2">
          Interactive Sandbox
        </span>
        <h3 className="text-4xl font-black tracking-tight text-neutral-800 uppercase">
          Summer Lookbook
        </h3>
        <p className="text-sm text-neutral-500 mt-2 max-w-xs">
          Scroll up or down anywhere on the page to watch the wardrobe items react to the wind.
        </p>
      </div>
    </div>
  );
}