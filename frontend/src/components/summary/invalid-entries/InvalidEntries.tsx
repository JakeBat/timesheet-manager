import React from 'react'
import {Button} from "../../shared/button";

export const InvalidEntries = ({closeModal}: { closeModal: Function }) => (
    <div>
        <div className='invalid-text'>Please make sure all entries have a start time, end time, issue and comment.</div>
        <div className='invalid-close'><Button text="Close" fontSize='24px' onClick={closeModal}/></div>
    </div>
);