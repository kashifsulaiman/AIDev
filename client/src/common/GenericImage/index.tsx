'use client';
import { ImageProps, Image as NextUIImage } from '@nextui-org/image';
import { useState } from 'react';
type GenericImageProps<T = object> = T &
  ImageProps & {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    radius?: 'none' | 'sm' | 'md' | 'lg' | 'full' | undefined;
    className?: string;
  };

const GenericImage = ({
  src,
  alt,
  width,
  height,
  radius = 'none',
  className,
  classNames,
  ...props
}: GenericImageProps) => {
  const [imageurl, setimageurl] = useState(src);

  return (
    <NextUIImage
      alt={alt}
      className={className}
      classNames={classNames || { wrapper: '!max-w-none w-full' }}
      height={height}
      radius={radius}
      src={imageurl}
      width={width}
      onError={() => {
        setimageurl('https://nextui-docs-v2.vercel.app/images/album-cover.jpg');
      }}
      {...props}
    />
  );
};

export default GenericImage;
