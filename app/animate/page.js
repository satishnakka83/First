"use client";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";


function CharacterReveal({ text }) {
    const letters = text.split("");

    return (
        <h1 className="text-5xl font-bold overflow-hidden">
            {letters.map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        delay: index * 0.04,
                        duration: 0.6,
                        ease: "easeOut",
                    }}
                    className="inline-block"
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </h1>
    );
}

function BlurReveal({ children }) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                filter: "blur(20px)",
                y: 50,
            }}
            whileInView={{
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
            }}
            viewport={{ once: true }}
            transition={{
                duration: 1,
            }}
        >
            {children}
        </motion.div>
    );
}

function FashionMarquee() {
    return (
        <div className="overflow-hidden py-4 border-y">
            <motion.div
                animate={{
                    x: ["0%", "-50%"],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="flex whitespace-nowrap text-3xl font-semibold"
            >
                <div>
                    NEW ARRIVALS • MEN • WOMEN • KIDS • PREMIUM BRANDS •
                    NEW ARRIVALS • MEN • WOMEN • KIDS • PREMIUM BRANDS •
                </div>
            </motion.div>
        </div>
    );
}

function VerticalTextSwap() {
    const [index, setIndex] = useState(0);
    const words = [
        "Shop",
        "Wear",
        "Style",
        "Repeat",
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-16 overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.h2
                    key={words[index]}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl font-bold"
                >
                    {words[index]}
                </motion.h2>
            </AnimatePresence>
        </div>
    );
}
function HoverRollLink({ text, href }) {
    return (
        <motion.a
            href={href}
            initial="initial"
            whileHover="hover"
            className="relative block overflow-hidden font-medium text-white uppercase cursor-pointer"
        >
            <motion.div
                variants={{
                    initial: { y: 0 },
                    hover: { y: "-100%" },
                }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            >
                {text}
            </motion.div>
            <motion.div
                className="absolute top-0 left-0"
                variants={{
                    initial: { y: "100%" },
                    hover: { y: 0 },
                }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            >
                {text}
            </motion.div>
        </motion.a>
    );
}

function SplitCharacterText({ text, className }) {
    const letters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            rotateY: 0,
            transition: { type: "spring", damping: 12, stiffness: 100 },
        },
        hidden: {
            opacity: 0,
            x: -20,
            y: 10,
            rotateY: 90,
        },
    };

    return (
        <motion.h2
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`flex space-x-[2px] overflow-hidden ${className}`}
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index} className="inline-block">
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.h2>
    );
}

function ParallaxScrollText({ text, className }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Moves the text down as you scroll past it, creating a parallax effect
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

    return (
        <div ref={ref} className="py-20 w-full flex justify-center overflow-hidden">
            <motion.div style={{ y, opacity }} className={className}>
                {text}
            </motion.div>
        </div>
    );
}



export default function App() {
    return (
        <>
            <div className="flex flex-col gap-y-10">
                <CharacterReveal text="Fashion Delivered in Minutes" />
                <BlurReveal>Premium Fashion Delivered in 30 Minutes</BlurReveal>
                <FashionMarquee />
                <VerticalTextSwap />
                <HoverRollLink text="Shop Now or  late" href="/shop" />
                <SplitCharacterText text="ZUGET STUDIO" className="text-8xl tracking-tighter uppercase font-black" />
                <ParallaxScrollText text="The 2026 Lookbook" className="text-4xl italic font-serif" />
            </div>
        </>
    )
}