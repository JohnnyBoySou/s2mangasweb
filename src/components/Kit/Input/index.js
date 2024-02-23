import React from 'react';
import { Column, Row } from '../../../themes/global';
import './style.css';
import { IoAlertCircleOutline } from "react-icons/io5";

export default function Input({ value, onClick, place = 'Texto de exemplo', help}) {
    const handle = (event) => {
        onClick(event.target.value);
    };
    return (
        <Column>
            <input value={value} onChange={handle} className='inpt' placeholder={place}/>
            {help && <Row>
                <IoAlertCircleOutline style={{color: '#f8f8f890', fontSize: 18,}}/>
                <label className='help'>{help}</label>
                </Row>}
        </Column>
    );
}