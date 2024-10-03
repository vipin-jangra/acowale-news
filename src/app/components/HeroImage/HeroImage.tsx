import Image from "next/image";
import React from "react";
import SkeletonLoader from "./loading";

interface ImageData {
  src: string;
  alt: string;
  category: string;
  title: string;
}

interface ImageGalleryProps {
  images: ImageData[];
  loading: boolean; 
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, loading }) => {
  return (
    <div className="flex flex-col md:flex-row">
      {loading ? (
        <SkeletonLoader /> 
      ) : (
        images.map((image, index) => (
          <div
            key={index}
            className={`md:flex-1 mb-4 relative overflow-hidden group ${
              index === 0 ? "md:w-2/3" : "md:w-1/3" 
            }`}
          >
            <div className="relative h-80 w-full">
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill" 
                objectFit="cover"
                className="transition-transform duration-300 transform group-hover:scale-110"
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-transparent">
              <span className="text-sm font-semibold bg-red-600 text-white px-2 py-1">{image.category}</span>
              <h2 className="text-md font-semibold text-white">{image.title}</h2>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ImageGallery;
