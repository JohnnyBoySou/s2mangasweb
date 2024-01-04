import React from 'react';
import { Column, Row, Title, Label, } from '../../../../themes/global';
import chapters from '../../../../requests/chapters/chapter';


export default function ChapterDetails({ params }) {
    const id = Number(params?.chapter)
    const item = chapters.find((chapter) => chapter.id === id);


    return (
        <Column>
            <Title>Current chapter {id}</Title>
            {item?.imgs?.map((item, index) => <img alt="text" width='100%' height='100%' src={item} key={index} />)}
        </Column>
    )
}