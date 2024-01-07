'use client';
import React, { useState } from 'react';
import axios from 'axios'
import { Column, Row, Title, Label, } from '../../../../themes/global';
import chapters from '../../../../requests/chapters/chapter';
import Tesseract from 'tesseract.js';

export default function ChapterDetails({ params }) {
    const id = Number(params?.chapter)
    const item = chapters.find((chapter) => chapter.id === id);
    const [imageUrl, setImageUrl] = useState('');
    const [translatedText, setTranslatedText] = useState('');
  
    const extractTextFromImage = async () => {
      try {
        console.log('Requesting image:', imageUrl);
        const { data: imageBuffer } = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
        });
  
        const imageBase64 = Buffer.from(imageBuffer, 'binary').toString('base64');
  
        Tesseract.recognize(
          `data:image/jpeg;base64,${imageBase64}`,
          'por', // You can change the language code as needed
          {
            logger: (info) => console.log(info), // Optional: to log Tesseract.js progress
          }
        ).then(({ data: { text } }) => {
          setTranslatedText(text);
        });
      } catch (error) {
        console.error('Error extracting text from image:', error);
      }
    };
  
  
    return (
        <Column>
            <Title>Current chapter  {translatedText}</Title>
            
            <input
                type="text"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />
            <button onClick={extractTextFromImage}>Translate</button>

            {translatedText && (
                <div>
                <h2>Translated Text:</h2>
                <p>{translatedText}</p>
                </div>
            )}


            <img src={imageUrl} alt="image to tradute" width='100%' height='100%'/>
        </Column>
    )
}


//{item?.imgs?.map((item, index) => <img alt="text" width='100%' height='100%' src={item} key={index} />)}