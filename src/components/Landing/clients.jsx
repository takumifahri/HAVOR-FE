"use client"

import { motion, useAnimation } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"

export default function Clients() {
    const scrollRef = useRef(null)
    const contentRef = useRef(null)
    const controls = useAnimation()
    const [contentWidth, setContentWidth] = useState(0)

    const clients = [
        "Aqua-logo.png",
        "bigstore-logo.webp",
        "changi-airport-logo.png",
        "INTILAND-logo.png",
        "Semen-tiga-roda.jpg",
        "shop-n-drive-logo.jpg",
        "Bubu-logo.webp",
        "Alfamidi.png",
        "bisnis.gif",
    ];

    // Triple the images for better seamless loop
    const duplicatedClientImages = [...clients, ...clients, ...clients]

    useEffect(() => {
        const measureContentWidth = () => {
            if (contentRef.current) {
                // Calculate the width of one set of clients (1/3 of the tripled content)
                const singleSetWidth = contentRef.current.scrollWidth / 3
                setContentWidth(singleSetWidth)
            }
        }

        // Measure initially
        measureContentWidth()

        // Re-measure on window resize to adjust animation if layout changes
        window.addEventListener("resize", measureContentWidth)
        return () => window.removeEventListener("resize", measureContentWidth)
    }, [])

    useEffect(() => {
        if (contentWidth > 0) {
            // Start infinite animation
            const animationDuration = contentWidth / 30 // Adjust speed (30px per second)

            controls.start({
                x: -contentWidth, // Animate by the width of one set of clients
                transition: {
                    duration: animationDuration,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                },
            })
        }
    }, [contentWidth, controls])

    const handleMouseEnter = () => {
        controls.stop() // Stop the animation when mouse enters
    }

    const handleMouseLeave = () => {
        if (contentWidth > 0) {
            // Resume animation when mouse leaves
            const animationDuration = contentWidth / 30
            controls.start({
                x: -contentWidth,
                transition: {
                    duration: animationDuration,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                },
            })
        }
    }

    // Variants untuk animasi fade in
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    }

    const titleVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    }

    const scrollerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                delay: 0.3,
                ease: "easeOut"
            }
        }
    }

    return (
        <motion.div
            id="clients"
            className="max-w-full mx-auto px-4 py-16 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.h2
                className="text-2xl md:text-4xl text-center font-bold mb-8"
                variants={titleVariants}
            >
                Our Clients
            </motion.h2>

            {/* Container for seamless scrolling */}
            <motion.div
                className="relative overflow-hidden"
                variants={scrollerVariants}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <motion.div
                    ref={contentRef}
                    className="flex space-x-8 items-center"
                    animate={controls}
                    style={{ width: 'max-content' }}
                >
                    {duplicatedClientImages.map((query, index) => (
                        <motion.div
                            key={index}
                            className="flex-shrink-0 w-32 h-20 flex items-center justify-center mx-4"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <Image
                                src={`/assets/Clients/${query}`}
                                alt={query}
                                width={128}
                                height={80}
                                className="object-contain max-w-full max-h-full opacity-70 hover:opacity-100 transition-opacity duration-300"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    )
}