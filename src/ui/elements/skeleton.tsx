import React from 'react';
import './skeleton.css'
export default function Skeleton ({ radius = 12, width = 200, height = 200, right = 0, left = 0, top = 0, bottom = 0, }){
    return(
        <div className="skeleton" style={{
            width: width, height: height, borderRadius: radius, marginRight: right, marginLeft: left, marginTop: top, marginBottom: bottom,
        }}/>
    )}