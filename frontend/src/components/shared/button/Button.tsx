import React from 'react';
import './Button.css';
import {ButtonProps} from "../../../model/button-model";

export const Button = ({text, fontSize, onClick}: ButtonProps) => {
    return <button className="button" onClick={onClick} style={{fontSize}}>{text}</button>
};