import React from 'react';
import NextImage from 'next/image';

interface ImageProps {
  src?: string;
  w?: number;
  h?: number;
  r?: number;
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  style?: React.CSSProperties;
  alt?: string;
  resize?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const Image: React.FC<ImageProps> = ({
  src = '',
  w = 0,
  h = 0,
  r = 0,
  align = 'center',
  style, resize = 'cover',
  alt = '',
}) => {
  if (!src) return null;

  const wrapperStyle: React.CSSProperties = {
    width: w,
    height: h,
    borderRadius: r,
    overflow: 'hidden',
    alignSelf: align,
    display: 'inline-flex',
    ...style,
  };

  return (
    <div style={wrapperStyle}>
      <NextImage
        src={src}
        width={w}
        height={h}
        style={{ width: '100%', height: '100%', objectFit: resize, borderRadius: r, background: "#303030" }}
        alt={alt}
      />
    </div>
  );
};

export default Image;
