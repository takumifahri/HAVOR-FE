"use client"

import { motion, useAnimation } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import clientsData from '@/data/clients.json';

export default function Clients() {
    const scrollRef = useRef(null)
    const contentRef = useRef(null)
    const contentRef2 = useRef(null)
    const controls = useAnimation()
    const controls2 = useAnimation()
    const [contentWidth, setContentWidth] = useState(0)
    const [contentWidth2, setContentWidth2] = useState(0)
    const [clients, setClients] = useState([]);

    const getClients = async () => {
        try {
            console.log("Clients data:", clientsData);
            if (clientsData && clientsData.data) {
                setClients(clientsData.data);
            }
        } catch (error) {
            console.error("Error processing clients data:", error);
        }
    }

    useEffect(() => {
        getClients();
    }, []);

    // Function to create URL-friendly slug from client name
    const createSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-'); // Remove duplicate hyphens
    }

    // Split clients into two halves
    const midPoint = Math.ceil(clients.length / 2)
    const firstHalf = clients.slice(0, midPoint)
    const secondHalf = clients.slice(midPoint)

    // Triple each half for seamless loop
    const duplicatedFirstHalf = [...firstHalf, ...firstHalf, ...firstHalf]
    const duplicatedSecondHalf = [...secondHalf, ...secondHalf, ...secondHalf]

    useEffect(() => {
        const measureContentWidth = () => {
            if (contentRef.current) {
                const singleSetWidth = contentRef.current.scrollWidth / 3
                setContentWidth(singleSetWidth)
            }
            if (contentRef2.current) {
                const singleSetWidth2 = contentRef2.current.scrollWidth / 3
                setContentWidth2(singleSetWidth2)
            }
        }

        const timer = setTimeout(measureContentWidth, 100)
        measureContentWidth()

        window.addEventListener("resize", measureContentWidth)
        return () => {
            window.removeEventListener("resize", measureContentWidth)
            clearTimeout(timer)
        }
    }, [clients])

    useEffect(() => {
        if (contentWidth > 0 && contentWidth2 > 0) {
            const animationDuration1 = contentWidth / 40
            const animationDuration2 = contentWidth2 / 40

            const startFirstRow = () => {
                controls.set({ x: 0 })
                controls.start({
                    x: -contentWidth,
                    transition: {
                        duration: animationDuration1,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop",
                    },
                })
            }

            const startSecondRow = () => {
                controls2.set({ x: -contentWidth2 })
                controls2.start({
                    x: 0,
                    transition: {
                        duration: animationDuration2,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop",
                    },
                })
            }

            startFirstRow()
            startSecondRow()
        }
    }, [contentWidth, contentWidth2, controls, controls2])

    const handleMouseEnter = () => {
        controls.stop()
        controls2.stop()
    }

    const handleMouseLeave = () => {
        if (contentWidth > 0 && contentWidth2 > 0) {
            const animationDuration1 = contentWidth / 40
            const animationDuration2 = contentWidth2 / 40

            controls.start({
                x: -contentWidth,
                transition: {
                    duration: animationDuration1,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                },
            })

            controls2.start({
                x: 0,
                transition: {
                    duration: animationDuration2,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                },
            })
        }
    }

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
                duration: 1.5,
                delay: 0.3,
                ease: "easeOut"
            }
        }
    }

    return (
        <>
            <div className="py-16 lg:py-24">
                <motion.div
                    id="clients"
                    className="max-w-7xl mx-auto px-4  overflow-hidden"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {/* Header */}
                    <motion.div
                        className="text-center mb-16"
                        variants={titleVariants}
                    >
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                            OUR CLIENTS
                        </h2>
                        <div className="w-24  h-1 bg-gradient-to-r from-[#525254] to-[#3564A4] mx-auto rounded-full"></div>
                    </motion.div>
                </motion.div>

                <motion.div
                    id="clients"
                    className="max-w-full mx-auto px-4  overflow-hidden"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >


                    {/* Container for seamless scrolling */}
                    <motion.div
                        className="relative overflow-hidden space-y-8"
                        variants={scrollerVariants}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* First Container - First Half of Clients (Left to Right) */}
                        <motion.div
                            ref={contentRef}
                            className="flex space-x-8 items-center"
                            animate={controls}
                            style={{ width: 'max-content' }}
                            initial={{ x: 0 }}
                        >
                            {duplicatedFirstHalf.map((client, index) => (
                                <Link
                                    key={`first-${client.id}-${index}`}
                                    href={`/clients/${createSlug(client.name)}`}
                                    className="block"
                                >
                                    <motion.div
                                        className="flex-shrink-0 w-32 h-20 flex items-center justify-center mx-4 cursor-pointer"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.3 }
                                        }}
                                        title={client.name}
                                    >
                                        <Image
                                            src={`/assets/Clients/${client.image}`}
                                            alt={client.name}
                                            width={128}
                                            height={80}
                                            className="object-contain max-w-full max-h-full opacity-70 hover:opacity-100 transition-opacity duration-300"
                                        />
                                    </motion.div>
                                </Link>
                            ))}
                        </motion.div>

                        {/* Second Container - Second Half of Clients (Right to Left) */}
                        <motion.div
                            ref={contentRef2}
                            className="flex space-x-8 items-center"
                            animate={controls2}
                            style={{ width: 'max-content' }}
                            initial={{ x: 0 }}
                        >
                            {duplicatedSecondHalf.map((client, index) => (
                                <Link
                                    key={`second-${client.id}-${index}`}
                                    href={`/clients/${createSlug(client.name)}`}
                                    className="block"
                                >
                                    <motion.div
                                        className="flex-shrink-0 w-32 h-20 flex items-center justify-center mx-4 cursor-pointer"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.3 }
                                        }}
                                        title={client.name}
                                    >
                                        <Image
                                            src={`/assets/Clients/${client.image}`}
                                            alt={client.name}
                                            width={128}
                                            height={80}
                                            className="object-contain max-w-full max-h-full opacity-70 hover:opacity-100 transition-opacity duration-300"
                                        />
                                    </motion.div>
                                </Link>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

        </>

    )
}