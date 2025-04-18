import React, { JSX } from 'react';
import './skeleton.css';

interface SkeletonProps {
  radius?: number;
  width?: number | string;
  height?: number | string;
  right?: number;
  left?: number;
  top?: number;
  bottom?: number;
}

export default function Skeleton({
  radius = 12,
  width = 200,
  height = 200,
  right = 0,
  left = 0,
  top = 0,
  bottom = 0,
}: SkeletonProps): JSX.Element {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        borderRadius: radius,
        marginRight: right,
        marginLeft: left,
        marginTop: top,
        marginBottom: bottom,
      }}
    />
  );
}
