'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
    imageCover: string;
    images?: string[];
    title?: string;
}

export default function ProductGallery({ imageCover, images = [], title }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string>(imageCover);

    return (
        <div className="md:col-span-5 flex flex-col items-center">
            {/* Main Selected Image */}
            <div className="w-full aspect-[3/4] relative rounded-xl overflow-hidden border border-gray-100 bg-gray-50 mb-4">
                <Image
                    src={selectedImage}
                    alt={title || "Product Image"}
                    fill
                   
                    priority
                    className="object-cover object-center"
                />
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-3 w-full justify-start overflow-x-auto pb-2">
                {images.map((imgUrl, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedImage(imgUrl)}
                        className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                            selectedImage === imgUrl
                                ? 'border-emerald-600'
                                : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                    >
                        <Image
                            src={imgUrl}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}