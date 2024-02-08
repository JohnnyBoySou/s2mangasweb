'use client';
import React, {  useRef, useState } from 'react'
import Image from 'next/image'
import { Button , Column, Label, Row, Title} from '../../themes/global';
import { GoHeart } from "react-icons/go";
import { IoIosPause, IoIosPlay } from "react-icons/io";
import stories from '../../requests/mangalist';
import Draggable from '../draggable';
import { CiVolumeHigh } from "react-icons/ci";
import { useRouter } from 'next/navigation'
import './style.css'

export default function Contents({ }){
  const router = useRouter()
  const handle = (id) => {
    router.push(`/mangalist/${id}`)
  }

  const Card = ({ item }) => {
    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => {
      setHover(true);
    };

    const handleMouseLeave = () => {
      setHover(false);
    };

    return ( 
      <Column
        style={{ marginRight: 12 }} className='cd'
        onClick={() => handle(item.id)}
        //onMouseEnter={handleMouseEnter}
        //onMouseLeave={handleMouseLeave}
      >
        {hover ? (
          <>
            <Column style={{ width: 250, height: 250, borderRadius: 12, }} >
              <Label>{item?.manga_ids?.length}</Label>
            </Column>
            <Label style={{ fontSize: 24, width: 250, marginTop: 12 }}>{item?.name}</Label>
          </>
        ) : (
          <>
            <Image src={item?.capa} width={250} height={250} style={{ borderRadius: 12, objectFit: 'cover', marginBottom: 0 }} alt='' />
            <Label style={{ fontSize: 24, width: 250, marginTop: 12 }}>{item?.name}</Label>
          </>
        )}
      </Column> 

    );
  };


  const Storie = ({item, }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        if (videoRef.current.paused) {
            setIsPlaying(true)
            videoRef.current.play();
        } else {
            setIsPlaying(false)
            videoRef.current.pause();
        }
      };
      const handleVolumeChange = (value) => {
        if (videoRef.current) {
          videoRef.current.volume = value / 100;
        }
      };

      const [inputVisible, setInputVisible] = useState(false);

    return(
      <Column style={{borderRadius: 18, marginBottom: 12, marginRight: 20, }}  >
        <Column style={{ width: 300, height: 500, backgroundColor: "#404040", padding: '0px 16px', borderRadius: 12, position: 'relative', overflow: 'hidden',}}>
            <Column style={{ background: `linear-gradient(0deg, #00000000, #000)`, zIndex: 2, width: '120%', height: 100, marginBottom: -100, marginLeft: -16,}}/>
           
            <Row style={{justifyContent: 'space-between', alignItems: 'center',  marginTop: 10, zIndex:999, }}>
            <Label style={{fontSize: 18, color: "#f1f1f1", zIndex: 4, }}>{item?.short}</Label>
            <Label style={{fontSize: 10, marginTop: 4,  padding: 6, zIndex: 99, backgroundColor: "#f7f7f7", color: "#171717", alignSelf: 'flex-start', borderRadius: 100, paddingHorizontal: 10,}}>Mangálist</Label>
            </Row>

            <video width="346" height="500" style={{position: 'absolute', top: 0, zIndex: 1, left: 0,  objectFit: 'cover',}}   ref={videoRef}>
            <source
              src={item?.video}
              type="video/mp4"
              loop
              />
              </video>

        <Column style={{position: 'absolute', bottom: 0, zIndex: 99,}}>
          <Row>
            <Image src={item?.capa} alt="" width={84} height={84} style={{ borderRadius: 6, marginRight: 14, objectFit: 'cover',}} />
            <Column style={{justifyContent: 'center',}}>
              <Title style={{fontSize: 24, fontFamily: 'Bold', width: 200,}}>{item?.name}</Title>
            </Column>
          </Row>
          
          <Label style={{fontSize: 18, marginTop: 12, marginBottom: 12, color: "#f8f8f8", }}>{item?.desc}</Label>
          <Row style={{justifyContent: 'space-between', alignItems: 'center', zIndex: 99, marginBottom: 16,}}>
            <Row style={{justifyContent: 'center', alignItems: 'center', }}>

                <Button>
                    <GoHeart style={{fontSize: 24, color: '#fff'}}  />
                </Button>

                <CiVolumeHigh style={{fontSize: 28, marginLeft: 6, color: "#fff"}} onClick={() => setInputVisible(!inputVisible)} />
                {inputVisible &&
                <input
                    type="range"
                    style={{
                        orient: 'vertical',
                        width: 60, 
                        height: 10,
                        marginLeft: 5,
                    }}
                    min="0"
                    orient="vertical"
                    max="100"
                    defaultValue="100"
                    onChange={(e) => handleVolumeChange(e.target.value)}
                />}
            </Row>

            <Row style={{justifyContent: 'center', alignItems: 'center', }}>
            <Label>{item?.manga_ids?.length} mangás</Label>
            <Button onClick={handlePlayPause}  style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10, backgroundColor: "#ED274A", borderRadius: 100, width: 36, height: 36,}}>
              {isPlaying ? <IoIosPause style={{fontSize: 20, color: "#f1f1f1", }} /> : <IoIosPlay style={{fontSize: 20, color: "#f1f1f1", }}  /> }
            </Button>
            </Row>
          </Row>
          </Column>          
          <Column style={{ background: `linear-gradient(0deg, #000, #00000000)`,  width: '120%', height: 200, marginLeft: -16, position: 'absolute', bottom: 0, zIndex: 4,}}/>

        </Column>
      </Column>
    )
  }
  return (
    <Column style={{margin: 44, marginTop: 0,}}> 
   
    <Column>
   
   <Draggable>
    <Row>
    {stories?.map((item,index) => <Card key={index} item={item} /> )} 
    </Row>
   </Draggable>
   

    </Column>
  </Column>
  )
}
/**
 *  <Row style={{justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 10,}}>
      <Column style={{justifyContent: 'center'}}>
        <Title style={{fontSize: 42, marginBottom: 20,}}>Segue o fio</Title>
      </Column>
    </Row>
 *  <Row style={{justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 10, marginTop: 30,}}>
      <Column style={{justifyContent: 'center'}}>
        <Title style={{fontSize: 42, marginBottom: 20, marginTop: 30,}}>Mangalists do momento</Title>
      </Column>
    </Row>

    <Row style={{flexWrap: 'wrap',}}>
    {stories?.map((item,index) => <Storie key={index} item={item} /> )} 
    </Row>
 */