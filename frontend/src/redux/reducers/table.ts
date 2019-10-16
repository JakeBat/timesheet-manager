import {UPDATE_DATA} from '../actionTypes'

const initialState = [];

const table = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_DATA:
            return action.payload;
        default:
            return state;
    }
};

export default table;