import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation"; // Adjust the path if needed

export function HeroScrollDemo({ title, imageUrl }) {
    return (
        <div className="h-[60vh] w-[55vw] flex flex-col items-center justify-between overflow-hidden space-y-2 bg-background rounded-lg shadow-md border-2 p-4 mb-10">
            {/* Title Above Image */}
            <h1 className="text-lg md:text-xl font-semibold text-primary">
                {title}
            </h1>

            <ContainerScroll>
                {/* Hero Image */}
                <img
                    src={imageUrl}
                    alt="hero"
                    className="mx-auto rounded-lg object-contain h-[100%] w-full"
                    draggable={false}
                />
            </ContainerScroll>
        </div>
    );
}
