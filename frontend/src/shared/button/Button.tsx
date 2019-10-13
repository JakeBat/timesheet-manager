
import React from 'react';
import './Button.css';
interface ButtonProps {
    text:string,
    fontSize?:string,
    onClick:any,
}
export const Button = ({text, fontSize, onClick}:ButtonProps) => {
    return <button onClick={onClick} style={{fontSize}}>{text}</button>
}