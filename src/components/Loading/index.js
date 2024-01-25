import React from 'react';
import './skeleton.css'
export default function Skeleton ({ radius, width, height }){
    return(
        <div className="skeleton" style={{
            width: width, height: height, borderRadius: radius,
        }}/>
    )}