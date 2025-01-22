import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export function ContainerScroll({ titleComponent, children }) {
    const containerRef = useRef(null);
    const controls = useAnimation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.5 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            controls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 1, ease: "easeOut" },
            });
        } else {
            controls.start({ opacity: 0, y: 50 });
        };
    }, [isVisible, controls]);

    return (
        <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
            {/* Title */}
            <motion.div
                animate={controls}
                initial={{ opacity: 0, y: 50 }}
                className="absolute z-10"
            >
                {titleComponent}
            </motion.div>

            {/* Scrollable Content */}
            <motion.div
                animate={controls}
                initial={{ opacity: 0, y: 50 }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </div>
    );
}
