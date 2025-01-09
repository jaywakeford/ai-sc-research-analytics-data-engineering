import React from 'react';
import Image from 'next/image';
import ImagePlaceholder from './ImagePlaceholder';
import { getImagePath } from '@/utils/paths';

interface ImageCardProps {
  imagePath: string;
  title: string;
  description: string;
  onClick?: () => void;
  priority?: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({ 
  imagePath, 
  title, 
  description, 
  onClick,
  priority = false 
}) => {
  const isPlaceholder = !imagePath || imagePath === '';
  const fullImagePath = isPlaceholder ? '' : getImagePath(imagePath);

  return (
    <div className="image-card cursor-pointer" onClick={onClick}>
      {isPlaceholder ? (
        <ImagePlaceholder
          title={title}
          subtitle={description}
          aspectRatio="16/9"
          className="w-full h-full"
        />
      ) : (
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={fullImagePath}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            quality={85}
            className="object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            loading={priority ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
            <p className="text-sm text-gray-200">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCard; 