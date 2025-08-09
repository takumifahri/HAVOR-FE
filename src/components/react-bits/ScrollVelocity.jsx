import { useRef, useLayoutEffect, useState } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
} from "framer-motion";
import Image from "next/image";

function useElementWidth(ref) {
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        function updateWidth() {
            if (ref.current) {
                setWidth(ref.current.offsetWidth);
            }
        }
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, [ref]);

    return width;
}

export const ScrollVelocityImages = ({
    scrollContainerRef,
    images = [],
    velocity = 100,
    className = "",
    damping = 50,
    stiffness = 400,
    numCopies = 6,
    velocityMapping = { input: [0, 1000], output: [0, 5] },
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle,
    imagesPerRow = 6, // Tambahan: jumlah gambar per baris
}) => {
    // Fungsi untuk membagi gambar menjadi beberapa baris
    const chunkArray = (array, size) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    };

    // Bagi gambar menjadi beberapa baris
    const imageRows = chunkArray(images, imagesPerRow);

    function VelocityImageRow({
        rowImages,
        baseVelocity = velocity,
        scrollContainerRef,
        className = "",
        damping,
        stiffness,
        numCopies,
        velocityMapping,
        parallaxClassName,
        scrollerClassName,
        parallaxStyle,
        scrollerStyle,
    }) {
        const baseX = useMotionValue(0);
        const scrollOptions = scrollContainerRef
            ? { container: scrollContainerRef }
            : {};
        const { scrollY } = useScroll(scrollOptions);
        const scrollVelocity = useVelocity(scrollY);
        const smoothVelocity = useSpring(scrollVelocity, {
            damping: damping ?? 50,
            stiffness: stiffness ?? 400,
        });
        const velocityFactor = useTransform(
            smoothVelocity,
            velocityMapping?.input || [0, 1000],
            velocityMapping?.output || [0, 5],
            { clamp: false }
        );

        const copyRef = useRef(null);
        const copyWidth = useElementWidth(copyRef);

        function wrap(min, max, v) {
            const range = max - min;
            const mod = (((v - min) % range) + range) % range;
            return mod + min;
        }

        const x = useTransform(baseX, (v) => {
            if (copyWidth === 0) return "0px";
            return `${wrap(-copyWidth, 0, v)}px`;
        });

        const directionFactor = useRef(1);
        useAnimationFrame((t, delta) => {
            let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

            if (velocityFactor.get() < 0) {
                directionFactor.current = -1;
            } else if (velocityFactor.get() > 0) {
                directionFactor.current = 1;
            }

            moveBy += directionFactor.current * moveBy * velocityFactor.get();
            baseX.set(baseX.get() + moveBy);
        });

        // Buat salinan gambar untuk efek loop
        const duplicatedImages = [];
        for (let copy = 0; copy < (numCopies ?? 6); copy++) {
            rowImages.forEach((image, index) => {
                duplicatedImages.push(
                    <div
                        className={`flex-shrink-0 ${className} mx-2 md:mx-4`}
                        key={`${copy}-${index}`}
                        ref={copy === 0 && index === 0 ? copyRef : null}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={100}
                            height={80}
                            className="object-contain w-16 h-12 md:w-20 md:h-16 lg:w-24 lg:h-20 opacity-80 hover:opacity-100 transition-opacity duration-300"
                        />
                    </div>
                );
            });
        }

        return (
            <div
                className={`${parallaxClassName} relative overflow-hidden mb-4`}
                style={parallaxStyle}
            >
                <motion.div
                    className={`${scrollerClassName} flex whitespace-nowrap items-center`}
                    style={{ x, ...scrollerStyle }}
                >
                    {duplicatedImages}
                </motion.div>
            </div>
        );
    }

    return (
        <section className="space-y-4">
            {imageRows.map((rowImages, rowIndex) => (
                <VelocityImageRow
                    key={rowIndex}
                    rowImages={rowImages}
                    className={className}
                    baseVelocity={rowIndex % 2 !== 0 ? -velocity : velocity} // Arah berlawanan untuk baris bergantian
                    scrollContainerRef={scrollContainerRef}
                    damping={damping}
                    stiffness={stiffness}
                    numCopies={numCopies}
                    velocityMapping={velocityMapping}
                    parallaxClassName={parallaxClassName}
                    scrollerClassName={scrollerClassName}
                    parallaxStyle={parallaxStyle}
                    scrollerStyle={scrollerStyle}
                />
            ))}
        </section>
    );
};

export default ScrollVelocityImages;