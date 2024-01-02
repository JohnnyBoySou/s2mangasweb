'use client';
import React, {useState, useRef} from 'react'
const Draggable = ({rootClass = "", children }) => {
    const ourRef = useRef(null);
      const [isMouseDown, setIsMouseDown] = useState(false);
      const mouseCoords = useRef({
          startX: 0,
          startY: 0,
          scrollLeft: 0,
          scrollTop: 0
      });
    const [isScrolling, setIsScrolling] = useState(false);
      const handleDragStart = (e) => {
          if (!ourRef.current) return
        const slider = ourRef.current.children[0];
          const startX = e.pageX - slider.offsetLeft;
          const startY = e.pageY - slider.offsetTop;
          const scrollLeft = slider.scrollLeft;
          const scrollTop = slider.scrollTop;
          mouseCoords.current = { startX, startY, scrollLeft, scrollTop }
          setIsMouseDown(true)
          document.body.style.cursor = "grabbing"
      }
      const handleDragEnd = () => {
          setIsMouseDown(false)
          if (!ourRef.current) return
          document.body.style.cursor = "default"
      }
      const handleDrag = (e) => {
          if (!isMouseDown || ! ourRef.current) return;
          e.preventDefault();
          const slider = ourRef.current.children[0];
          const x = e.pageX - slider.offsetLeft;
          const y = e.pageY - slider.offsetTop;
          const walkX = (x - mouseCoords.current.startX) * 1.5;
          const walkY = (y - mouseCoords.current.startY) * 1.5;
          slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
          slider.scrollTop = mouseCoords.current.scrollTop - walkY;
          console.log(walkX, walkY)
      }
  
    return (
      <div ref={ourRef}  onMouseDown={handleDragStart} onMouseUp={handleDragEnd} onMouseMove={handleDrag} className={rootClass + "flex overflow-x-scroll"}>
        {children}
      </div>
    );
  };

  export default Draggable;