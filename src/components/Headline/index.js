import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { Label } from "../../themes/global";

export default function Headline (){
    
  const container = useRef(null);

  useEffect(() => {
    const ct = container.current;
    gsap.to(ct, 
        {
          y: -50,
          duration: 5,
          scrollTrigger: {
            trigger: ct,
            start: "top center",
            end: "bottom bottom",
            scrub: true,
            markers: true,
          }
        });
    }, []);

return(
    <div ref={container} style={{padding: '60px 30px', backgroundColor: "#303030", margin: '12px 50px', borderRadius:12, }}>
        <h1 className="head">Headline</h1>
        <Label >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget nunc nec justo tincidunt aliquam. </Label>
    </div>
)}